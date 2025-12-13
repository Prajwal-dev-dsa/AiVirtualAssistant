import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Settings, LogOut, Mic, MicOff } from "lucide-react";
import { userDataContext } from "../../context/UserContext"; // Adjust path if needed
import axios from "axios";
import moment from "moment";

const Home = () => {
  const navigate = useNavigate();
  const { userData, setUserData, serverUrl, getGeminiResponse } =
    useContext(userDataContext);

  const assistantName = userData?.assistantName || "Assistant";
  const avatarUrl = userData?.assistantImage || "/avatars/1.png";

  const [isListening, setIsListening] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [showChatMode, setShowChatMode] = useState(false);

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

    setAiResponse(response);
    speak(response);

    if (type === "google_search") {
      const query = encodeURIComponent(userInput);
      window.open(`https://www.google.com/search?q=${query}`, "_blank");
    } else if (type === "youtube_search" || type === "youtube_play") {
      const query = encodeURIComponent(userInput);
      window.open(
        `https://www.youtube.com/results?search_query=${query}`,
        "_blank"
      );
    } else if (type === "calculator_open") {
      window.open("https://www.google.com/search?q=calculator", "_blank");
    } else if (type === "get_time") {
      const time = moment().format("hh:mm:ss A");
      const text = `Current time is ${time}`;
      setAiResponse(text);
      speak(text);
    } else if (type === "get_date") {
      const date = moment().format("DD-MM-YYYY");
      const text = `Today's date is ${date}`;
      setAiResponse(text);
      speak(text);
    } else if (type === "get_day") {
      const day = moment().format("dddd");
      const text = `Today's day is ${day}`;
      setAiResponse(text);
      speak(text);
    } else if (type === "get_month") {
      const month = moment().format("MMMM");
      const text = `The month is ${month}`;
      setAiResponse(text);
      speak(text);
    } else if (type === "get_year") {
      const year = moment().format("YYYY");
      const text = `The year is ${year}`;
      setAiResponse(text);
      speak(text);
    } else if (type === "instagram_open") {
      window.open("https://www.instagram.com", "_blank");
    } else if (type === "whatsapp_open") {
    } else if (type === "youtube_open") {
      window.open("https://www.youtube.com", "_blank");
    } else if (type === "whatsapp_open") {
      window.open("https://www.whatsapp.com", "_blank");
    } else if (type === "github_open") {
      window.open("https://www.github.com", "_blank");
    } else if (type === "gmail_open") {
      window.open("https://www.gmail.com", "_blank");
    } else if (type === "linkedin_open") {
      window.open("https://www.linkedin.com", "_blank");
    } else if (type === "twitter_open") {
      window.open("https://www.x.com", "_blank");
    } else if (type === "facebook_open") {
      window.open("https://www.facebook.com", "_blank");
    } else if (type === "jiostar_open") {
      window.open("https://www.hotstar.com", "_blank");
    } else if (type === "reddit_open") {
      window.open("https://www.reddit.com", "_blank");
    } else if (type === "mongodb_open") {
      window.open("https://www.mongodb.com", "_blank");
    } else if (type === "leetcode_open") {
      window.open("https://www.leetcode.com", "_blank");
    } else if (type === "amazon_open") {
      window.open("https://www.amazon.com", "_blank");
    } else if (type === "flipkart_open") {
      window.open("https://www.flipkart.com", "_blank");
    } else if (type === "netflix_open") {
      window.open("https://www.netflix.com", "_blank");
    } else if (type === "spotify_open") {
      window.open("https://www.spotify.com", "_blank");
    } else if (type === "amazon_music_open") {
      window.open("https://www.amazonmusic.com", "_blank");
    } else if (type === "amazon_prime_video_open") {
      window.open("https://www.amazonprimevideo.com", "_blank");
    } else if (type === "geeksforgeeks_open") {
      window.open("https://www.geeksforgeeks.org", "_blank");
    } else if (type === "stackoverflow_open") {
      window.open("https://www.stackoverflow.com", "_blank");
    } else if (type === "codechef_open") {
      window.open("https://www.codechef.com", "_blank");
    } else if (type === "telegram_open") {
      window.open("https://www.telegram.org", "_blank");
    } else if (type === "teams_open") {
      window.open("https://www.teams.com", "_blank");
    } else if (type === "zoom_open") {
      window.open("https://www.zoom.com", "_blank");
    } else if (type === "slack_open") {
      window.open("https://www.slack.com", "_blank");
    } else if (type === "discord_open") {
      window.open("https://www.discord.com", "_blank");
    } else if (type === "gemini_open") {
      window.open("https://www.gemini.com", "_blank");
    } else if (type === "chatgpt_open") {
      window.open("https://www.chatgpt.com", "_blank");
    } else if (type === "perplexity_open") {
      window.open("https://www.perplexity.com", "_blank");
    } else if (type === "anthropic_open") {
      window.open("https://www.anthropic.com", "_blank");
    } else if (type === "openai_open") {
      window.open("https://www.openai.com", "_blank");
    } else if (type === "google_open") {
      window.open("https://www.google.com", "_blank");
    } else if (type === "codeforces_open") {
      window.open("https://www.codeforces.com", "_blank");
    } else if (type === "hackerrank_open") {
      window.open("https://www.hackerrank.com", "_blank");
    } else if (type === "hackerearth_open") {
      window.open("https://www.hackerearth.com", "_blank");
    } else if (type === "cricbuzz_open") {
      window.open("https://www.cricbuzz.com", "_blank");
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

      setPrompt(transcript);
      setShowChatMode(true);
      // setAiResponse("...");

      if (transcript.toLowerCase().includes(assistantName.toLowerCase())) {
        console.log("Wake word detected, sending to backend...");

        const data = await getGeminiResponse(transcript);
        console.log("Backend response:", data);

        if (data && data.response) {
          handleCommand(data);
        }
      } else {
        console.log("Wake word not detected in final transcript.");
      }
    };

    recognition.onend = () => {
      console.log("Speech recognition ended.");
      if (isListening) {
        setTimeout(() => recognition.start(), 500);
      }
    };

    recognition.onerror = (event) => {
      if (event.error !== "no-speech") {
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

  const capitalize = (s) => s && s[0].toUpperCase() + s.slice(1);

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* --- Glassmorphism Card --- */}
        <div className="rounded-xl border border-gray-700/50 bg-gray-900/60 p-8 text-center shadow-lg backdrop-blur-sm transition-all duration-300">
          {/* --- Avatar Section --- */}
          <div
            className={`mb-6 inline-block rounded-full p-1.5 transition-all duration-500 ease-in-out ${
              isListening
                ? "bg-linear-to-r from-cyan-400 to-blue-600 scale-105 shadow-[0_0_30px_rgba(34,211,238,0.4)]"
                : "bg-gray-800"
            }`}
          >
            <img
              src={avatarUrl}
              alt="Assistant Avatar"
              className="h-32 w-32 rounded-full border-4 border-gray-950 object-cover sm:h-40 sm:w-40"
            />
          </div>

          {/* --- Content Area: Swaps between Greeting and Chat --- */}
          <div className="mb-8 min-h-[120px] flex flex-col justify-center">
            {!showChatMode ? (
              // 1. Greeting View
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <p className="text-xl text-gray-400">Hello, I'm</p>
                <h1 className="text-5xl font-bold tracking-tight text-white">
                  {assistantName}
                </h1>
              </div>
            ) : (
              // 2. Chat Interface View
              <div className="flex flex-col gap-4 animate-in fade-in zoom-in-95 duration-300">
                {/* User Bubble (Right) */}
                <div className="self-end max-w-[85%]">
                  <p className="mb-1 text-xs font-bold text-gray-500 text-right">
                    You
                  </p>
                  <div className="rounded-2xl rounded-tr-none bg-gray-800/80 px-4 py-2 text-right text-sm text-gray-200 border border-gray-700">
                    {capitalize(prompt)}
                  </div>
                </div>

                {/* Assistant Bubble (Left) */}
                <div className="self-start max-w-[85%]">
                  <p className="mb-1 text-xs font-bold text-cyan-400 text-left">
                    {assistantName}
                  </p>
                  <div className="rounded-2xl rounded-tl-none bg-linear-to-br from-cyan-950/40 to-blue-950/40 px-4 py-3 text-left text-white border border-cyan-500/20 shadow-inner">
                    {aiResponse || (
                      <span className="animate-pulse">Listening...</span>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* --- Toggle Listening Button --- */}
          <button
            type="button"
            onClick={() => setIsListening((prev) => !prev)}
            className={`
              mb-6 flex w-full items-center justify-center gap-2 rounded-lg px-5 py-3 
              text-center text-base font-semibold text-white shadow-lg 
              transition-all duration-200 ease-in-out hover:scale-[1.02] 
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900
              ${
                isListening
                  ? "bg-red-500/90 hover:bg-red-600 ring-red-500" // Active/Stop Style
                  : "bg-linear-to-r from-cyan-400 to-blue-600 ring-cyan-500" // Inactive/Start Style
              }
            `}
          >
            {isListening ? (
              <>
                <MicOff size={20} />
                Stop Listening
              </>
            ) : (
              <>
                <Mic size={20} />
                Start Conversation
              </>
            )}
          </button>

          {/* --- Footer Navigation --- */}
          <div className="flex flex-col gap-4 sm:flex-row">
            {/* Customize Link */}
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
