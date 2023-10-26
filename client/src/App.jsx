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
  Message,
} from "./pages";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import About from "./pages/About";

const App = () => {
  const { isAuthentified } = useAuth();

  useEffect(() => {
    const theme = localStorage.getItem("theme");

    if (theme == "dark") {
      document.documentElement.classList.add("dark");
    }
  });

  return (
    <div className="flex text-gray-2 dark:text-light overflow-clip">
      <ToastContainer
        hideProgressBar={true}
        autoClose={2000}
        className="rounded-md"
      />
      <Routes>
        <Route path="/" element={isAuthentified ? <Newsfeed /> : <Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/message" element={<Message />} />
        <Route path="/about" element={<About />} />
        <Route path="/search" element={<Search />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
