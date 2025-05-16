import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import UserPage from "./pages/UserPage";
import HomeRedirect from "./pages/HomeRedirect";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeRedirect />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/user" element={<UserPage />} />
      </Routes>
    </Router>
  );
}

export default App;
