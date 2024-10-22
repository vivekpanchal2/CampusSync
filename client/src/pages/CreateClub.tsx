import CreateClubForm from "../components/Club/CreateClubForm";

const CreateClubPage: React.FC = () => {
  return (
    <div className="flex flex-col md:flex-row mt-[4.5rem] h-[calc(100vh-4.5rem)]">
      <div className="relative hidden md:block w-1/3">
        <img
          src="https://i.ibb.co/1M90RXN/imgs.jpg"
          alt="Club Image"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black opacity-50"></div>

        <div className="absolute inset-0 flex bg-black bg-opacity-50 text-center">
          <p className="text-white text-xl md:text-2xl font-semibold pt-40 px-4">
            "Clubs are the heartbeat of campus life. Join us to create, inspire,
            and innovate!"
          </p>
        </div>
      </div>

      <CreateClubForm />
    </div>
  );
};

export default CreateClubPage;
