import { useAuth } from "./contexts/AuthContext";
import { Home, Login, Signup, NotFound, Newsfeed } from "./pages";
import { Routes, Route } from "react-router-dom";

const App = () => {
  const { isAuthentified } = useAuth();

  return (
    <Routes>
      <Route path="/" element={isAuthentified ? <Newsfeed /> : <Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
