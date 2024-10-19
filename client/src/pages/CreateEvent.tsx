import React from "react";
import CreateEventForm from "../components/Events/CreateEventForm";

const CreateEvent: React.FC = () => {
  return (
    <div className="flex flex-col md:flex-row mt-[4.5rem] h-[calc(100vh-4.5rem)]">
      <div className="relative hidden md:block w-1/3">
        <img
          src="https://i.ibb.co/G2WkPFS/406517-PD2-R1-E-532.jpg"
          alt="Club Image"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black opacity-50"></div>

        <div className="absolute inset-0 flex bg-black bg-opacity-50 text-center">
          <p className="text-white text-xl md:text-2xl font-semibold pt-72 px-4">
            "Create, inspire, and lead the way ! <br /> your event could be the
            next big thing on campus"
          </p>
        </div>
      </div>
      <div className="md:w-2/3 w-full overflow-scroll">
        <CreateEventForm />
      </div>
    </div>
  );
};

export default CreateEvent;
