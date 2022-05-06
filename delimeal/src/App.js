import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Landing, Signin, Signup, Order, User } from "./pages";
import Navbar from "./components/Navbar";
import "./App.css";

function App() {
  return (
    <div className="relative w-screen h-auto">
      <Router>
        <div>
          <Navbar />
        </div>
        <div className="p-4">
          <Routes>
            <Route exact path="/" element={<Landing />} />
            <Route exact path="/sign-in" element={<Signin />} />
            <Route exact path="/sign-up" element={<Signup />} />
            <Route exact path="/order" element={<Order />} />
            <Route exact path="/user" element={<User />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
