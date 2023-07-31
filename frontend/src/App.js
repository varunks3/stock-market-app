import "./App.css";
import Login from "./components/Login";
import Register from "./components/Register";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoutes from "./ProtectedRoutes";
import StockList from "./components/StockList";
import StockDetail from "./components/StockDetail";
import React from "react";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<ProtectedRoutes/>}>
            <Route path="/home" element={<StockList />} />
            <Route path="/stockdetail" element={<StockDetail />} />
          </Route> 
        </Routes>
      </Router>
    </>
  );
}

export default App;
