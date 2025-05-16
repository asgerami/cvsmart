How to run it on your own machine

First Clone the repository:

Then Install frontend dependencies:

- cd frontend
- npm install

Create a '.env.local' file and add the
\`\`\`
NEXT_PUBLIC_SUPABASE_URL=https://jcxahlzszwvmvmzsbnwv.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpjeGFobHpzend2bXZtenNibnd2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcxNDc3MDksImV4cCI6MjA2MjcyMzcwOX0.zUcZB8qL5_CGKXWMww41od0tb3ImqwSgxqxSgz--jxI
NEXT_PUBLIC_API_URL=http://localhost:5000/api
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpjeGFobHpzend2bXZtenNibnd2Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0NzE0NzcwOSwiZXhwIjoyMDYyNzIzNzA5fQ.2pE0ijIdrBghunHmlIeFHApIADAuAElCBGretwnI60U

\`\`\`

Run the development server:

- npm run dev

Then Setup the Backend

Create a virtual environment:

- cd backend

python -m venv venv

- For Linux run: source venv/bin/activate # On Windows: venv\Scripts\activate

Install dependencies:

- pip install -r requirements.txt

After that Create a .env file in the backend directory:

- GOOGLE_API_KEY=your_gemini_api_key_here
  ( you can get a free gemini api key from https://aistudio.google.com/ )

Finally Start the Flask server:

- python app.py
