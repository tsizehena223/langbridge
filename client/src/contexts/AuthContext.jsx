import { createContext, useContext, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../config/api";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState(localStorage.getItem("userdata"));
  const navigate = useNavigate();

  const login = async (formData) => {
    const res = await api.post("/users/login", formData);
    const data = res.data;
    localStorage.setItem("userdata", data);
    setUserData(data);
    navigate("/");
  };

  const logout = () => {
    localStorage.removeItem("userdata");
    setUserData(null);
    navigate("/");
  };

  const value = useMemo(() => ({ userData, login, logout }), [userData]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
