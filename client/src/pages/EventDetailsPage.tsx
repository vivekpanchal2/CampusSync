import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getEventInfo } from "../services/operations/EventApi";
import { useDispatch, useSelector } from "react-redux";
import {
  FaTicketAlt,
  FaCalendarAlt,
  FaUsers,
  FaMoneyBillWave,
} from "react-icons/fa";
import { RootState } from "../redux/reducers";
import Loader from "../components/common/Loader";
import { Event } from "../components/Types/types";

import { buyTicket } from "../services/operations/PurchaseTicket";

const EventDetails: React.FC = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const [event, setEvent] = useState<Event | null>(null);
  const [isPurchased, setIsPurchased] = useState<boolean>(false);

  const loading = useSelector((state: RootState) => state.auth.loading);
  const user = useSelector((state: RootState) => state.auth.user);
  const token = useSelector((state: RootState) => state.auth.token);

  const dispatch = useDispatch<any>();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEventDetails = async () => {
      if (eventId) {
        const response = await dispatch(getEventInfo(eventId));
        const eventData = response.data;
        setEvent(eventData);

        if (eventData?.tickets && user) {
          const userHaveTicket = eventData.tickets.some(
            (ticket: any) => ticket.userId === user.id
          );
          setIsPurchased(userHaveTicket);
        }
      }
    };

    fetchEventDetails();
  }, [eventId, dispatch, user]);

  console.log(event?.ticketPrice);

  const handleOnClick = async () => {
    if (!user || !token) {
      navigate("/auth");
    }

    if (user && event && token) {
      await buyTicket(
        user.id,
        event?.id,
        navigate,
        token,
        user,
        event?.ticketPrice
      );
    } else {
      console.log("SomeThing is missing");
    }
  };

  if (loading) {
    return <Loader loading={loading} />;
  }
  if (!event) return <p>Event not found.</p>;

  return (
    <div className="mt-[4.5rem] max-w-5xl mx-auto p-8">
      <div className="relative flex flex-col md:flex-row">
        <div className="md:w-1/2">
          <img
            src={event.image}
            alt={event.name}
            className="w-full h-80 object-cover rounded-t-xl md:rounded-l-xl md:rounded-t-none shadow-lg border-4 border-gray-200"
          />
        </div>
        <div className="p-6 md:w-1/2 flex flex-col justify-between">
          <div className="space-y-4">
            <h1 className="text-4xl font-extrabold mb-2 text-white">
              {event.name}
            </h1>
          </div>

          <div className="mt-6 space-y-4 text-white">
            <div className="flex  items-center text-lg space-x-3">
              <FaCalendarAlt className="text-yellow-500" />
              <span>
                <strong>Date & Time:</strong>{" "}
                {new Date(event.timeDate).toLocaleString()}
              </span>
            </div>
            <div className="flex items-center text-lg space-x-3">
              <FaUsers className="text-blue-500" />
              <span>
                <strong>Club:</strong>{" "}
                {event.club ? event.club.name : "No Club Associated"}
              </span>
            </div>
            <div className="flex items-center text-lg space-x-3">
              <FaUsers className="text-green-500" />
              <span>
                <strong>Students Limit:</strong> {event.studentsLimit}
              </span>
            </div>
            <div className="flex items-center text-lg space-x-3">
              <FaMoneyBillWave className="text-red-500" />
              <span>
                <strong>Ticket Price:</strong>{" "}
                {event.ticketPrice === 0
                  ? "Free"
                  : `₹${event.ticketPrice.toFixed(2)}`}
              </span>
            </div>
            <div className="flex items-center text-lg space-x-3">
              <FaTicketAlt className="text-indigo-500" />
              <span>
                <strong>Created By:</strong>{" "}
                {event.createdBy?.name || event.createdById}
              </span>
            </div>
          </div>

          <div className="mt-8">
            {isPurchased ? (
              <div className="flex flex-col  space-y-3">
                <p className="text-center text-orange-700">
                  You Alredy Enroll in this event for Download Your Tickets
                </p>
                <button
                  className="w-full bg-gradient-to-r from-purple-600 to-indigo-500 text-white py-3 rounded-full text-xl font-semibold tracking-wide shadow-lg hover:shadow-2xl transform transition duration-300 hover:from-pink-600 hover:to-purple-500 flex items-center justify-center space-x-2"
                  onClick={() => navigate("/dashboard")}
                >
                  <FaTicketAlt />
                  <span>Go to Dashboard</span>
                </button>
              </div>
            ) : (
              <button
                className="w-full bg-gradient-to-r from-purple-600 to-indigo-500 text-white py-3 rounded-full text-xl font-semibold tracking-wide shadow-lg hover:shadow-2xl transform transition duration-300 hover:from-pink-600 hover:to-purple-500 flex items-center justify-center space-x-2"
                onClick={handleOnClick}
              >
                <FaTicketAlt />
                <span>Purchase Tickets</span>
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="mt-8 p-6 bg-gray-900 rounded-xl shadow-md border-2 ">
        <h2 className="text-2xl text-white font-semibold mb-4">
          About This Event
        </h2>
        <p className="text-gray-600 leading-relaxed">
          {event.description || "No additional information provided."}
        </p>
      </div>
    </div>
  );
};

export default EventDetails;
