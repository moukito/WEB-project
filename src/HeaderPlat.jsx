import React from "react";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation(); // Récupère l'URL actuelle

  // Fonction utilitaire pour déterminer si une route est active
  const isActive = (path) => (location.pathname === path ? "font-bold" : "");

  return (
    <nav className="p-4 bg-black text-white flex space-x-4">
      <Link to="/" className={`text-lg ${isActive("/")}`}>Accueil</Link>
      <Link to="/ingredients" className={`text-lg ${isActive("/ingredients")}`}>Ingrédients</Link>
      <Link to="/plats" className={`text-lg ${isActive("/plats")}`}>Plats</Link>
      <Link to="/menu" className={`text-lg ${isActive("/menu")}`}>Menu</Link>
      <Link to="/planning" className={`text-lg ${isActive("/planning")}`}>Planning</Link>
    </nav>
  );
};

export default Header;