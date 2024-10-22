import React, { useEffect, useState } from "react";
import {
  getClubDetailsForAdmin,
  deleteClubMember,
  deleteClub,
} from "../../services/operations/AdminApi";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/reducers";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../components/common/Loader";
import ConfirmationModal from "../../components/common/ConfirmationModal";

const ClubFullDetails: React.FC = () => {
  const [clubDetails, setClubDetails] = useState<any>(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const { clubId } = useParams();
  const { token, loading } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();

  async function fetchClubInfo() {
    if (token && clubId) {
      const response = await dispatch(getClubDetailsForAdmin(token, clubId));
      setClubDetails(response.clubDetails);
    }
  }

  async function handleDelete(memberId: string) {
    if (token && clubId) {
      const response = await dispatch(deleteClubMember(token, memberId));
      if (response.success) {
        setClubDetails({
          ...clubDetails,
          memberships: clubDetails.memberships.filter(
            (membership: any) => membership.memberId !== memberId
          ),
        });
      }
    }
  }

  useEffect(() => {
    fetchClubInfo();
  }, []);

  if (!clubDetails) {
    return <div className="text-white">Loading...</div>;
  }

  if (loading) {
    return <Loader loading={loading} />;
  }

  return (
    <div className="mt-16 p-8 bg-gray-800 min-h-screen">
      <div className="bg-gray-700 p-8 rounded-lg shadow-md flex flex-col md:flex-row items-center space-y-8 md:space-y-0 md:space-x-8 mb-10">
        <div className="flex-shrink-0 w-full md:w-1/3 max-w-[150px]">
          <img
            src={clubDetails.logoUrl}
            alt={clubDetails.name}
            className="w-full h-auto object-contain rounded-md shadow-lg"
          />
        </div>

        <div className="w-full">
          <h1 className="text-3xl font-bold text-white">{clubDetails.name}</h1>
          <p className="text-gray-400 text-lg mt-2">{clubDetails.category}</p>
          <p className="mt-4 text-gray-300">{clubDetails.description}</p>
        </div>
      </div>

      <div className="bg-gray-700 p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-white mb-6">Club Members</h2>

        <div className="overflow-x-auto">
          <table className="min-w-full text-left bg-gray-800 rounded-lg">
            <thead>
              <tr className="bg-gray-600 text-gray-300 uppercase text-sm leading-normal">
                <th className="px-6 py-3">#ID</th>
                <th className="px-6 py-3">Membership No.</th>
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Enrollment No.</th>
                <th className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-400 text-sm font-light">
              {clubDetails.memberships.map((membership: any, index: number) => (
                <tr
                  key={membership.memberId}
                  className="border-b border-gray-600 hover:bg-gray-700"
                >
                  <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {membership.memberId}
                  </td>
                  <td className="px-6 py-4">{membership.user.name}</td>
                  <td className="px-6 py-4">
                    {membership.user.collegeEnrollNo}
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleDelete(membership.memberId)}
                      className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex w-full justify-center mt-10">
        <button
          className="rounded-md p-3 bg-red-500 text-white"
          onClick={() => setModalOpen(true)}
        >
          Delete Club
        </button>
      </div>
      <ConfirmationModal
        isOpen={isModalOpen}
        title="Delete Club"
        message="Are you sure you want to Delete this Club?"
        onConfirm={() => {
          dispatch(deleteClub(token, clubDetails.id, navigate));
          setModalOpen(false);
        }}
        onCancel={() => setModalOpen(false)}
      />
    </div>
  );
};

export default ClubFullDetails;
