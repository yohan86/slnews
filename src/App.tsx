import React from "react";
import "./App.css";
import Header from "./components/Header";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NewsDetails from "./pages/NewsDetails";
import Home from "./pages/Home";

function App() {

  return (
    <Router>
      <Header />
      <h1 className='bg-red-500 text-center text-white'>We Report, You Decide</h1>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/news/:slugOrId" element={<NewsDetails />} />
      </Routes>
     
      
    </Router>
  )
};

export default App;
