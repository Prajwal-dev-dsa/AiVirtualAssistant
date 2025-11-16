import { createContext } from "react";
import { useEffect, useState } from "react";
import axios from "axios";

export const userDataContext = createContext();

function UserContext({ children }) {
  const serverUrl = "http://localhost:8000";
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
  };
  return (
    <userDataContext.Provider value={value}>
      {children}
    </userDataContext.Provider>
  );
}

export default UserContext;
