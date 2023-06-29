import { Home, Login, Signup } from "./pages";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/singup" element={<Signup />} />
    </Routes>
  </BrowserRouter>
);

export default App;
