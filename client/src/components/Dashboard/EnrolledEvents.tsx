import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/reducers";
import { getMyEnrollEvents } from "../../services/operations/EventApi";
import Loader from "../common/Loader";
import { EnrolledEvent } from "../Types/types";

const EnrollEvents: React.FC = () => {
  const [enrolledEvents, setEnrolledEvents] = useState<EnrolledEvent[]>([]);
  const { token, loading } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<any>();

  useEffect(() => {
    async function fetchEnrolledEvents() {
      if (token) {
        const response = await dispatch(getMyEnrollEvents(token));
        setEnrolledEvents(response.enrollEvents);
      }
    }
    fetchEnrolledEvents();
  }, [token, dispatch]);

  if (loading) {
    return <Loader loading={loading} />;
  }

  return (
    <div className="max-w-6xl mx-auto  p-6">
      <h1 className="text-4xl font-extrabold text-white mb-8 text-center">
        My Enrolled Events
      </h1>

      {enrolledEvents.length > 0 ? (
        <div className="space-y-6">
          {enrolledEvents.map((enrolledEvent) => (
            <div
              key={enrolledEvent.id}
              className="bg-gray-800 rounded-lg shadow-md p-6 flex flex-col md:flex-row items-center justify-between hover:shadow-2xl shadow-slate-950 transition-shadow duration-300"
            >
              <div className="w-full md:w-1/3 h-48 md:h-52 overflow-hidden rounded-lg">
                <img
                  src={enrolledEvent.event.image}
                  alt={enrolledEvent.event.name}
                  className="object-cover w-full h-full"
                />
              </div>

              <div className="flex flex-col md:ml-8 mt-4 md:mt-0 w-full md:w-2/3 text-white">
                <h2 className="text-2xl font-bold mb-3">
                  {enrolledEvent.event.name}
                </h2>
                <div className="space-y-2 text-gray-300">
                  <p>
                    <strong>Venue:</strong> {enrolledEvent.event.venue}
                  </p>
                  <p>
                    <strong>Date & Time:</strong>{" "}
                    {new Date(enrolledEvent.event.timeDate).toLocaleString()}
                  </p>
                </div>

                <div className="mt-6">
                  <a
                    href={enrolledEvent.ticketUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full transition-colors"
                  >
                    Download Ticket
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-400 text-center">
          You haven't enrolled in any events yet.
        </p>
      )}
    </div>
  );
};

export default EnrollEvents;
