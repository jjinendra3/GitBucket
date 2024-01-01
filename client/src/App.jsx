import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/SignUp";
import ProfilePage from "./pages/Home";
import Navbar from "./components/Navbars";
import RepoPage from "./pages/RepoPage";
import CommitList from './pages/CommitList'
import CommitPage from './pages/CommitPage'
import Landing from './pages/Landing'
function App() {
  return (
    <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/home" element={<ProfilePage/>}/>
          <Route path="/repos" element={<ProfilePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
    </div>
  );
}

export default App;
