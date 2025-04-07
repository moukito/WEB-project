import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Menu from "./pages/MenuPage.jsx";
import Header from "./components/Header.jsx";
import HomePage from "./pages/HomePage.jsx"
import Planning from "./pages/GeneratePlanningPage.jsx"
import Footer from "./components/Footer.jsx";
import Ingredients from "./ingredients_page.jsx"
import Plats from "./plats_page.jsx"

const App = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
          <div className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/planning" element={<Planning />} />
	          <Route path="/ingredients" element={<Ingredients />} />
	          <Route path="/plats" element={<Plats />} />
            </Routes>
          </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
