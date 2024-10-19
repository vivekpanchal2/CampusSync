import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchEvents } from "../services/operations/EventApi";
import { useDispatch, useSelector } from "react-redux";
import EventCard from "../components/Events/EventCard";
import { MdEvent } from "react-icons/md";
import Loader from "../components/common/Loader";
import { RootState } from "../redux/reducers";
import { Event } from "../components/Types/types";
import ErrorPage from "./ErrorPage";
import { format } from "date-fns"; // For date formatting

const EventsPage: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const [error, setError] = useState(false);
  const dispatch = useDispatch<any>();

  const loading = useSelector((state: RootState) => state.auth.loading);

  useEffect(() => {
    const getEvents = async () => {
      const response = await dispatch(fetchEvents());
      try {
        if (response.success === true) {
          setEvents(response.events);
        } else {
          setError(true);
        }
      } catch (error) {
        setError(true);
      }
    };

    getEvents();
  }, [dispatch]);

  if (loading) {
    return <Loader loading={loading} />;
  }

  if (error) {
    return <ErrorPage />;
  }

  const filteredEvents = events.filter((event) =>
    event.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative container mt-[4.5rem] mx-auto px-8 lg:px-12 xl:px-28 py-12 bg-gray-900">
      <Loader loading={loading} />
      <div className="mb-12">
        <h1 className="text-5xl font-extrabold text-center text-white mb-4">
          Discover Upcoming Events
        </h1>
        <p className="text-center text-lg text-gray-400">
          Explore events happening around your campus.
        </p>
      </div>

      <div className="mb-8 flex justify-between items-center">
        <input
          type="text"
          placeholder="Search events..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-1/2  p-3 rounded-md bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <Link to="/events/createEvent">
          <button className="w-44 flex justify-between items-center bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-2 px-5 rounded-full font-semibold text-sm shadow-lg hover:shadow-2xl transition-transform">
            Organize Event <MdEvent className="text-xl" />
          </button>
        </Link>
      </div>

      {filteredEvents.length === 0 ? (
        <p className="text-center text-white text-lg">No events found</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 md:px-0">
          {filteredEvents.map((event) => {
            const eventDate = format(new Date(event.timeDate), "PPPp");
            const seatsLeft = event.studentsLimit - event.tickets.length;
            const isAlmostFull = seatsLeft <= 5; // Highlight if almost full

            return (
              <EventCard
                key={event.id}
                id={event.id}
                image={event.image}
                name={event.name}
                timeDate={eventDate}
                studentsLimit={event.studentsLimit}
                ticketPrice={event.ticketPrice}
                isAlmostFull={isAlmostFull}
                path={`/events/${event.id}`}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default EventsPage;
