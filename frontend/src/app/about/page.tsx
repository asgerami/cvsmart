/* eslint-disable @next/next/no-img-element */
import {  FaUserAlt, FaUserTie } from "react-icons/fa";

const collaborators = [
  {
    name: "Amir Aman",
    department: "Software Engineering Student",
    gender: "male",
  },
  {
    name: "Amir Naser",
    department: "Software Engineering Student",
    gender: "male",
  },
  {
    name: "Bereket Samuel",
    department: "Software Engineering Student",
    gender: "male",
  },
  {
    name: "Bereket Melese",
    department: "Software Engineering Student",
    gender: "male",
  },
  {
    name: "Milki Alemu",
    department: "Software Engineering Student",
    gender: "male",
  },
  {
    name: "Yididiya Tesfaye",
    department: "Computer Science and Engineering Student",
    gender: "female",
  },
  {
    name: "Afomiya Legesse",
    department: "Computer Science and Engineering Student",
    gender: "female",
  },
  {
    name: "Kalkidan Binyam",
    department: "Computer Science and Engineering Student",
    gender: "female",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden p-14">
      
      {/* Background Image */}
      <div className="relative h-52 bg-cover bg-bottom" style={{ backgroundImage: "url('/aboutus.jpg')" }}>
        <div className="absolute inset-0" ></div> 
        <h1 className="text-6xl font-bold text-white relative z-10 text-center pt-14">
          About <span className="bg-gradient-to-r from-purple-400 via-cyan-400 to-fuchsia-400 text-transparent bg-clip-text">US</span>
        </h1>
      </div>

      {/* About Text */}
      <div className="mt-12">
      <div className="mt-12 flex flex-col md:flex-row items-center gap-8">
  {/* Text on the Left */}
  <div className="md:w-1/2 text-left">
    <p className="mb-4 mt-6">
      <span className="bg-gradient-to-r font-bold from-purple-400 via-cyan-400 to-fuchsia-400 text-transparent bg-clip-text">CVSmart</span> is a collaborative initiative led by Software Engineering and Computer Science students in Ethiopia. Our mission is to bridge the gap between Ethiopian job seekers and the increasingly competitive local and global job markets by leveraging the power of artificial intelligence.
    </p>
    <p className="mb-4">
      In today’s fast-paced hiring landscape, resumes are often screened by automated systems known as Applicant Tracking Systems (ATS) before they ever reach a human recruiter. Many qualified candidates are filtered out simply because their resumes are not formatted correctly or lack essential keywords. Additionally, job seekers in Ethiopia face unique challenges, such as high unemployment rates, limited access to professional career development tools, and a lack of awareness about international resume standards.
    </p>
    <p className="mb-4">
      CVSmart addresses these challenges head-on. We provide an AI-powered web application that analyzes resumes for structure, content, keyword optimization, and overall ATS compatibility. Our platform offers personalized feedback and guidance, ensuring each resume is both impactful and compliant with modern hiring technologies.
    </p>
  </div>

  {/* Image on the Right */}
  <div className="md:w-1/2">
    <img src="/LetAi.jpg" alt="Let AI Help" className="w-full max-h-[30rem] object-cover object-top rounded-xl shadow-lg" />
  </div>
</div>

<div className="flex flex-col md:flex-row items-center gap-8 my-12">
  {/* Image on the left */}
  <div className="md:w-1/2 w-full">
    <img
      src="/1.jpg" // assuming 1.jsx refers to the image name being 1.jpg
      alt="CVSmart"
      className="w-full max-h-[30rem] object-cover object-top rounded-xl shadow-lg"
    />
  </div>
{/* Text on the right */}
  <div className="md:w-1/2 w-full text-white">
    <p className="mb-4">
      This project combines the strengths of two academic disciplines:
    </p>
    <ul className="list-disc list-inside mb-4">
      <li className="mb-2">
        <strong>Software Engineering students</strong> handle the development of a user-friendly, modern web platform that is intuitive and accessible.
      </li>
      <li className="mb-2">
        <strong>Computer Science students</strong> focus on building intelligent algorithms using Natural Language Processing (NLP) and Machine Learning to parse, evaluate, and improve resumes.
      </li>
    </ul>
    <p className="mb-4">
      By aligning technological innovation with the practical needs of Ethiopian job seekers, CVSmart empowers individuals to stand out, secure more interview opportunities, and confidently pursue their career goals. Our platform is more than a tool—it’s a step toward reducing unemployment and fostering professional growth across Ethiopia.
    </p>
    <p>
      Together, we are building a future where every qualified Ethiopian has the tools to succeed—one resume at a time.
    </p>
  </div>
</div>

      </div>

      {/* Collaborators Section */}
<div className="mt-12 z-10 relative">
  <h2 className="text-3xl font-semibold text-center mb-12">Collaborators</h2>
  <div className="grid grid-cols-1 md:grid-cols-3  items-start">
    
    {/* Left Column */}
    <div className="grid grid-cols-2 gap-4 min-h-[300px]">
      {collaborators.slice(0, 4).map((person, index) => (
        <div key={index} className="bg-gray-800 px-3 py-4 rounded-lg shadow text-center">
          <div className="text-2xl w-12 h-12 flex items-center justify-center rounded-full bg-gray-200 mx-auto mb-2">
            {person.gender === "male" ? (
              <FaUserTie className="text-blue-400" />
            ) : (
              <FaUserAlt className="text-pink-400" />
            )}
          </div>
          <h3 className="text-sm font-semibold mb-1">{person.name}</h3>
          <p className="text-xs text-gray-400">{person.department}</p>
        </div>
      ))}
    </div>

    {/* Center Image */}
    <div className="flex justify-center">
      <img
        src="/collabs.jpg"
        alt="Collaborator Illustration"
        className="w-[350px] h-[300px] rounded-xl shadow-lg object-cover object-center"
      />
    </div>

    {/* Right Column */}
    <div className="grid grid-cols-2 gap-4 ">
      {collaborators.slice(4, 8).map((person, index) => (
        <div key={index} className="bg-gray-800 px-3 py-4 rounded-lg shadow text-center">
          <div className="text-2xl w-12 h-12 flex items-center justify-center rounded-full bg-gray-200 mx-auto mb-2">
            {person.gender === "male" ? (
              <FaUserTie className="text-blue-400" />
            ) : (
              <FaUserAlt className="text-pink-400" />
            )}
          </div>
          <h3 className="text-sm font-semibold mb-1">{person.name}</h3>
          <p className="text-xs text-gray-400">{person.department}</p>
        </div>
      ))}
    </div>

  </div>
</div>


    </div>
  );
}