import React from "react";

const UserContext = React.createContext();

const UserContextProvider = ({ children, value }) => (
  <UserContext.Provider value={value}>{children}</UserContext.Provider>
);

export { UserContext, UserContextProvider };
