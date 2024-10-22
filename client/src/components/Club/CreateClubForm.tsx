import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createClub } from "../../services/operations/ClubApi";
import { useDispatch } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import { Testimonial } from "../Types/types";

const CreateClubForm = () => {
  const { control, handleSubmit, setValue } = useForm();
  const [galleryImages, setGalleryImages] = useState<File[]>([]);
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();

  const handleAddGalleryImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setGalleryImages([...galleryImages, e.target.files[0]]);
    }
  };

  const onSubmit = async (data: any) => {
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      if (key === "logo") {
        formData.append("logo", data.logo[0]);
      } else {
        formData.append(key, data[key]);
      }
    });

    galleryImages.forEach((image, index) => {
      formData.append(`galleryImages[${index}]`, image);
    });

    data.testimonials.forEach((testimonial: Testimonial, index: number) => {
      formData.append(`testimonials[${index}][content]`, testimonial.content);
      formData.append(`testimonials[${index}][author]`, testimonial.author);
    });

    dispatch(createClub(formData, navigate));
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full md:w-2/3 h-[calc(100vh-4.5rem)] overflow-scroll mx-auto p-8 bg shadow-lg bg-slate-800 rounded-lg"
    >
      <h2 className="text-3xl font-bold text-center mb-8 border-b-2 pb-7">
        Create a New Club 🚀
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-sm font-medium text-white">
            Club Name:
          </label>
          <Controller
            name="name"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <input
                type="text"
                {...field}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-3"
              />
            )}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-white">
            Category:
          </label>
          <Controller
            name="category"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <input
                type="text"
                {...field}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-3"
              />
            )}
          />
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-white">
          Description:
        </label>
        <Controller
          name="description"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <textarea
              {...field}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-3"
            />
          )}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div>
          <label className="block text-sm font-medium text-white">
            President:
          </label>
          <Controller
            name="president"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <input
                type="text"
                {...field}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-3"
              />
            )}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-white">
            Vice-President:
          </label>
          <Controller
            name="vicePresident"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <input
                type="text"
                {...field}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-3"
              />
            )}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-white">
            Secretary:
          </label>
          <Controller
            name="secretary"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <input
                type="text"
                {...field}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-3"
              />
            )}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-sm font-medium text-white">Email:</label>
          <Controller
            name="email"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <input
                type="email"
                {...field}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-3"
              />
            )}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-white">Phone:</label>
          <Controller
            name="phone"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <input
                type="tel"
                {...field}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-3"
              />
            )}
          />
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-white">Logo:</label>
        <Controller
          name="logo"
          control={control}
          render={() => (
            <input
              type="file"
              onChange={(e) => {
                setValue("logo", e.target.files);
              }}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3"
            />
          )}
        />
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-white">
          Gallery Images:
        </label>
        <input
          type="file"
          multiple
          onChange={handleAddGalleryImage}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3"
        />
        {galleryImages.map((img, index) => (
          <p key={index} className="mt-2 text-white">
            {img.name}
          </p>
        ))}
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-white">
          Testimonials:
        </label>
        <Controller
          name="testimonials"
          control={control}
          defaultValue={[{ content: "", author: "" }]}
          render={({ field }) => (
            <>
              {field.value.map((testimonial: Testimonial, index: number) => (
                <div key={index} className="mb-4">
                  <input
                    type="text"
                    placeholder="Content"
                    value={testimonial.content}
                    onChange={(e) => {
                      const updatedTestimonials = [...field.value];
                      updatedTestimonials[index].content = e.target.value;
                      setValue("testimonials", updatedTestimonials);
                    }}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3"
                  />
                  <input
                    type="text"
                    placeholder="Author"
                    value={testimonial.author}
                    onChange={(e) => {
                      const updatedTestimonials = [...field.value];
                      updatedTestimonials[index].author = e.target.value;
                      setValue("testimonials", updatedTestimonials);
                    }}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3"
                  />
                </div>
              ))}
              <button
                type="button"
                onClick={() => {
                  const newTestimonials = [
                    ...field.value,
                    { content: "", author: "" },
                  ];
                  setValue("testimonials", newTestimonials);
                }}
                className="inline-flex items-center px-4 py-2 bg-green-600 text-white font-medium rounded-md shadow hover:bg-green-700 transition duration-300"
              >
                Add Testimonial
              </button>
            </>
          )}
        />
      </div>

      <button
        type="submit"
        className="inline-flex items-center px-4 py-2 bg-blue-600 text-white font-medium rounded-md shadow hover:bg-blue-700 transition duration-300"
      >
        Create Club
      </button>
    </form>
  );
};

export default CreateClubForm;
