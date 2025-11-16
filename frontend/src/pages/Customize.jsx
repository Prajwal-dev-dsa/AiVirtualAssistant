import { useState, useRef } from "react";
import { User, Upload, Save } from "lucide-react";
import AvatarCard from "../../components/AvatarCard";
import axios from "axios";
import { useContext } from "react";
import { userDataContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";

const DEFAULT_AVATARS = [
  "/avatars/1.png",
  "/avatars/2.png",
  "/avatars/3.png",
  "/avatars/4.png",
  "/avatars/5.png",
];

const Customize = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { serverUrl, backendImage, setBackendImage, setUserData } =
    useContext(userDataContext);
  const [assistantName, setAssistantName] = useState("");
  const [userAvatars, setUserAvatars] = useState([]);
  const [selectedAvatar, setSelectedAvatar] = useState(DEFAULT_AVATARS[0]);

  const fileInputRef = useRef(null);

  const allAvatars = [...userAvatars, ...DEFAULT_AVATARS];

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setBackendImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const dataUrl = reader.result;
        setUserAvatars([dataUrl, ...userAvatars]);
        setSelectedAvatar(dataUrl);
      };
      reader.readAsDataURL(file);
    }
    event.target.value = null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("assistantName", assistantName);
      if (backendImage) {
        formData.append("assistantImage", backendImage);
      } else {
        formData.append("imageUrl", selectedAvatar);
      }
      const res = await axios.put(
        `${serverUrl}/api/user/updateAvatar`,
        formData,
        { withCredentials: true }
      );
      console.log(res.data);
      setUserData(res.data);
      navigate("/");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* --- Glassmorphism Card --- */}
        <form
          onSubmit={handleSubmit}
          className="rounded-xl border border-gray-700/50 bg-gray-900/60 p-8 shadow-lg backdrop-blur-sm"
        >
          <h1 className="mb-2 text-center text-3xl font-bold tracking-tight text-white">
            Customize Your Assistant
          </h1>
          <p className="mb-8 text-center text-sm text-gray-400">
            Give your AI a unique name and face.
          </p>

          {/* --- Section 1: Avatar Selection --- */}
          <div className="mb-8">
            <h2 className="mb-4 text-xl font-semibold text-gray-200">
              Choose an Avatar
            </h2>

            {/* --- Avatar Grid --- */}
            <div className="grid grid-cols-4 gap-4 sm:grid-cols-6 sm:gap-6">
              {/* --- Upload Card --- */}
              <button
                type="button"
                onClick={handleUploadClick}
                className="
                cursor-pointer
                  group flex aspect-square w-full flex-col items-center 
                  justify-center rounded-2xl border-2 border-dashed border-gray-600 
                  bg-gray-800/50 text-gray-400 transition-all duration-300
                  hover:border-cyan-500 hover:bg-gray-800 hover:text-cyan-400
                  focus:outline-none focus:ring-2 focus:ring-cyan-500
                  focus:ring-offset-2 focus:ring-offset-gray-950
                "
              >
                <Upload
                  size={32}
                  className="mb-2 transition-transform duration-300 group-hover:scale-110"
                />
                <span className="text-center text-xs font-medium">Upload</span>
              </button>

              {/* --- Hidden File Input --- */}
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/png, image/jpeg, image/gif"
                className="hidden"
              />

              {/* --- Mapped Avatars --- */}
              {allAvatars.map((avatarUrl) => (
                <AvatarCard
                  key={avatarUrl.substring(0, 50)}
                  imageUrl={avatarUrl}
                  isSelected={selectedAvatar === avatarUrl}
                  onClick={() => setSelectedAvatar(avatarUrl)}
                />
              ))}
            </div>
          </div>

          {/* --- Section 2: Assistant Name --- */}
          <div className="mb-8">
            <label
              htmlFor="assistantName"
              className="mb-2 block text-xl font-semibold text-gray-200"
            >
              Give it a Name
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
                <User size={18} className="text-gray-400" />
              </div>
              <input
                type="text"
                id="assistantName"
                value={assistantName}
                onChange={(e) => setAssistantName(e.target.value)}
                placeholder="e.g., 'Nova', 'Apex', 'Clara'"
                required
                className="block w-full rounded-lg border border-gray-700 bg-gray-800 p-3.5 pl-10 text-white placeholder-gray-500 shadow-sm focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
              />
            </div>
          </div>

          {/* --- Section 3: Save Button --- */}
          <button
            type="submit"
            disabled={!assistantName || loading}
            className="
            cursor-pointer
              flex w-full items-center justify-center rounded-lg bg-linear-to-r 
              from-cyan-400 to-blue-600 px-5 py-3 text-center 
              text-base font-semibold text-white shadow-lg transition-transform 
              duration-200 ease-in-out hover:scale-[1.02] 
              focus:outline-none focus:ring-2 focus:ring-cyan-500 
              focus:ring-offset-2 focus:ring-offset-gray-900
              disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100
            "
          >
            <Save size={18} className="mr-2" />
            {loading ? "Saving..." : "Save"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Customize;
