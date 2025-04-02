import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <nav className="p-4 bg-black text-white flex space-x-4">
      <Link to="/" className="text-lg font-bold">Accueil</Link>
      <Link to="/ingredients" className="text-lg">Ingrédients</Link>
      <Link to="/plats" className="text-lg">Plats</Link>
      <Link to="/menu" className="text-lg">Menu</Link>
      <Link to="/planning" className="text-lg">Planning</Link>
    </nav>
  );
};

export default Header;