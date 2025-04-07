import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ChoisirMenu from "./choisir_menu";
import CreerMenu from "./creer_menu"; // Import du composant CreerMenu

const Menu = () => {
  const [mode, setMode] = useState(null);

  const handleModeChange = (newMode) => {
    setMode(newMode);
  };

  return (
    <div className="w-full h-screen bg-[#0D1B2A]">
      {/* Choix initial */}
      {!mode && (
        <div className="flex justify-center items-center h-full w-full">
          <button 
            className="border p-8 w-1/2 h-full text-3xl font-bold bg-[#1B263B] text-[#E0E1DD] shadow-lg hover:bg-[#142C44] transition-all"
            onClick={() => handleModeChange("create")}
          >
            Créer un menu
          </button>
          <button 
            className="border p-8 w-1/2 h-full text-3xl font-bold bg-[#1B263B] text-[#E0E1DD] shadow-lg hover:bg-[#142C44] transition-all"
            onClick={() => handleModeChange("choose")}
          >
            Choisir un menu
          </button>
        </div>
      )}

      {/* SECTION : Créer un menu */}
      {mode === "create" && <CreerMenu />}

      {/* SECTION : Choisir un menu */}
      {mode === "choose" && <ChoisirMenu />}
    </div>
  );
};

export default Menu;
