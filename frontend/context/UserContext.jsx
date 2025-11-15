import { createContext } from "react";

export const userDataContext = createContext();

function UserContext({ children }) {
  const value = {
    serverUrl: "http://localhost:8000",
  };
  return (
    <userDataContext.Provider value={value}>
      {children}
    </userDataContext.Provider>
  );
}

export default UserContext;
