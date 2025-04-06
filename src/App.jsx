import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Menu from "./pageMenu.jsx";
import Header from "./HeaderPlat";
import PageAccueil from "./PageAccueil.jsx"
import Planning from "./planning_page.jsx"

const App = () => {
  return (
    <Router>
        <Header />
        <Routes>
          <Route path="/" element={<PageAccueil />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/planning" element={<Planning />} />
        </Routes>
    </Router>
  );
};

export default App;
