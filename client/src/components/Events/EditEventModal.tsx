import React from "react";
import { useForm } from "react-hook-form";
import { editEvent } from "../../services/operations/EventApi";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/reducers";
import { useNavigate } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { Event } from "../Types/types";

interface EditEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData: Event;
}

const EditEventModal: React.FC<EditEventModalProps> = ({
  isOpen,
  onClose,
  initialData,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Event>({
    defaultValues: {
      ...initialData,
      timeDate: new Date(initialData.timeDate).toISOString().slice(0, 16),
    },
  });

  const dispatch = useDispatch<any>();
  const token = useSelector((state: RootState) => state.auth.token);
  const eventId = initialData.id;
  const navigate = useNavigate();

  const onSubmit = async (data: Event) => {
    if (token) {
      await dispatch(editEvent(token, eventId, data, navigate));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="bg-white p-6 rounded-md shadow-md  w-[80vw] md:w-[50vw] border-4 border-blue-950">
        <h2 className="text-2xl font-bold flex justify-center gap-3 items-center mb-4 border-b-2 pb-6 border-black">
          <FaEdit /> Edit Event
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 border-b-2"
            >
              Event Name
            </label>
            <input
              type="text"
              {...register("name", { required: true })}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
            {errors.name && (
              <p className="text-red-500">Event name is required</p>
            )}
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
            {errors.venue && <p className="text-red-500">Venue is required</p>}
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
              htmlFor="timeDate"
              className="block text-sm font-medium text-gray-700"
            >
              Event Date & Time
            </label>
            <input
              type="datetime-local"
              {...register("timeDate", { required: true })}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
            {errors.timeDate && (
              <p className="text-red-500">Event date & time is required</p>
            )}
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

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
          >
            Update Event
          </button>
        </form>

        <button
          onClick={onClose}
          className="mt-4 w-full bg-red-600 py-2 px-4 text-white underline rounded-md"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default EditEventModal;
