import "./App.css"
import { Routes, Route } from "react-router-dom";
import Tonacarner from "./heder/index";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Tonacarner />} />
    </Routes>
  );
}

export default App;