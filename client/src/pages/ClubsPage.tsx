import { useEffect, useState } from "react";
import { getAllClub } from "../services/operations/ClubApi";
import { useDispatch, useSelector } from "react-redux";
import { Club } from "../components/Types/types";
import Loader from "../components/common/Loader";

import { RootState } from "../redux/reducers";
import ClubCard from "../components/Club/ClubCard";
import ErrorPage from "./ErrorPage";

const ClubsPage: React.FC = () => {
  const dispatch = useDispatch<any>();
  const [clubList, setClubList] = useState<Club[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const { loading } = useSelector((state: RootState) => state.auth);
  const [error, setError] = useState(false);

  const Clubs = useSelector((state: RootState) => state.feed.Clubs);

  useEffect(() => {
    fetchClubs();
  }, []);

  console.log({ Clubs });

  async function fetchClubs() {
    try {
      if (!Clubs) {
        const response = await dispatch(getAllClub());
        if (response.success) {
          setClubList(response.clubs);
        } else {
          setError(true);
          console.error("Failed to fetch clubs:", response.message); // Log error message
        }
      } else {
        setClubList(Clubs);
      }
    } catch (error) {
      setError(true);
      console.error("Error fetching clubs:", error); // Log error stack
    }
  }

  const filteredClubs = clubList.filter((club) =>
    club.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <Loader loading={loading} />;
  }

  if (error) {
    return <ErrorPage />;
  }

  return (
    <div className="container mt-[4.5rem] mx-auto px-8 lg:px-12 xl:px-28 py-12 bg-gray-900">
      <div className="mb-12">
        <h1 className="text-5xl font-extrabold text-center text-white mb-4">
          Explore Clubs
        </h1>
        <p className="text-center text-lg text-gray-400">
          Discover clubs and communities at your campus.
        </p>
      </div>

      <div className="mb-8 flex justify-center">
        <input
          type="text"
          placeholder="Search for clubs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-1/2 mx-auto p-3 rounded-md bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <ClubCard filteredClubs={filteredClubs} basepath={"clubs"} />
    </div>
  );
};

export default ClubsPage;
