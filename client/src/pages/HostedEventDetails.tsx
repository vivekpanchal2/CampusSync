import { useEffect, useState } from "react";
import EventInsightsPage from "../components/Dashboard/EventInsightsPage";
import { getMyHostedEventDetails } from "../services/operations/EventApi";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/reducers";
import Loader from "../components/common/Loader";

const HostedEventDetails = () => {
  const [hostedEventDetail, setHostedEventDetails] = useState(null);

  const { eventId } = useParams();

  const { token } = useSelector((state: RootState) => state.auth);
  const { loading } = useSelector((state: RootState) => state.auth);

  const dispatch = useDispatch<any>();

  console.log({ token, eventId });

  useEffect(() => {
    async function fetchEventDetails() {
      if (token && eventId) {
        const response = await dispatch(
          getMyHostedEventDetails(token, eventId)
        );

        console.log(response);
        setHostedEventDetails(response.eventDetails);
      }
    }
    fetchEventDetails();
  }, []);

  if (!hostedEventDetail) {
    return <Loader loading={loading} />;
  }
  return (
    <div>
      <EventInsightsPage eventDetails={hostedEventDetail} />
    </div>
  );
};

export default HostedEventDetails;
