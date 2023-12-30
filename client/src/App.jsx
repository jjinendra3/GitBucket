import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/SignUp";
import ProfilePage from "./pages/Home";
import Navbar from "./components/Navbars";
import RepoPage from "./pages/RepoPage";
function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<ProfilePage />} />
          <Route path="/repos" element={<ProfilePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
