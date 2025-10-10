// components/TeamCards.tsx
"use client";

import { Github, Linkedin, Mail } from "lucide-react";

export default function TeamCards() {
  const team = [
    { 
      name: "Clément", 
      emoji: "👨‍💻",
      role: "Lead Developer",
      skills: ["React", "Next.js", "TypeScript"]
    },
    { 
      name: "Rémi", 
      emoji: "👨‍💻",
      role: "Frontend Developer",
      skills: ["UI/UX", "CSS", "JavaScript"]
    },
    { 
      name: "Ishak", 
      emoji: "👨‍💻",
      role: "Full Stack Developer",
      skills: ["Node.js", "React", "API"]
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {team.map((member, index) => (
        <div
          key={index}
          className="group bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-lg hover:shadow-2xl flex flex-col items-center text-center transition-all duration-300 transform hover:-translate-y-2 border-2 border-transparent hover:border-blue-500 dark:hover:border-blue-400"
        >
          <div className="text-7xl mb-6 transform group-hover:scale-110 transition-transform duration-300">
            {member.emoji}
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            {member.name}
          </h3>
          <p className="text-sm font-medium text-blue-600 dark:text-blue-400 mb-4">
            {member.role}
          </p>
          <div className="flex flex-wrap gap-2 justify-center mb-4">
            {member.skills.map((skill, skillIndex) => (
              <span
                key={skillIndex}
                className="px-3 py-1 text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full"
              >
                {skill}
              </span>
            ))}
          </div>
          <div className="flex gap-3 mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-full hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors cursor-pointer">
              <Github className="w-4 h-4 text-gray-600 dark:text-gray-400" />
            </div>
            <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-full hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors cursor-pointer">
              <Linkedin className="w-4 h-4 text-gray-600 dark:text-gray-400" />
            </div>
            <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-full hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors cursor-pointer">
              <Mail className="w-4 h-4 text-gray-600 dark:text-gray-400" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
