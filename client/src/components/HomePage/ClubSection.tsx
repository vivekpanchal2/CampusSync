import React from "react";
import { useNavigate } from "react-router-dom";

const ClubSection: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div>
      <section className="h-screen pt-[2rem] snap-always snap-start bg-gray-900 text-gray-200 flex flex-col md:flex-row items-center overflow-hidden">
        <div className="flex-1 px-8 md:px-16 lg:px-20 py-12 flex flex-col justify-center max-w-xl mx-auto md:max-w-2xl lg:max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-teal-400 transition-transform duration-300 transform hover:scale-105">
            The Importance of Clubs
          </h2>
          <p className="text-lg mb-4">
            Clubs at Silver Oak University enrich the student experience by
            providing opportunities to:
          </p>
          <ul className="list-disc space-y-2 text-lg pl-6">
            {[
              { icon: "🤝", text: "Build friendships." },
              { icon: "🎨", text: "Explore passions." },
              { icon: "🗣", text: "Develop skills." },
              { icon: "📈", text: "Enhance your resume." },
            ].map((item, index) => (
              <li key={index} className="flex items-center space-x-2">
                <span className="text-teal-400 transition-transform duration-300 transform hover:scale-125">
                  {item.icon}
                </span>
                <span>{item.text}</span>
              </li>
            ))}
          </ul>

          <button
            className="mt-6 px-8 py-3 bg-teal-600 text-white rounded-full shadow-lg transition-all duration-300 ease-in-out hover:bg-teal-500 "
            onClick={() => navigate("/clubs")}
          >
            Explore Clubs
          </button>
        </div>
        <div className="flex-1 px-8 md:px-16 lg:px-20 relative max-w-xl mx-auto md:max-w-2xl lg:max-w-3xl">
          <div className="rounded-lg overflow-hidden">
            <img
              src="https://i.ibb.co/TbGKw8R/dl-beatsnoop-com-3000-z1-Wm8i9c6b.jpg"
              alt="Students participating in clubs"
              className="h-full w-full object-cover transition-transform duration-500 ease-in-out hover:scale-105"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default ClubSection;
