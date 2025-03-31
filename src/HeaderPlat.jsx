import React from "react";

const Header = () => {
    const handleReload = () => {
        window.location.reload();
      };

  return (
    <nav className="bg-blue-600 p-4 shadow-lg">
      <ul className="flex justify-center space-x-6">
        <li>
          <a href="#" className="text-white text-lg font-semibold hover:underline">Accueil</a>
        </li>
        <li>
          <a href="#" className="text-white text-lg font-semibold hover:underline">Ingrédients</a>
        </li>
        <li>
          <a href="#" className="text-white text-lg font-semibold hover:underline">Plats</a>
        </li>
        <li>
          <a href="#" onClick={handleReload} className="text-white text-lg font-semibold hover:underline">Menus</a>
        </li>
        <li>
          <a href="#" className="text-white text-lg font-semibold hover:underline">Planning</a>
        </li>
      </ul>
    </nav>
  );
};

export default Header;