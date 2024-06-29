import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home/HomePage";
import Login from "./pages/Auth/Login";
import RegisterPage from "./pages/Auth/RegisterPage";
function App() {

  return (
    <Router>
      <Routes>
        <Route exact path="/*" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route  path="/login" element={<Login />} />
        {/* <Route  path="*" element={<></>} /> */}

      </Routes>
    </Router>
  );
}

export default App;
