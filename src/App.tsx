import "./App.css";
import Header from "./components/Header";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NewsDetails from "./pages/NewsDetails";
import Home from "./pages/Home";
import PrivacyPolicy from "./pages/Privacy-Policy";
import Footer from "./components/Footer";

function App() {

  return (
    <Router basename={import.meta.env.BASE_URL}>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/news/:slugOrId" element={<NewsDetails />} />
        <Route path="/Privacy-Policy" element={<PrivacyPolicy />} />
      </Routes>
     
      <Footer />
    </Router>
  )
};

export default App;
