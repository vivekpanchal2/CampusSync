import { useEffect, useState } from "react";
import { getAllClub } from "../services/operations/ClubApi";
import { useDispatch } from "react-redux";
import { Club } from "../components/Types/types";
import { Link } from "react-router-dom";

const Clubs: React.FC = () => {
  const dispatch = useDispatch<any>();
  const [clubData, setClubData] = useState<Club[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    fetchClubs();
  }, []);

  async function fetchClubs() {
    const response = await dispatch(getAllClub());
    setClubData(response);
  }

  // Filter clubs based on search term
  const filteredClubs = clubData.filter((club) =>
    club.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-[calc(100vh-4.5rem)] flex flex-col items-center bg-gray-800 py-10 px-6 mt-[4.5rem]">
      <div className="w-full max-w-md mb-6">
        <input
          type="text"
          placeholder="Search for clubs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border border-black rounded-lg focus:outline-none focus:border-blue-500 outline-3"
        />
      </div>

      {/* Clubs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-7xl">
        {filteredClubs.length > 0 ? (
          filteredClubs.map((club) => (
            <Link to={`/club/${club.id}`}>
              <div
                key={club.id}
                className="max-w-sm rounded-lg overflow-hidden shadow-lg bg-white  duration-300 hover:shadow-2xl hover:scale-105"
              >
                <div className="relative w-full h-48 bg-white flex justify-center items-center">
                  <img
                    className="max-h-full max-w-full object-contain"
                    src={club.logoUrl}
                    alt={`${club.name} Logo`}
                  />
                </div>
                <div className="p-6">
                  <h2 className="font-bold text-lg text-gray-800 mb-2  transition-colors duration-200">
                    {club.name}
                  </h2>
                  <p className="text-gray-600 text-sm mb-1">
                    <span className="font-semibold">Category:</span>{" "}
                    {club.category}
                  </p>
                  <p className="text-gray-600 text-sm mb-1">
                    <span className="font-semibold">President:</span>{" "}
                    {club.president}
                  </p>
                  <p className="text-gray-600 text-sm mb-2">
                    <span className="font-semibold">Members:</span>{" "}
                    {club._count.members}
                  </p>
                  <button className="mt-4 w-full py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-500 transition-colors duration-200">
                    View Details
                  </button>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-center text-gray-500">No clubs found</p>
        )}
      </div>
    </div>
  );
};

export default Clubs;
