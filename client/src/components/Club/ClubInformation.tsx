import { useDispatch, useSelector } from "react-redux";
import { Club } from "../Types/types";
import { setIsTermsModal } from "../../redux/slices/modal";
import { downloadMemberCard } from "../../services/operations/ClubApi";
import { RootState } from "../../redux/reducers";
import { useNavigate } from "react-router-dom";
import EventCard from "../Events/EventCard"; // Import EventCard

export const ClubInformation: React.FC<{
  clubData: Club;
  userIsMember: boolean;
}> = ({ clubData, userIsMember }) => {
  const dispatch = useDispatch<any>();
  const { user }: any = useSelector((state: RootState) => state.auth);
  const { token }: any = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 lg:px-12 xl:px-28 py-10 bg-gray-900 text-white">
      <header className="text-center mb-10 flex flex-col justify-center items-center">
        <img
          src={clubData?.logoUrl}
          alt="Club Logo"
          className="w-48 h-auto mx-auto mb-4 rounded-full border-4 border-blue-300 transition duration-300 ease-in-out transform hover:scale-105"
        />
        <h1 className="text-5xl font-bold">{clubData?.name}</h1>
        <p className="text-lg mt-2">
          Category: <span className="font-semibold">{clubData?.category}</span>
        </p>
        <p className="mt-4 w-10/12 mx-auto">{clubData?.description}</p>
        {userIsMember ? (
          <button
            className="mt-4 bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition duration-200"
            onClick={() =>
              dispatch(downloadMemberCard(user?.id, clubData.id, token))
            }
          >
            Download Membership Card
          </button>
        ) : (
          <button
            className="mt-4 bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition duration-200"
            onClick={() => {
              if (!user) {
                navigate("/auth");
                return;
              }
              dispatch(setIsTermsModal(true));
            }}
          >
            Join Club
          </button>
        )}
      </header>

      <section className="mb-10">
        <h2 className="text-4xl font-semibold mb-4 bg-blue-00 p-2 rounded-lg border border-blue-300">
          Gallery
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {clubData?.gallery.map((image, index) => (
            <div
              key={index}
              className="relative overflow-hidden rounded-lg shadow-md group"
            >
              <img
                src={image.url}
                alt={`Gallery Image ${index + 1}`}
                className="w-full h-60 object-cover transition duration-300 ease-in-out transform group-hover:scale-105 group-hover:brightness-110 group-hover:shadow-2xl"
              />
            </div>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-4xl font-semibold mb-4  p-2 rounded-lg border border-green-300">
          Leadership
        </h2>
        <ul className="list-disc pl-5 space-y-2">
          <li className="font-semibold">{clubData?.president} - President</li>
          <li>{clubData?.vicePresident} - Vice President</li>
          <li>{clubData?.secretary} - Secretary</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-4xl font-semibold mb-4  p-2 rounded-lg border border-yellow-300">
          Testimonials
        </h2>
        <div className="space-y-4">
          {clubData?.testimonials.map((testimonial, index) => (
            <blockquote
              key={index}
              className="bg-gray-800 rounded-lg p-4 shadow-md"
            >
              <p className="italic">"{testimonial.content}"</p>
              <cite className="text-gray-400">- {testimonial.author}</cite>
            </blockquote>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-4xl font-semibold mb-4 p-2 rounded-lg border border-red-300">
          Contact Us
        </h2>
        <p>
          Email: <span className="font-semibold">{clubData?.email}</span>
        </p>
        <p>
          Phone: <span className="font-semibold">{clubData?.phone}</span>
        </p>
      </section>

      {clubData.events?.length > 0 && (
        <section className="mb-10">
          <h2 className="text-4xl font-semibold  p-2 rounded-lg border border-purple-300 mb-10">
            Upcoming Events
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {clubData.events.map((event: any, index: number) => (
              <EventCard
                key={index}
                id={event.id}
                image={event.image}
                name={event.name}
                timeDate={new Date(event.timeDate).toLocaleString()}
                studentsLimit={event.studentsLimit}
                ticketPrice={event.ticketPrice}
                path={`/events/${event.id}`}
                isAlmostFull={
                  event._count?.tickets >= event.studentsLimit * 0.9
                }
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
