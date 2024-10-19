import { Link } from "react-router-dom";
import {
  FaCalendarAlt,
  FaUsers,
  FaMoneyBillWave,
  FaExclamationTriangle,
} from "react-icons/fa";

interface EventCardProps {
  id: string;
  image: string;
  name: string;
  timeDate: string;
  studentsLimit: number;
  ticketPrice: number;
  path: string;
  isAlmostFull: boolean;
}

const EventCard: React.FC<EventCardProps> = ({
  image,
  name,
  timeDate,
  studentsLimit,
  ticketPrice,
  path,
  isAlmostFull,
}) => {
  return (
    <Link
      to={path}
      className="event-card bg-gray-800 rounded-xl shadow-lg overflow-hidden transition-transform hover:shadow-2xl"
    >
      <div className="relative h-56 overflow-hidden">
        <img src={image} alt={name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70"></div>
      </div>

      <div className="p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">{name}</h2>

        <div className="flex items-center space-x-2 text-gray-400 mb-2">
          <FaCalendarAlt className="text-yellow-500" />
          <span>{timeDate}</span>
        </div>

        <div className="flex items-center space-x-2 text-gray-400 mb-2">
          <FaUsers className="text-green-500" />
          <span>Max Attendees: {studentsLimit}</span>
        </div>

        <div className="flex items-center space-x-2 text-gray-400 mb-2">
          <FaMoneyBillWave className="text-red-500" />
          <span>{ticketPrice === 0 ? "Free" : `₹${ticketPrice}`}</span>
        </div>

        {isAlmostFull && (
          <div className="flex items-center space-x-2 text-red-500 mb-2">
            <FaExclamationTriangle className="text-yellow-500" />
            <span>Limited Seats Available!</span>
          </div>
        )}

        <button className="mt-4 w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-2 rounded-full font-semibold shadow-lg hover:shadow-2xl transition-transform">
          View Details
        </button>
      </div>
    </Link>
  );
};

export default EventCard;
