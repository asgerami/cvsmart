from flask import Flask, request, jsonify
from flask_cors import CORS
import pdfplumber
from docx import Document
import google.generativeai as genai
import os
from werkzeug.utils import secure_filename
from dotenv import load_dotenv
import logging

load_dotenv()

# Configure logging
logging.basicConfig(level=logging.INFO)

app = Flask(__name__)
CORS(app) # Allow all origins for simplicity in development

# --- Configuration ---
UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'pdf', 'docx'}
MODEL_NAME = 'gemini-1.5-pro'

# Ensure upload folder exists
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# --- Gemini API Configuration ---
GOOGLE_API_KEY = os.getenv('GOOGLE_API_KEY')
if not GOOGLE_API_KEY:
    raise ValueError("No GOOGLE_API_KEY found in environment variables. Please set it in your .env file.")

try:
    genai.configure(api_key=GOOGLE_API_KEY)

    # --- Enhanced System Instruction for Gemini ---
    system_instruction = f"""
You are a highly experienced senior recruiter and career coach with over 25 years of experience, specializing in the tech industry. Your task is to provide a comprehensive analysis comparing the provided resume against the given job description.

**Output Format:** Structure your response EXACTLY as follows:

1.  Overall Match Score: Provide a percentage score (e.g., "75%") indicating the overall compatibility between the resume and the job description based on your analysis.
2.  Score Summary: Very Briefly (2-3 bullet points max) highlighting the *absolute key factor(s)* determining the score (e.g., "Strong experience in cloud technologies, but lacks specific project management experience.").
3.  General Match Assessment: A brief narrative (2-3 sentences) summarizing how well the candidate's profile aligns with the role requirements.
4.  Key Highlights & Gaps:
     Key Skills Match:
           ✅ Top Matched Skills: List specific skills/technologies from the resume that directly match critical requirements in the job description.
           ⚠️ Partial Matches: Identify skills present in the resume that are relevant but could be emphasized more or lack specific context mentioned in the job description.
           ❌ Critical Missing Skills: List the *most critical* skills required by the job description that appear to be missing or not written in the resume.
     Experience Relevance:
              🌟 High-Impact Experience: Point out specific job experiences, projects, or accomplishments in the resume that strongly align with the responsibilities and goals outlined in the job description.
              🔍 Experience Gaps: Mention key areas of experience required by the job description that are not evident in the resume.
5.  Top Improvement Tips: Provide specific, concrete recommendations . Focus on *how* to improve the resume for *this specific job*. i want you to pick 3-5 most relevent tips the help the most from these Examples:
      🛠️ Address Missing [Skill/Gaps]: Suggest how (e.g., "Highlight Python in Project X more" or "Add a section on cloud certifications").
      📊 Quantify Achievements: "Quantify your impact in Project X by adding metrics like 'reduced processing time by 15%' or 'managed a budget of $Y'."
      🔑 Incorporate Keywords: "Integrate keywords like 'cloud infrastructure management', 'CI/CD pipelines', and 'Agile methodologies' found in the job description into your relevant experience descriptions."
      ✏️ Refine Bullet Points: "Rephrase the bullet point about 'Developed software' under Job Z to highlight 'Developed scalable microservices using Python (Flask) and deployed on AWS ECS', aligning better with the JD's focus on microservices and cloud deployment."
      📁 Add Specific Projects: "Consider adding a brief section on Project A, emphasizing the use of [Specific Tech from JD], if applicable."
      🖋️ Formatting/Clarity: "Ensure consistent date formatting. Consider using the STAR method (Situation, Task, Action, Result) for key accomplishment bullet points."
      🎯 Tailor Summary/Objective: "Update summary with keywords 'X' and 'Y' from the Job Description."

**Tone:** Be professional, constructive, clear, actionable, and highly specific. Your goal is to empower the user to significantly improve their resume for this target role. Do not invent information not present in the resume or job description.
"""

    model = genai.GenerativeModel(
        model_name=MODEL_NAME,
        system_instruction=system_instruction,
        # Safety settings can be adjusted if needed, but defaults are usually reasonable
        # safety_settings=[...]
    )
    logging.info(f"Successfully configured Gemini model: {MODEL_NAME}")

except Exception as e:
    logging.error(f"Error configuring Gemini API: {e}")
    # Depending on the desired behavior, you might want to exit or handle this differently
    raise

# --- Helper Functions ---
def allowed_file(filename):
    """Checks if the file extension is allowed."""
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def extract_text_from_pdf(file_path):
    """Extracts text from a PDF file."""
    text = ""
    try:
        with pdfplumber.open(file_path) as pdf:
            for page in pdf.pages:
                page_text = page.extract_text()
                if page_text:
                    text += page_text + "\n" # Add newline between pages
        logging.info(f"Successfully extracted text from PDF: {file_path}")
        return text
    except Exception as e:
        logging.error(f"Error extracting text from PDF {file_path}: {e}")
        raise # Re-raise the exception to be caught by the route handler

