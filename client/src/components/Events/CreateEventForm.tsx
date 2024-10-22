import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { getClubList, createEvent } from "../../services/operations/EventApi";
import { useNavigate } from "react-router-dom";

interface EventData {
  name: string;
  description: string;
  clubId: string | undefined;
  timeDate: string;
  image: File | null;
  studentsLimit: number;
  ticketPrice: number;
  venue: string;
}

const CreateEventForm: React.FC = () => {
  const [clubList, setClubList] = useState<
    { id: string; name: string; memberships: any[] }[]
  >([]);

  const dispatch = useDispatch<any>();
  const navigate = useNavigate();

  const userId = useSelector((state: any) => state.auth.user.id);
  const token = useSelector((state: any) => state.auth.token);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<EventData>();

  useEffect(() => {
    fetchClubList();
  }, []);

  const getCurrentDateTime = () => {
    const now = new Date();
    now.setDate(now.getDate() + 1);
    const currentDateTime = now.toISOString().slice(0, 16);
    return currentDateTime;
  };

  async function fetchClubList() {
    try {
      const response = await dispatch(getClubList());
      const clubs = response.data.data;
      setClubList(clubs);
    } catch (error) {
      console.error("Failed to fetch clubs:", error);
    }
  }

  const onSubmit = async (data: EventData) => {
    const formattedDate = new Date(data.timeDate).toISOString().slice(0, 19);

    const updatedData = {
      ...data,
      timeDate: formattedDate,
    };

    try {
      await dispatch(createEvent(updatedData, navigate, token));
    } catch (error) {
      console.error("Failed to create event:", error);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setValue("image", file);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full bg-white p-6 shadow-md rounded-md space-y-4 overflow-scroll"
    >
      <h2 className="text-3xl font-bold text-center mb-8 border-b-2 pb-7">
        Create A New Event 🚀
      </h2>

      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700"
        >
          Event Name
        </label>
        <input
          type="text"
          {...register("name", { required: true })}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
        {errors.name && <p className="text-red-500">Event name is required</p>}
      </div>

      <div>
        <label
          htmlFor="venue"
          className="block text-sm font-medium text-gray-700"
        >
          Venue
        </label>
        <input
          type="text"
          {...register("venue", { required: true })}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
        {errors.name && <p className="text-red-500">Venue is required</p>}
      </div>

      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700"
        >
          Description
        </label>
        <textarea
          {...register("description", { required: true })}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
        {errors.description && (
          <p className="text-red-500">Description is required</p>
        )}
      </div>

      <div>
        <label
          htmlFor="clubId"
          className="block text-sm font-medium text-gray-700"
        >
          Club
        </label>
        <select
          {...register("clubId", { required: true })}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        >
          <option value="">Select a Club</option>
          {clubList.map((club) => (
            <option
              key={club.id}
              value={club.id}
              disabled={
                !club.memberships.some(
                  (membership) => membership.userId === userId
                )
              }
            >
              {club.name}
              {!club.memberships.some(
                (membership) => membership.userId === userId
              ) && " (You are not a member)"}
            </option>
          ))}
          <option value="noClub">other</option>
        </select>
        {errors.clubId && (
          <p className="text-red-500">Club selection is required</p>
        )}
      </div>

      <div>
        <label
          htmlFor="timeDate"
          className="block text-sm font-medium text-gray-700"
        >
          Event Date & Time
        </label>
        <input
          type="datetime-local"
          {...register("timeDate", { required: true })}
          min={getCurrentDateTime()}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
        {errors.timeDate && (
          <p className="text-red-500">Event date & time is required</p>
        )}
      </div>

      <div>
        <label
          htmlFor="image"
          className="block text-sm font-medium text-gray-700"
        >
          Event image
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          required
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
      </div>

      <div>
        <label
          htmlFor="studentsLimit"
          className="block text-sm font-medium text-gray-700"
        >
          Total Tickets
        </label>
        <input
          type="number"
          {...register("studentsLimit", { required: true, min: 0 })}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
        {errors.studentsLimit && (
          <p className="text-red-500">Total tickets are required</p>
        )}
      </div>

      <div>
        <label
          htmlFor="ticketPrice"
          className="block text-sm font-medium text-gray-700"
        >
          Ticket Price
        </label>
        <input
          type="number"
          {...register("ticketPrice", { required: true, min: 0 })}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
        {errors.ticketPrice && (
          <p className="text-red-500">Ticket price is required</p>
        )}
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:ring focus:ring-blue-300"
      >
        Create Event
      </button>
    </form>
  );
};

export default CreateEventForm;
