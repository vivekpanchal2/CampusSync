import React, { useState } from "react";
import { EventDetailsProps } from "../Types/types";

import { FaEdit } from "react-icons/fa";
import EditEventModal from "../Events/EditEventModal";
import ConfirmationModal from "../common/ConfirmationModal";
import { deleteEvent } from "../../services/operations/EventApi";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/reducers";
import { useNavigate } from "react-router-dom";

const EventInsightsPage: React.FC<EventDetailsProps> = ({ eventDetails }) => {
  const {
    name,
    description,
    timeDate,
    image,
    studentsLimit,
    ticketPrice,
    createdAt,
    venue,
    tickets,
  } = eventDetails;

  console.log(eventDetails.id);

  const token = useSelector((state: RootState) => state.auth.token);
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();

  const totalRegistered = tickets.length;
  const totalCollection = ticketPrice * totalRegistered;
  const [isEditEventModalOpen, setIsEditEventModalOpen] = useState(false);
  const [isDeleteEventModalOpen, setIsDeleteEventModalOpen] = useState(false);

  return (
    <div className="max-w-5xl mx-auto mt-[5rem] p-6 bg-gray-100">
      <div className="bg-white shadow-md rounded-lg overflow-hidden mb-8">
        <img src={image} alt={name} className="w-full h-64 object-cover" />
        <div className="p-6">
          <div className=" flex justify-between items-center px-5 my-5">
            <div className="w-6/12 overflow-hidden">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">{name}</h1>
            </div>
            <button
              className="flex items-center gap-2 h-10 bg-blue-500 px-3 "
              onClick={() => setIsEditEventModalOpen(true)}
            >
              <FaEdit />
              Edit Event
            </button>
            <button
              className="flex items-center gap-2 h-10 bg-red-500 px-3 "
              onClick={() => setIsDeleteEventModalOpen(true)}
            >
              <FaEdit />
              Delete Event
            </button>
          </div>
          <div className="p-4 border h-auto rounded-lg bg-gray-50">
            <p className="text-gray-700 font-semibold">Description:</p>
            <p className="text-gray-800 break-words">{description}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
            <div className="p-4 border rounded-lg bg-gray-50">
              <p className="text-gray-700 font-semibold">Venue:</p>
              <p className="text-gray-800">{venue}</p>
            </div>
            <div className="p-4 border rounded-lg bg-gray-50">
              <p className="text-gray-700 font-semibold">Date & Time:</p>
              <p className="text-gray-800">
                {new Date(timeDate).toLocaleString()}
              </p>
            </div>
            <div className="p-4 border rounded-lg bg-gray-50">
              <p className="text-gray-700 font-semibold">Student Limit:</p>
              <p className="text-gray-800">{studentsLimit}</p>
            </div>
            <div className="p-4 border rounded-lg bg-gray-50">
              <p className="text-gray-700 font-semibold">Ticket Price:</p>
              <p className="text-gray-800">
                {ticketPrice === 0 ? "Free" : `₹${ticketPrice}`}
              </p>
            </div>
            <div className="p-4 border rounded-lg bg-gray-50">
              <p className="text-gray-700 font-semibold">
                Total Students Registered:
              </p>
              <p className="text-gray-800">{totalRegistered}</p>
            </div>
            <div className="p-4 border rounded-lg bg-gray-50">
              <p className="text-gray-700 font-semibold">Total Collection:</p>
              <p className="text-gray-800">
                {ticketPrice === 0 ? "Free Event" : `₹${totalCollection}`}
              </p>
            </div>
          </div>
          <p className="text-sm text-gray-500">
            <span className="font-semibold">Created At:</span>{" "}
            {new Date(createdAt).toLocaleString()}
          </p>
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <h2 className="text-2xl font-semibold text-gray-800 px-6 py-4 border-b">
          Registered Users
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto text-left">
            <thead className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <tr>
                <th className="py-3 px-6">User Name</th>
                <th className="py-3 px-6">Enrollment No.</th>
                <th className="py-3 px-6">Ticket ID</th>
                <th className="py-3 px-6">Download Ticket</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {tickets.map((ticket, index) => (
                <tr
                  key={ticket.id}
                  className={`border-b ${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  } hover:bg-gray-100`}
                >
                  <td className="py-3 px-6">{ticket.user.name}</td>
                  <td className="py-3 px-6">{ticket.user.collegeEnrollNo}</td>
                  <td className="py-3 px-6">{ticket.ticketId}</td>
                  <td className="py-3 px-6">
                    <a
                      href={ticket.ticketUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      Download
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <EditEventModal
        isOpen={isEditEventModalOpen}
        onClose={() => setIsEditEventModalOpen(false)}
        initialData={eventDetails}
      />
      <ConfirmationModal
        isOpen={isDeleteEventModalOpen}
        title="Delete Event"
        message="Are you sure you want to Delete this event?"
        onConfirm={() => {
          dispatch(deleteEvent(token, eventDetails.id, navigate));
          setIsDeleteEventModalOpen(false);
        }}
        onCancel={() => setIsDeleteEventModalOpen(false)}
      />
    </div>
  );
};

export default EventInsightsPage;
