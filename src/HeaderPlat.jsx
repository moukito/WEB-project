import React from "react";
import { Link, useLocation } from "react-router-dom";
import { AppBar, Toolbar, Button, Box } from "@mui/material";

const Header = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  const menuItems = [
    { path: "/", label: "Accueil" },
    { path: "/ingredients", label: "Ingrédients" },
    { path: "/plats", label: "Plats" },
    { path: "/menu", label: "Menu" },
    { path: "/planning", label: "Planning" },
  ];

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "#0D1B2A",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
        transition: "background-color 0.3s ease",
        "&:hover": {
          backgroundColor: "#142C44", // Légèrement plus clair au survol
        },
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "10px 0",
          gap: "20px",
        }}
      >
        {menuItems.map(({ path, label }) => (
          <Button
            key={path}
            color="inherit"
            component={Link}
            to={path}
            sx={{
              color: isActive(path) ? "#FFD700" : "#E0E1DD",
              fontSize: "1.2rem",
              fontWeight: "bold",
              textTransform: "uppercase",
              padding: "10px 20px",
              borderRadius: "8px",
              position: "relative",
              overflow: "hidden",
              transition: "all 0.3s ease",
              "&:hover": {
                backgroundColor: "#1B263B",
                color: "#FFD700",
              },
              "&::before": {
                content: '""',
                position: "absolute",
                width: "0%",
                height: "100%",
                top: 0,
                left: 0,
                backgroundColor: "#FFD700",
                zIndex: -1,
                transition: "width 0.3s ease",
              },
              "&:hover::before": {
                width: "100%",
              },
            }}
          >
            {label}
          </Button>
        ))}
      </Toolbar>
    </AppBar>
  );
};

export default Header;