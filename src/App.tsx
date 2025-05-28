import "./App.css";
import Header from "./components/Header";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NewsDetails from "./pages/NewsDetails";
import Home from "./pages/Home";
import Footer from "./components/Footer";

function App() {

  return (
    <Router basename={import.meta.env.BASE_URL}>
      <Header />
      <h1 className='bg-red-500 text-center text-white'></h1>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/news/:slugOrId" element={<NewsDetails />} />
      </Routes>
     
      <Footer />
    </Router>
  )
};

export default App;
