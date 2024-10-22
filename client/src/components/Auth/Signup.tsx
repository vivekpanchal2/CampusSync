import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signUp } from "../../services/operations/AuthApi";

interface SignupFormProps {
  isLogin: boolean;
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

interface FormData {
  email: string;
  name: string;
  collegeEnrollNo: string;
  password: string;
}

const SignupForm: React.FC<SignupFormProps> = ({ isLogin, setIsLogin }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();

  const toggleForm = (): void => {
    setIsLogin(!isLogin);
  };

  const items = [
    "🌟 View your favorite societies 🌟",
    "📅 Check upcoming events 📅",
    "🤝 Stay connected with the student community 🤝",
    "🛠️ Join workshops and seminars 🛠️",
    "🎉 Participate in fun activities 🎉",
    "🤗 Network with fellow students 🤗",
    "📰 Stay updated with campus news 📰",
  ];

  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
    }, 2000);

    return () => clearInterval(timer);
  }, [items.length]);

  const [formdata, setFormData] = useState<FormData>({
    email: "",
    name: "",
    collegeEnrollNo: "",
    password: "",
  });

  const handleOnChange = (e: any): void => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const { name, email, password, collegeEnrollNo } = formdata;

  const handleOnSubmit = (e: any): void => {
    e.preventDefault();
    dispatch(signUp(name, email, password, collegeEnrollNo, navigate));
  };

  return (
    <div className="flex min-h-[calc(100vh-4.5rem)] bg-gray-100">
      <div className="hidden md:flex w-1/2 bg-cyan-900 text-white justify-center items-center p-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">
            Welcome to <span className="text-yellow-400"> CampusSync! 🎓 </span>
          </h1>
          <p className="text-lg mb-6">
            Join the CampusSync community to stay updated on all the exciting
            societies, clubs, and events at
            <span className="text-yellow-400"> Silver Oak University.</span>
          </p>
          <div className="text-lg font-semibold mb-6 transition-opacity duration-500 ease-in-out opacity-100">
            {items[currentIndex]}
          </div>
        </div>
      </div>

      <div className="flex w-full md:w-1/2 justify-center items-center p-8">
        <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Sign Up to CampusSync
          </h2>
          <form onSubmit={handleOnSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700">Name</label>
              <input
                type="text"
                value={formdata.name}
                name="name"
                onChange={(e) => handleOnChange(e)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-200 text-black"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">College Enroll No.</label>
              <input
                type="number"
                required
                value={formdata.collegeEnrollNo}
                name="collegeEnrollNo"
                onChange={(e) => handleOnChange(e)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-200 text-black"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                value={formdata.email}
                required
                name="email"
                onChange={(e) => handleOnChange(e)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-200 text-black"
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700">Password</label>
              <input
                type="password"
                value={formdata.password}
                name="password"
                onChange={(e) => handleOnChange(e)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-200 text-black   "
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300"
            >
              Sign Up
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={toggleForm}
              className="text-gray-700 hover:underline"
            >
              Already have an account? Log In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
