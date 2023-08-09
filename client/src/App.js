import { useState } from "react";
// import './App.css'
import NavBar from "./components/NavBar/NavBar";
import Single from "./pages/single/Single";
import Home from "./pages/Home/Home";
import Write from "./components/write/Write";
import Settings from "./pages/settings/Settings";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <NavBar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/write" element={<Write />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/post/:postId" element={<Single />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;