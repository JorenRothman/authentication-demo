import "./index.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import App from "./App";
import Header from "./components/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Protected from "./pages/Protected";
import React from "react";
import ReactDOM from "react-dom";
import Register from "./pages/Register";

ReactDOM.render(
  <React.StrictMode>
    <div className="antialiased">
      <BrowserRouter>
        <Header />

        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/protected" element={<Protected />}></Route>
        </Routes>
        <App />
      </BrowserRouter>
    </div>
  </React.StrictMode>,
  document.getElementById("root")
);
