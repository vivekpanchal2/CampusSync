import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createClub } from "../services/operations/ClubApi";
import { useDispatch } from "react-redux";

interface Testimonial {
  content: string;
  author: string;
}

const CreateClubForm: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [president, setPresident] = useState<string>("");
  const [vicePresident, setVicePresident] = useState<string>("");
  const [secretary, setSecretary] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");

  const [logo, setLogo] = useState<File | null>(null);
  const [galleryImages, setGalleryImages] = useState<File[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([
    { content: "", author: "" },
  ]);

  const dispatch = useDispatch<any>();
  const navigate = useNavigate();

  const handleAddTestimonial = () => {
    setTestimonials([...testimonials, { content: "", author: "" }]);
  };

  const handleAddGalleryImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setGalleryImages([...galleryImages, e.target.files[0]]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("secretary", secretary);
    formData.append("president", president);
    formData.append("vicePresident", vicePresident);
    formData.append("phone", phone);
    formData.append("email", email);

    if (logo) formData.append("logo", logo);

    galleryImages.forEach((image, index) => {
      formData.append(`galleryImages[${index}]`, image);
    });

    testimonials.forEach((testimonial, index) => {
      formData.append(`testimonials[${index}][content]`, testimonial.content);
      formData.append(`testimonials[${index}][author]`, testimonial.author);
    });

    dispatch(createClub(formData, navigate));
  };

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

      <form
        onSubmit={handleSubmit}
        className="w-full md:w-2/3 h-[calc(100vh-4.5rem)] overflow-scroll  mx-auto p-8 bg shadow-lg bg-slate-800 rounded-lg"
      >
        <h2 className="text-3xl font-bold text-center mb-8 border-b-2 pb-7">
          Create a New Club 🚀
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-white">
              Club Name:
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-3"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white">
              Category:
            </label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-3"
            />
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-white">
            Description:
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-3"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-white">
              President:
            </label>
            <input
              type="text"
              value={president}
              onChange={(e) => setPresident(e.target.value)}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-3"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white">
              Vice-President:
            </label>
            <input
              type="text"
              value={vicePresident}
              onChange={(e) => setVicePresident(e.target.value)}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-3"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white">
              Secretary:
            </label>
            <input
              type="text"
              value={secretary}
              onChange={(e) => setSecretary(e.target.value)}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-3"
            />
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-white">Logo:</label>
          <input
            type="file"
            onChange={(e) => setLogo(e.target.files?.[0] || null)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3"
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
          {testimonials.map((testimonial, index) => (
            <div key={index} className="mb-4">
              <input
                type="text"
                placeholder="Content"
                value={testimonial.content}
                onChange={(e) =>
                  setTestimonials(
                    testimonials.map((t, i) =>
                      i === index ? { ...t, content: e.target.value } : t
                    )
                  )
                }
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-3 mb-2"
              />
              <input
                type="text"
                placeholder="Author"
                value={testimonial.author}
                onChange={(e) =>
                  setTestimonials(
                    testimonials.map((t, i) =>
                      i === index ? { ...t, author: e.target.value } : t
                    )
                  )
                }
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-3"
              />
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddTestimonial}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white font-medium rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Add Testimonial
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-white">
              Contact Email:
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-3"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white">
              Contact Phone No:
            </label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-3"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-blue-600 text-white font-semibold rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Create Club
        </button>
      </form>
    </div>
  );
};

export default CreateClubForm;
