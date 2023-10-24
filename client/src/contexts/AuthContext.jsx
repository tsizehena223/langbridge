import { createContext, useContext, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../config/api";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const decoded = useMemo(() => JSON.parse(localStorage.getItem("userdata")));
  const [userData, setUserData] = useState(decoded);
  const [isAuthentified, setIsAuthentified] = useState(
    userData && userData.token
  );
  const navigate = useNavigate();

  const login = async (formData) => {
    const res = await api.post("/users/login", formData);
    const data = res.data;
    const json = JSON.stringify(data);
    localStorage.setItem("userdata", json);
    setUserData(data);
    setIsAuthentified(true);
    navigate("/");
  };

  const logout = () => {
    localStorage.removeItem("userdata");
    setUserData(null);
    setIsAuthentified(false);
    navigate("/login");
  };

  const updateUserData = (data) => {
    data.token = userData.token;
    const json = JSON.stringify(data);
    localStorage.setItem("userdata", json);
    setUserData(data);
  };

  const value = useMemo(
    () => ({ userData, updateUserData, isAuthentified, login, logout }),
    [userData]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
