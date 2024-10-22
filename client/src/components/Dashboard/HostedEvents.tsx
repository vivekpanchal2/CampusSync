import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/reducers";
import { getMyHostedEvents } from "../../services/operations/EventApi";
import Loader from "../common/Loader";
import { Link } from "react-router-dom";
import { Event } from "../Types/types";

const HostedEvents: React.FC = () => {
  const [hostedEvents, setHostedEvents] = useState<Event[]>([]);
  const { token, loading } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<any>();

  useEffect(() => {
    async function fetchHostedEvents() {
      if (token) {
        const response = await dispatch(getMyHostedEvents(token));
        setHostedEvents(response.hostedEvents);
      }
    }
    fetchHostedEvents();
  }, [token, dispatch]);

  console.log(hostedEvents);

  if (loading) {
    return <Loader loading={loading} />;
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-4xl font-extrabold text-white mb-8 text-center">
        My Organized Events
      </h1>

      {hostedEvents.length > 0 ? (
        <div className="space-y-6">
          {hostedEvents.map((event, index) => (
            <div
              key={index}
              className="bg-gray-800 rounded-lg shadow-md p-6 flex flex-col md:flex-row items-center justify-between hover:shadow-2xl shadow-slate-950 transition-shadow duration-300"
            >
              <div className="w-full md:w-1/3 h-48 md:h-52 overflow-hidden rounded-lg">
                <img
                  src={event.image}
                  alt={event.name}
                  className="object-cover w-full h-full"
                />
              </div>

              <div className="flex flex-col md:ml-8 mt-4 md:mt-0 w-full md:w-2/3 text-white">
                <h2 className="text-2xl font-bold mb-3">{event.name}</h2>
                <div className="space-y-2 text-gray-300">
                  <p>
                    <strong>Venue:</strong> {event.venue}
                  </p>
                  <p>
                    <strong>Date & Time:</strong>{" "}
                    {new Date(event.timeDate).toLocaleString()}
                  </p>
                  {event.club && (
                    <p>
                      <strong>Club:</strong> {event.club.name}
                    </p>
                  )}
                </div>

                <div className="mt-6">
                  <Link
                    to={`/dashboard/myEvents/${event.id}`} // Adjust the link to the detailed event view
                    className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full transition-colors"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-400 text-center">
          You haven't organized any events yet.
        </p>
      )}
    </div>
  );
};

export default HostedEvents;
