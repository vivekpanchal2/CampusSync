import { useEffect, useState } from "react";
import EventInsightsPage from "../../components/Dashboard/EventInsightsPage";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/reducers";
import Loader from "../../components/common/Loader";
import { getEventDetailsForAdmin } from "../../services/operations/AdminApi";

const EventDetails = () => {
  const [eventDetail, setEventDetails] = useState(null);

  const { eventId } = useParams();

  const { token } = useSelector((state: RootState) => state.auth);
  const { loading } = useSelector((state: RootState) => state.auth);

  const dispatch = useDispatch<any>();

  console.log({ token, eventId });

  useEffect(() => {
    async function fetchEventDetails() {
      if (token && eventId) {
        const response = await dispatch(
          getEventDetailsForAdmin(token, eventId)
        );

        console.log(response);
        setEventDetails(response.eventDetails);
      }
    }
    fetchEventDetails();
  }, []);

  if (!eventDetail) {
    return <Loader loading={loading} />;
  }
  return (
    <div>
      <EventInsightsPage eventDetails={eventDetail} />
    </div>
  );
};

export default EventDetails;
