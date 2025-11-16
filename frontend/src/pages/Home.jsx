import { Link, useNavigate } from "react-router-dom";
import { Settings, LogOut } from "lucide-react";
import { useContext } from "react";
import { userDataContext } from "../../context/UserContext";
import axios from "axios";

const Home = () => {
  const navigate = useNavigate();
  const { userData, setUserData, serverUrl } = useContext(userDataContext);
  const assistantName = userData?.assistantName;
  const avatarUrl = userData?.assistantImage;

  const handleLogout = async () => {
    try {
      await axios.get(`${serverUrl}/api/auth/logout`, {
        withCredentials: true,
      });
      setUserData(null);
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* --- Glassmorphism Card --- */}
        <div className="rounded-xl border border-gray-700/50 bg-gray-900/60 p-8 text-center shadow-lg backdrop-blur-sm">
          {/* --- Avatar --- */}
          <div className="mb-6 inline-block rounded-full bg-linear-to-r from-cyan-400 to-blue-600 p-1.5">
            <img
              src={avatarUrl}
              alt="Assistant Avatar"
              className="h-40 w-40 rounded-full border-4 border-gray-900 object-cover"
            />
          </div>

          {/* --- Welcome Message --- */}
          <p className="text-2xl text-gray-400">Hello, I'm</p>
          <h1 className="mb-8 text-5xl font-bold tracking-tight text-white">
            {assistantName}
          </h1>

          {/* --- (Action) Start Chat Button --- */}
          <button
            type="button"
            className="
              mb-6 w-full rounded-lg bg-linear-to-r from-cyan-400 to-blue-600 
              px-5 py-3 text-center text-base font-semibold text-white shadow-lg 
              transition-transform duration-200 ease-in-out hover:scale-[1.02] 
              focus:outline-none focus:ring-2 focus:ring-cyan-500 
              focus:ring-offset-2 focus:ring-offset-gray-900
            "
          >
            Start Conversation
          </button>

          {/* --- Navigation Buttons --- */}
          <div className="flex flex-col gap-4 sm:flex-row">
            {/* Customize Button */}
            <Link
              to="/customize"
              className="
                flex flex-1 items-center justify-center gap-2 rounded-lg 
                border-2 border-cyan-500 px-5 py-3 text-base 
                font-semibold text-cyan-400 transition-all duration-200 
                ease-in-out hover:bg-cyan-500/10 hover:text-cyan-300
                focus:outline-none focus:ring-2 focus:ring-cyan-500
              "
            >
              <Settings size={18} />
              Customize
            </Link>

            {/* Logout Button */}
            <button
              type="button"
              onClick={handleLogout}
              className="
                flex flex-1 items-center justify-center gap-2 rounded-lg 
                bg-gray-800 px-5 py-3 text-base 
                font-semibold text-gray-400 transition-all duration-200 
                ease-in-out hover:bg-gray-700 hover:text-gray-300
                focus:outline-none focus:ring-2 focus:ring-gray-600
              "
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
