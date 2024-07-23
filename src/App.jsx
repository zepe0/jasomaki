import Home from "../pages/Home";
import Inscripciones from "../pages/Inscripciones";
import "./App.css"

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ins" element={<Inscripciones />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
