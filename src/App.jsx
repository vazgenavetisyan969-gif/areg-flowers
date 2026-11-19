import "./App.css";
import { Routes, Route } from "react-router-dom";
import FlowerShop from "./heder/index.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<FlowerShop />} />
    </Routes>
  );
}

export default App;