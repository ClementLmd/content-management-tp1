"use client";

import Image from "next/image";

export default function Features() {
  const features = [
    {
      title: "Fast Content Creation ⚡",
      description:
        "Quickly write and publish articles with our optimized editor and real-time preview.",
      image: "/articles.png", // replace with your actual image
    },
    {
      title: "User Management 👥",
      description:
        "Easily manage users, permissions, and roles with a simple and clean interface.",
      image: "/users.png",
    },
    {
      title: "Customizable Dashboard 🎨",
      description:
        "Tailor your dashboard layout and theme to suit your workflow and style.",
      image: "/dashboard.png",
    },
  ];

  return (
    <section className="w-full max-w-7xl mx-auto mt-32 px-6">
      <h2 className="text-4xl font-bold text-gray-900 dark:text-white text-center mb-16">
        Key Features
      </h2>

   {/* Grid container for 3 rows */}
<div className="grid grid-cols-1 gap-16">
  {features.map((feature, index) => (
    <div
      key={index}
      className="rounded-3xl bg-gradient-to-br from-blue-100 via-white to-purple-100
                 dark:from-gray-800 dark:via-gray-700 dark:to-gray-900
                 shadow-xl overflow-hidden flex flex-col justify-between p-8 transition-transform hover:scale-105"
    >
      {/* Inner 2-row layout */}
      <div>
        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
          {feature.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 text-lg">
          {feature.description}
        </p>
      </div>

      {/* Image */}
      <div className="mt-8">
        <img
          src={feature.image}
          alt={feature.title}
          className="w-full h-auto object-cover rounded-2xl shadow-md"
        />
      </div>
    </div>
  ))}
</div>
    </section>
  );
}
