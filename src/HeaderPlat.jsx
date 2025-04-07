import React from "react";
import { Link, useLocation } from "react-router-dom";
import { AppBar, Toolbar, Button, Box } from "@mui/material";

const Header = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "#0D1B2A", // Bleu foncé
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-around",
          padding: "10px 0",
        }}
      >
        {["/", "/ingredients", "/plats", "/menu", "/planning"].map((path, index) => {
          const labels = ["Accueil", "Ingrédients", "Plats", "Menu", "Planning"];
          return (
            <Button
              key={path}
              color="inherit"
              component={Link}
              to={path}
              sx={{
                color: isActive(path) ? "#FFD700" : "#E0E1DD", // Or jaune pour actif, gris clair pour inactif
                fontSize: "1.2rem",
                fontWeight: "bold",
                textTransform: "uppercase",
                padding: "10px 20px",
                borderRadius: "8px",
                transition: "all 0.3s ease",
                "&:hover": {
                  backgroundColor: "#1B263B", // Bleu légèrement plus clair au survol
                  color: "#FFD700",
                },
              }}
            >
              {labels[index]}
            </Button>
          );
        })}
      </Toolbar>
    </AppBar>
  );
};

export default Header;