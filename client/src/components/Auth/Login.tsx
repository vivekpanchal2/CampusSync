import { useState, useEffect } from "react";
import { login } from "../../services/operations/AuthApi";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { LoginFormProps, FormData } from "../Types/types";

const LoginForm: React.FC<LoginFormProps> = ({ isLogin, setIsLogin }) => {
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

  const [currentIndex, setCurrentIndex] = useState(0);

  const [formdata, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });

  const handleOnChange = (e: any): void => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const { email, password } = formdata;

  const handleOnSubmit = (e: any): void => {
    e.preventDefault();
    dispatch(login(email, password, navigate));
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
    }, 2000);

    return () => clearInterval(timer);
  }, [items.length]);

  return (
    <div className="flex min-h-[calc(100vh-4.5rem)] bg-gray-100">
      <div className="hidden md:flex w-1/2 bg-cyan-900 text-white justify-center items-center p-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">
            Welcome Back to{" "}
            <span className="text-yellow-400"> CampusSync! 🎓 </span>
          </h1>
          <p className="text-lg mb-6">
            Reconnect with your campus community and stay on top of all the
            latest events and happenings at{" "}
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
            Log In to CampusSync
          </h2>
          <form onSubmit={handleOnSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                onChange={(e) => handleOnChange(e)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-200 text-black"
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700">Password</label>
              <input
                type="password"
                name="password"
                onChange={(e) => handleOnChange(e)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-200 text-black"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300"
            >
              Log In
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={toggleForm}
              className="text-gray-700 hover:underline"
            >
              Don't have an account? Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