def extract_text_from_docx(file_path):
    """Extracts text from a DOCX file."""
    text = ""
    try:
        doc = Document(file_path)
        for paragraph in doc.paragraphs:
            text += paragraph.text + "\n"
        logging.info(f"Successfully extracted text from DOCX: {file_path}")
        return text
    except Exception as e:
        logging.error(f"Error extracting text from DOCX {file_path}: {e}")
        raise # Re-raise the exception to be caught by the route handler

# --- API Route ---
@app.route('/analyze', methods=['POST'])
def analyze_resume():
    """Analyzes an uploaded resume against a job description."""
    if 'resume' not in request.files:
        logging.warning("Analyze request failed: No resume file part.")
        return jsonify({'error': 'No resume file uploaded'}), 400

    file = request.files['resume']
    job_description = request.form.get('jobDescription', '').strip() # Get and strip whitespace

    if not job_description:
        logging.warning("Analyze request failed: No job description provided.")
        return jsonify({'error': 'No job description provided'}), 400

    if file.filename == '':
        logging.warning("Analyze request failed: No file selected.")
        return jsonify({'error': 'No selected file'}), 400

    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)

        try:
            file.save(file_path)
            logging.info(f"File saved temporarily to: {file_path}")

            # Extract text based on file type
            if filename.lower().endswith('.pdf'):
                resume_text = extract_text_from_pdf(file_path)
            elif filename.lower().endswith('.docx'):
                resume_text = extract_text_from_docx(file_path)
            else:
                # Should not happen due to allowed_file check, but good to be safe
                logging.error(f"Analyze request failed: Invalid file type passed allowed_file check - {filename}")
                return jsonify({'error': 'Internal server error: Invalid file type processing'}), 500

            if not resume_text.strip():
                logging.warning(f"Analyze request failed: Extracted resume text is empty for file {filename}")
                return jsonify({'error': 'Could not extract text from resume or resume is empty'}), 400

            # Prepare content for Gemini
            # The system instruction already tells the model what to do.
            # We just need to provide the resume and job description clearly.
            prompt_content = f"""
**Resume Content:**
--- START RESUME ---
{resume_text}
--- END RESUME ---

**Job Description:**
--- START JOB DESCRIPTION ---
{job_description}
--- END JOB DESCRIPTION ---
"""

            logging.info(f"Sending request to Gemini model {MODEL_NAME}...")
            # Get analysis from Gemini
            response = model.generate_content(
                prompt_content,
                generation_config=genai.GenerationConfig(
                    temperature=0.3, # Slightly increased temperature for potentially more varied suggestions, but still grounded. Adjust as needed.
                    # top_p=0.95, # Can adjust if needed
                    # top_k=40, # Can adjust if needed
                ),
                # request_options={'timeout': 120} # Optional: Increase timeout for potentially long analyses
            )

            # Assuming the response format is consistent based on system_instruction
            analysis = response.text
            logging.info(f"Received analysis from Gemini.")

            return jsonify({'analysis': analysis}) # The analysis string now contains the score and detailed feedback

        except FileNotFoundError:
             logging.error(f"Error processing file: Saved file not found at {file_path}")
             return jsonify({'error': 'Internal server error: File processing failed'}), 500
        except genai.types.generation_types.BlockedPromptException:
            logging.warning(f"Gemini request blocked. Potentially harmful content detected or safety settings too strict.")
            return jsonify({'error': 'Analysis could not be generated due to safety restrictions. Try rephrasing or check content.'}), 400
        except Exception as e:
            logging.exception(f"An unexpected error occurred during analysis for file {filename}: {e}") # Log full traceback
            # Consider returning a more generic error message to the user in production
            return jsonify({'error': f'An unexpected error occurred: {str(e)}'}), 500
        finally:
            # Clean up the uploaded file in all cases (success or failure)
            if os.path.exists(file_path):
                try:
                    os.remove(file_path)
                    logging.info(f"Successfully removed temporary file: {file_path}")
                except Exception as e:
                    logging.error(f"Error removing temporary file {file_path}: {e}")

    else:
        logging.warning(f"Analyze request failed: Invalid file type - {file.filename}")
        return jsonify({'error': 'Invalid file type. Allowed types are PDF and DOCX.'}), 400

# --- Main Execution ---
if __name__ == '__main__':
    # Use waitress or gunicorn for production instead of Flask's built-in server
    app.run(debug=True, port=5000) # Use debug=False in productionfrom flask import Flask, request, jsonify
