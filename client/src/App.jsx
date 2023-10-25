import { useEffect } from "react";
import { useAuth } from "./contexts/AuthContext";
import {
  Home,
  Login,
  Signup,
  NotFound,
  Newsfeed,
  Profile,
  Search,
  Settings,
} from "./pages";
import { Routes, Route } from "react-router-dom";

const App = () => {
  const { isAuthentified } = useAuth();

  useEffect(() => {
    const theme = localStorage.getItem("theme");

    if (theme == "dark") {
      document.documentElement.classList.add("dark");
    }
  });

  return (
    <div className="text-gray-2 dark:text-light">
      <Routes>
        <Route path="/" element={isAuthentified ? <Newsfeed /> : <Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile/:id" element={<Profile />} />
        {/* <Route path="/message" element={<Message />} /> */}
        <Route path="/search" element={<Search />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
