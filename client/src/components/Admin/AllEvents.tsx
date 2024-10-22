import { useEffect, useState } from "react";
import { getAllEvents } from "../../services/operations/AdminApi";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/reducers";
import Loader from "../common/Loader";
import { Event } from "../Types/types";
import EventCard from "../Events/EventCard";

const AllEvents = () => {
  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([]);
  const [completedEvents, setCompletedEvents] = useState<Event[]>([]);
  const [activeTab, setActiveTab] = useState<"upcoming" | "completed">(
    "upcoming"
  );
  const { token } = useSelector((state: RootState) => state.auth);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch<any>();

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        if (token) {
          const eventsResponse = await dispatch(getAllEvents(token));
          setUpcomingEvents(eventsResponse.upcomingEvents);
          setCompletedEvents(eventsResponse.completedEvents);
        }
      } catch (error) {
        console.error("Failed to fetch events", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [token, dispatch]);

  if (loading) {
    return <Loader loading={loading} />;
  }

  return (
    <div>
      <div className="flex justify-around mb-4 border-b-2">
        <button
          className={`text-lg font-semibold py-2 px-4 transition-colors ${
            activeTab === "upcoming"
              ? "border-b-4 border-blue-500 text-blue-500"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("upcoming")}
        >
          Upcoming Events
        </button>
        <button
          className={`text-lg font-semibold py-2 px-4 transition-colors ${
            activeTab === "completed"
              ? "border-b-4 border-blue-500 text-blue-500"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("completed")}
        >
          Completed Events
        </button>
      </div>

      <div>
        {activeTab === "upcoming" ? (
          <div>
            <h2 className="text-2xl font-bold mb-4 text-white">
              Upcoming Events
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {upcomingEvents.length > 0 ? (
                upcomingEvents.map((event: Event) => (
                  <EventCard
                    key={event.id}
                    id={event.id}
                    image={event.image}
                    name={event.name}
                    timeDate={event.timeDate}
                    studentsLimit={event.studentsLimit}
                    ticketPrice={event.ticketPrice}
                    path={`/admin/events/${event.id}`}
                  />
                ))
              ) : (
                <p>No upcoming events</p>
              )}
            </div>
          </div>
        ) : (
          <div>
            <h2 className="text-2xl font-bold mb-4 text-white">
              Completed Events
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {completedEvents.length > 0 ? (
                completedEvents.map((event: Event) => (
                  <EventCard
                    key={event.id}
                    id={event.id}
                    image={event.image}
                    name={event.name}
                    timeDate={event.timeDate}
                    studentsLimit={event.studentsLimit}
                    ticketPrice={event.ticketPrice}
                    path={`/admin/events/${event.id}`}
                  />
                ))
              ) : (
                <p>No completed events</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllEvents;
