import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import ImageCompress from "./components/ImageCompress";
import Home from "./components/Home";
import AddWatermark from "./components/AddWatermark";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/compress" element={<ImageCompress />} />
          <Route path="/watermark" element={<AddWatermark />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
