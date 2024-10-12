import React, { useEffect, useState } from "react";
import { Club } from "../components/Types/types";
import { useParams } from "react-router-dom";
import { getClubInfo } from "../services/operations/ClubApi";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/reducers";
import Loader from "./Loader";

const ClubPage: React.FC = () => {
  const [clubData, setClubData] = useState<Club | null>(null);

  const dispatch = useDispatch<any>();
  const { loading } = useSelector((state: RootState) => state.auth);

  const { id } = useParams<{ id: string }>();

  console.log(id);

  useEffect(() => {
    if (id) {
      getData(id);
    }
  }, [id]);

  async function getData(clubId: string) {
    console.log("Hola ");
    const response: any = await dispatch(getClubInfo(clubId));
    console.log(response);
    setClubData(response.data);
  }

  console.log(clubData);

  return (
    <div className="p-8 bg-gray-50 rounded-lg shadow-lg mt-[4.5rem]">
      <Loader loading={loading} />
      <header className="text-center mb-10 flex flex-col justify-center items-center">
        <img
          src={clubData?.logoUrl}
          alt="Club Logo"
          className="w-32 h-auto mx-auto mb-4 rounded-full border border-blue-300"
        />
        <h1 className="text-5xl font-bold text-gray-800">{clubData?.name}</h1>
        <p className="text-lg text-gray-600 mt-2">
          Category: <span className="font-semibold">{clubData?.category}</span>
        </p>
        <p className="text-gray-700 mt-4 w-8/12">{clubData?.description}</p>
        <button className="mt-4 bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition duration-200">
          Join Club
        </button>
      </header>

      <section className="mb-10">
        <h2 className="text-4xl font-semibold text-gray-800 mb-4 bg-blue-100 p-2 rounded-lg border border-blue-300">
          Gallery
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {clubData?.gallery.map((image, index) => (
            <div
              key={index}
              className="relative overflow-hidden rounded-lg shadow-md group"
            >
              <img
                src={image.url}
                alt={`Gallery Image ${index + 1}`}
                className="w-full h-60 object-cover transition duration-300 ease-in-out transform group-hover:scale-105 group-hover:brightness-110 group-hover:shadow-2xl"
              />
            </div>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-4xl font-semibold text-gray-800 mb-4 bg-green-100 p-2 rounded-lg border border-green-300">
          Leadership
        </h2>
        <ul className="list-disc pl-5 text-gray-700 space-y-2">
          <li className="font-semibold">{clubData?.president} - President</li>
          <li>{clubData?.vicePresident} - Vice President</li>
          <li>{clubData?.secretary} - Secretary</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-4xl font-semibold text-gray-800 mb-4 bg-yellow-100 p-2 rounded-lg border border-yellow-300">
          Testimonials
        </h2>
        <div className="space-y-4">
          {clubData?.testimonials.map((testimonial, index) => (
            <blockquote
              key={index}
              className="bg-gray-100 rounded-lg p-4 shadow-md"
            >
              <p className="text-gray-700 italic">"{testimonial.content}"</p>
              <cite className="text-gray-600">- {testimonial.author}</cite>
            </blockquote>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-4xl font-semibold text-gray-800 mb-4 bg-purple-100 p-2 rounded-lg border border-purple-300">
          Upcoming Events
        </h2>
        <div className="space-y-4">
          <EventCard
            title="Hackathon 2024"
            description="Join us for a 24-hour hackathon where students will collaborate to solve real-world problems."
            date="March 15, 2024"
            venue="Main Auditorium"
          />
          <EventCard
            title="Guest Lecture: AI in 2024"
            description="A talk by industry experts on the latest advancements in AI technology."
            date="April 20, 2024"
            venue="Room 202, Science Block"
          />
          <EventCard
            title="Tech Workshop: Web Development Basics"
            description="Learn the fundamentals of web development in this hands-on workshop."
            date="May 10, 2024"
            venue="Computer Lab 3"
          />
        </div>
      </section>

      <section>
        <h2 className="text-4xl font-semibold text-gray-800 mb-4 bg-red-100 p-2 rounded-lg border border-red-300">
          Contact Us
        </h2>
        <p className="text-gray-700">
          Email: <span className="font-semibold">{clubData?.email}</span>
        </p>
        <p className="text-gray-700">
          Phone: <span className="font-semibold">{clubData?.phone}</span>
        </p>
      </section>
    </div>
  );
};

const EventCard = ({ title, description, date, venue }: any) => (
  <div className="bg-gray-100 rounded-lg p-4 shadow-md hover:shadow-xl transition duration-200">
    <h3 className="text-3xl font-semibold">{title}</h3>
    <p className="text-gray-700">{description}</p>
    <p className="text-gray-500">Date: {date}</p>
    <p className="text-gray-500">Venue: {venue}</p>
    <button className="mt-2 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200">
      Register Now
    </button>
  </div>
);

export default ClubPage;
