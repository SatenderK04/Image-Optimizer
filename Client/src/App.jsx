import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import ImageUpload from "./components/ImageUpload";
import Home from "./components/Home";
import AddWatermark from "./components/AddWatermark";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/compress" element={<ImageUpload />} />
          <Route path="/watermark" element={<AddWatermark />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
