import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setIsTermsModal } from "../../redux/slices/modal";
import { IoCloseSharp } from "react-icons/io5";
import { joinClub } from "../../services/operations/ClubApi";
import { RootState } from "../../redux/reducers";
import { useNavigate } from "react-router-dom";

const termsAndConditions = [
  "Members must actively participate in at least 3 events annually.",
  "Respectful and professional behavior is mandatory during all club events.",
  "Membership may be suspended for violating any club or university policies.",
  "Members are responsible for keeping their account information secure on the CampusSync platform.",
  "For detailed information and updates, visit our official website: https://www.campusSync.com.",
];

const TermsModal: React.FC<{ clubId: string }> = ({ clubId }) => {
  const [isRead, setIsRead] = useState(false);
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();

  const { token } = useSelector((state: RootState) => state.auth);

  console.log(clubId);

  const handlejoinClub = () => {
    console.log("Handle Add Member", token);
    if (token) {
      dispatch(joinClub(token, clubId, navigate));
    } else {
      navigate("/auth");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md mx-4">
        <div className=" flex justify-between mb-4 border-b-2 py-3">
          <p className="text-2xl font-semibold text-gray-800 ">
            Terms and Conditions
          </p>
          <button onClick={() => dispatch(setIsTermsModal(false))}>
            <IoCloseSharp className="text-2xl" />
          </button>
        </div>
        <div className="max-h-60 overflow-y-auto space-y-3 text-gray-600">
          {termsAndConditions.map((term, index) => (
            <p key={index} className="text-sm md:text-base">
              {index + 1}. {term}
            </p>
          ))}
        </div>

        <div className="mt-4 flex items-center border-t-2 pt-4">
          <input
            id="readCheckbox"
            type="checkbox"
            checked={isRead}
            onChange={() => setIsRead(!isRead)}
            className="mr-2 h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <label
            htmlFor="readCheckbox"
            className="text-sm md:text-base text-gray-700"
          >
            I have read the terms and conditions
          </label>
        </div>

        <button
          disabled={!isRead}
          className={`mt-6 w-full py-2 px-4 text-white font-semibold rounded-md transition ${
            isRead
              ? "bg-blue-600 hover:bg-blue-700"
              : "bg-gray-400 cursor-not-allowed"
          }`}
          onClick={() => handlejoinClub()}
        >
          Join Club
        </button>
      </div>
    </div>
  );
};

export default TermsModal;
