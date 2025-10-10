// components/TeamCards.tsx
"use client";

export default function TeamCards() {
  const team = [
    { name: "Alice Dupont", emoji: "👩‍💻" },
    { name: "Bob Martin", emoji: "🧑‍🎨" },
    { name: "Charlie Nguyen", emoji: "🧑‍🚀" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {team.map((member, index) => (
        <div
          key={index}
          className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow flex flex-col items-center text-center hover:scale-105 transition-transform"
        >
          <div className="text-6xl mb-4">{member.emoji}</div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            {member.name}
          </h3>
        </div>
      ))}
    </div>
  );
}
