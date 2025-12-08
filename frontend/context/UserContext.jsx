import { createContext } from "react";
import { useEffect, useState } from "react";
import axios from "axios";

export const userDataContext = createContext();

function UserContext({ children }) {
  const serverUrl = "https://ai-virtual-assistant-mern-backend.onrender.com";
  const [userData, setUserData] = useState(null);
  const [backendImage, setBackendImage] = useState(null);

  const getCurrentUser = async () => {
    try {
      const response = await axios.get(`${serverUrl}/api/user/getCurrentUser`, {
        withCredentials: true,
      });
      setUserData(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(`Error in getCurrentUser: ${error}`);
    }
  };

  const getGeminiResponse = async (command) => {
    try {
      if (!userData) {
        console.log("User data not loaded yet.");
        return null;
      }

      const assistantName = userData.assistantName;
      const userName = userData.name;
      const response = await axios.post(
        `${serverUrl}/api/user/askAssistant`,
        {
          command,
          assistantName,
          userName,
        },
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      console.log(`Error in getGeminiResponse: ${error.message}`);
      return null;
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  const value = {
    serverUrl,
    getCurrentUser,
    userData,
    setUserData,
    backendImage,
    setBackendImage,
    getGeminiResponse,
  };
  return (
    <userDataContext.Provider value={value}>
      {children}
    </userDataContext.Provider>
  );
}

export default UserContext;
