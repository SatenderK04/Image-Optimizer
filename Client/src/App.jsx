import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import ImageCompress from "./components/ImageCompress";
import Home from "./components/Home";
import AddWatermark from "./components/AddWatermark";
import RemoveBg from "./components/RemoveBg";
import About from "./components/About";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/compress" element={<ImageCompress />} />
          <Route path="/watermark" element={<AddWatermark />} />
          <Route path="/removebg" element={<RemoveBg />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
