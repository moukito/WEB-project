import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Menu from "./pageMenu.jsx";
import Header from "./HeaderPlat";
import PageAccueil from "./PageAccueil.jsx"
import Planning from "./pages/generatePlanning.jsx"
import Footer from "./footer.jsx";

const App = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
          <div className="flex-grow">
            <Routes>
              <Route path="/" element={<PageAccueil />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/planning" element={<Planning />} />
            </Routes>
          </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
