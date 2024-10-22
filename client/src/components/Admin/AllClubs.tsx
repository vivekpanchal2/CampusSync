import { useEffect, useState } from "react";
import { getAllClubs } from "../../services/operations/AdminApi";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/reducers";
import Loader from "../common/Loader";
import ClubCard from "../Club/ClubCard";
import { Club } from "../Types/types";
import { Link } from "react-router-dom";
import { IoMdCreate } from "react-icons/io";

const AllClubs = () => {
  const [clubs, setClubs] = useState<Club[]>([]);
  const { token } = useSelector((state: RootState) => state.auth);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch<any>();

  useEffect(() => {
    const fetchClubs = async () => {
      setLoading(true);
      try {
        const clubsResponse = await dispatch(getAllClubs());
        setClubs(clubsResponse.clubs);
      } catch (error) {
        console.error("Failed to fetch clubs", error);
      } finally {
        setLoading(false);
      }
    };

    fetchClubs();
  }, [token, dispatch]);

  if (loading) {
    return <Loader loading={loading} />;
  }

  if (!clubs || clubs.length === 0) {
    return <div>No Clubs Found</div>;
  }

  return (
    <div className="p-4">
      <div className="flex justify-between mb-10">
        <h2 className="text-2xl font-bold mb-4 text-white">All Clubs</h2>
        <Link to="/admin/clubs/createClub">
          <button className="w-fit bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-8 py-2 rounded-full font-semibold shadow-lg hover:shadow-2xl transition-transform flex justify-between items-center gap-3">
            Create Club <IoMdCreate />
          </button>
        </Link>
      </div>
      <ClubCard filteredClubs={clubs} basepath={"admin/dashboard/clubs"} />
    </div>
  );
};

export default AllClubs;
