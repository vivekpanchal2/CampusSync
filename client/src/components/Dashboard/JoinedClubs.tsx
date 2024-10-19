import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/reducers";
import Loader from "../common/Loader";
import { Link } from "react-router-dom";
import { getJoinedClubs } from "../../services/operations/ClubApi";
import { JoinedClub } from "../Types/types";

const JoinedClubs: React.FC = () => {
  const [joinedClubs, setJoinedClubs] = useState<JoinedClub[]>([]);
  const { token, loading } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<any>();

  useEffect(() => {
    async function fetchJoinedClub() {
      if (token) {
        const response = await dispatch(getJoinedClubs(token));
        setJoinedClubs(response.joinedClubs);
      }
    }
    fetchJoinedClub();
  }, [token, dispatch]);

  if (loading) {
    return <Loader loading={loading} />;
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-4xl font-extrabold text-white mb-8 text-center">
        My Joined Clubs
      </h1>

      {joinedClubs.length > 0 ? (
        <div className="space-y-6">
          {joinedClubs.map((clubItem, index) => (
            <div
              key={index}
              className="bg-gray-800 rounded-lg shadow-md p-6 flex flex-col md:flex-row items-center justify-between hover:shadow-2xl shadow-slate-950 transition-shadow duration-300"
            >
              <div className="w-full md:w-1/3 h-48 md:h-52 overflow-hidden rounded-lg">
                <img
                  src={clubItem.club.logoUrl}
                  alt={clubItem.club.name}
                  className="object-cover w-full h-full"
                />
              </div>

              <div className="flex flex-col md:ml-8 mt-4 md:mt-0 w-full md:w-2/3 text-white">
                <h2 className="text-2xl font-bold mb-3">
                  {clubItem.club.name}
                </h2>

                <div className="space-y-2 text-gray-300">
                  <p>
                    <strong>Your MemberId:</strong> {clubItem.memberId}
                  </p>
                </div>
                <div className="mt-6">
                  <Link
                    to={`/clubs/${clubItem.clubId}`} // Adjust the link to a detailed club view
                    className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full transition-colors"
                  >
                    View Club Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-400 text-center">
          You haven't joined any clubs yet.
        </p>
      )}
    </div>
  );
};

export default JoinedClubs;
