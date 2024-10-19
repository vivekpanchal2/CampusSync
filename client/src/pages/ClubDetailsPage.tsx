import React, { useEffect, useState } from "react";
import { Club } from "../components/Types/types";
import { useParams } from "react-router-dom";
import { getClubInfo } from "../services/operations/ClubApi";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/reducers";
import Loader from "../components/common/Loader";
import TermsModal from "../components/Club/TermsModal";
import { ClubInformation } from "../components/Club/ClubInformation";

const ClubDetailsPage: React.FC = () => {
  const [clubData, setClubData] = useState<Club | null>(null);
  const [userIsMember, setUserIsMember] = useState<boolean>(false);

  const dispatch = useDispatch<any>();
  const { loading } = useSelector((state: RootState) => state.auth);
  const { termsModal } = useSelector((state: RootState) => state.modal);
  const { clubId } = useParams<{ clubId: string }>();
  const { user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (clubId) {
      fetchClubData(clubId);
    }
  }, [clubId]);

  const fetchClubData = async (clubId: string) => {
    const response: any = await dispatch(getClubInfo(clubId));
    setClubData(response.data);

    const foundMember = response.data.memberships.find(
      (member: any) => member.userId === user?.id
    );

    setUserIsMember(!!foundMember);
  };

  if (!clubData) {
    return <Loader loading={loading} />;
  }

  return (
    <div className="bg-gray-900 rounded-lg shadow-lg mt-[4.5rem]">
      <ClubInformation clubData={clubData} userIsMember={userIsMember} />
      {clubId && termsModal && <TermsModal clubId={clubId} />}
    </div>
  );
};

export default ClubDetailsPage;
