import { Link } from "react-router-dom";
import { FaUsers, FaRegFileAlt } from "react-icons/fa";
import { ClubCardProps } from "../Types/types";

const ClubCard: React.FC<ClubCardProps> = ({ filteredClubs, basepath }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 md:px-0">
      {filteredClubs.length > 0 ? (
        filteredClubs.map((club) => (
          <Link
            to={`/${basepath}/${club.id}`}
            key={club.id}
            className="event-card bg-gray-800 rounded-xl shadow-lg overflow-hidden transition-transform hover:shadow-2xl"
          >
            <div className="relative h-56 w-full overflow-hidden">
              <img
                src={club.logoUrl}
                alt={`${club.name} Logo`}
                className="w-full h-full object-contain bg-white"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70"></div>
            </div>

            <div className="p-6 text-white">
              <h2 className="text-2xl font-bold mb-2">{club.name}</h2>

              <div className="flex items-center space-x-2 text-gray-400 mb-2">
                <FaUsers className="text-green-500" />
                <span>Members: {club._count.memberships}</span>
              </div>

              <div className="flex items-center space-x-2 text-gray-400 mb-2">
                <FaRegFileAlt className="text-yellow-500" />
                <span>President: {club.president}</span>
              </div>

              <button className="mt-4 w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-2 rounded-full font-semibold shadow-lg hover:shadow-2xl transition-transform">
                View Details
              </button>
            </div>
          </Link>
        ))
      ) : (
        <p className="text-center text-gray-500 h-96 w-full">No clubs found</p>
      )}
    </div>
  );
};

export default ClubCard;
