import { Link, useNavigate } from "react-router-dom";
import { Settings, LogOut } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { userDataContext } from "../../context/UserContext";
import axios from "axios";

const Home = () => {
  const navigate = useNavigate();
  const { userData, setUserData, serverUrl, getGeminiResponse } =
    useContext(userDataContext);
  const assistantName = userData?.assistantName;
  const avatarUrl = userData?.assistantImage;

  const [isListening, setIsListening] = useState(false);

  const speak = (text) => {
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);

    utterance.volume = 1;
    utterance.rate = 1;
    utterance.pitch = 1;
    utterance.lang = "hi-IN";

    window.speechSynthesis.speak(utterance);
  };

  const handleCommand = async (data) => {
    const { type, userInput, response } = data;
    speak(response);
    if (type === "google_search") {
      const query = encodeURIComponent(userInput);
      window.open(`https://www.google.com/search?q=${query}`, "_blank");
    } else if (type === "youtube_search") {
      const query = encodeURIComponent(userInput);
      window.open(
        `https://www.youtube.com/results?search_query=${query}`,
        "_blank"
      );
    } else if (type === "calculator_open") {
      window.open("https://www.google.com/search?q=calculator", "_blank");
    } else if (type === "instagram_open") {
      window.open("https://www.instagram.com", "_blank");
    } else if (type === "whatsapp_open") {
      window.open("https://www.whatsapp.com", "_blank");
    } else if (type === "github_open") {
      window.open("https://www.github.com", "_blank");
    } else if (type === "gmail_open") {
      window.open("https://www.gmail.com", "_blank");
    } else if (type === "linkedin_open") {
      window.open("https://www.linkedin.com", "_blank");
    } else if (type === "twitter_open") {
      window.open("https://www.twitter.com", "_blank");
    } else if (type === "facebook_open") {
      window.open("https://www.facebook.com", "_blank");
    } else if (type === "weather_show") {
      window.open(`https://www.google.com/search?q=weather`, "_blank");
    } else if (type === "open_website") {
      window.open(userInput, "_blank");
    } else if (type === "open_app") {
      window.open(userInput, "_blank");
    }
  };

  useEffect(() => {
    if (!userData || !assistantName || !isListening) return;

    const speechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!speechRecognition) {
      console.error("Speech Recognition is not supported by this browser.");
      return;
    }

    const recognition = new speechRecognition();

    recognition.continuous = false;
    recognition.lang = "en-US";

    recognition.onresult = async (e) => {
      const transcript = e.results[0][0].transcript.trim();
      console.log(`Final transcript received: ${transcript}`);

      if (transcript.toLowerCase().includes(assistantName.toLowerCase())) {
        console.log("Wake word detected, sending to backend...");

        const data = await getGeminiResponse(transcript);
        console.log("Backend response:", data);

        if (data && data.response) {
          console.log("Assistant will say:", data.response);
          handleCommand(data);
        }
      } else {
        console.log("Wake word not detected in final transcript.");
      }
    };

    recognition.onend = () => {
      console.log("Speech recognition ended, restarting...");
      recognition.start();
    };

    recognition.onerror = (event) => {
      if (event.error === "no-speech") {
      } else {
        console.error(`Speech recognition error: ${event.error}`);
      }
    };
    try {
      recognition.start();
      console.log("Speech recognition started.");
    } catch (e) {
      console.error("Error starting speech recognition: ", e);
    }

    return () => {
      console.log("Stopping recognition...");
      recognition.onend = null;
      recognition.stop();
    };
  }, [userData, getGeminiResponse, assistantName, isListening]);

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
          <button
            type="button"
            onClick={() => setIsListening(true)}
            className="
              mb-6 w-full rounded-lg bg-linear-to-r from-cyan-400 to-blue-600 
              px-5 py-3 text-center text-base font-semibold text-white shadow-lg 
              transition-transform duration-200 ease-in-out hover:scale-[1.02] 
              focus:outline-none focus:ring-2 focus:ring-cyan-500 
              focus:ring-offset-2 focus:ring-offset-gray-900
            "
          >
            {isListening ? "Listening..." : "Start Conversation"}
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
