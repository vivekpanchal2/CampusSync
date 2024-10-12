import React from "react";

const Home: React.FC = () => {
  return (
    <>
      <div className="scroll-container snap-y snap-mandatory h-screen overflow-y-scroll">
        <section className="h-screen flex flex-col snap-always snap-start relative bg-[url('https://i.ibb.co/9vwqCHL/group.jpg')] bg-cover bg-center text-white  justify-center items-center">
          <div className="absolute inset-0 bg-black opacity-80"></div>

          <div className="relative z-10 text-center px-6 flex flex-col items-center">
            <h1 className="text-4xl md:text-6xl font-extrabold mb-4 tracking-wide">
              Welcome to{" "}
              <span className="text-teal-300  animate-pulse">CampusSync</span>
              <br />
              <span className="text-2xl md:text-4xl text-white font-semibold">
                A hub for{" "}
                <span className="text-teal-300">Silver Oak University</span>!
              </span>
            </h1>
            <p className="text-lg md:text-xl text-yellow-300 mb-8 max-w-2xl leading-relaxed text-center">
              Your central hub to connect, explore, and participate in the
              vibrant societies at{" "}
              <span className="font-semibold">Silver Oak University</span>. Stay
              updated with the latest events and activities!
            </p>
            <div className="flex flex-col md:flex-row justify-center space-x-0 md:space-x-4">
              <button className="bg-teal-400 hover:bg-teal-600 text-black py-2 px-4 rounded-lg font-medium shadow-lg transition duration-300 mb-2 md:mb-0">
                Explore Societies
              </button>
              <button className="bg-transparent border-2 border-gray-100 hover:bg-gray-100 hover:text-black text-gray-100 py-2 px-4 rounded-lg font-medium shadow-lg transition duration-300">
                Upcoming Events
              </button>
            </div>
          </div>
        </section>

        <section className="h-screen snap-always snap-start bg-gray-100 text-gray-800 flex flex-col justify-center items-center">
          <h2 className="text-4xl font-bold mb-4">What is CampusSync?</h2>
          <p className="text-lg text-center max-w-2xl mb-6">
            CampusSync is your one-stop platform to explore, join, and stay
            informed about all the societies at Silver Oak University. Join the
            community and never miss an event!
          </p>
          <ul className="space-y-4 text-lg">
            <li>Discover Societies</li>
            <li>Manage Memberships</li>
            <li>Stay Updated with Events</li>
          </ul>
        </section>

        <section className="h-screen snap-always snap-start bg-white text-gray-800 flex flex-col justify-center items-center">
          <h2 className="text-4xl font-bold mb-8">Upcoming Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold mb-4">Tech Talk 2024</h3>
              <p className="text-gray-700 mb-4">Organized by: Coding Society</p>
              <p className="text-gray-700 mb-4">Date: October 15, 2024</p>
              <button className="bg-blue-700 text-white py-2 px-4 rounded">
                Register Now
              </button>
            </div>
          </div>
        </section>

        <section className="h-screen snap-always snap-start bg-gray-900 text-white flex flex-col justify-center items-center">
          <h2 className="text-4xl font-bold mb-8">Popular Societies</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-gray-700 p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold mb-4">Coding Society</h3>
              <p className="text-gray-300">
                A community of developers and programmers.
              </p>
            </div>
          </div>
        </section>

        <section className="h-screen snap-always snap-start bg-white text-gray-800 flex flex-col justify-center items-center">
          <h2 className="text-4xl font-bold mb-8">How CampusSync Works</h2>
          <div className="space-y-8">
            <div className="flex items-center space-x-4">
              <span className="text-2xl font-bold">1</span>
              <p className="text-lg">
                Sign Up or Log In with your university credentials.
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-2xl font-bold">2</span>
              <p className="text-lg">
                Explore societies and find your interests.
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-2xl font-bold">3</span>
              <p className="text-lg">
                Join societies and participate in events.
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-2xl font-bold">4</span>
              <p className="text-lg">
                Stay updated with notifications and announcements.
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;
