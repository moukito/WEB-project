# Projet WEB

## Vue d'ensemble

Ce projet, **web-project**, est une application React construite avec Vite. Il utilise des outils et bibliothèques modernes tels que TailwindCSS, DaisyUI et Framer Motion pour créer une expérience web dynamique et réactive. L'application est structurée avec React Router pour la navigation et inclut plusieurs pages comme un menu, une planification, des ingrédients et des plats.

## Fonctionnalités

- **React + Vite** : Environnement de développement rapide avec Hot Module Replacement (HMR).
- **TailwindCSS & DaisyUI** : Pour le style et les composants UI.
- **Framer Motion** : Pour les animations et transitions.
- **React Router** : Pour le routage côté client.
- **ESLint** : Pour maintenir la qualité et la cohérence du code.

## Installation

Pour commencer, clonez le dépôt et installez les dépendances :

```bash
git clone <repository-url>
cd web-project
npm install
```

## Scripts

Les scripts suivants sont disponibles dans le projet :

- `npm run dev` : Démarre le serveur de développement.
- `npm run build` : Compile le projet pour la production.
- `npm run lint` : Exécute ESLint pour vérifier les problèmes de code.
- `npm run preview` : Prévisualise la version de production.

## Structure du projet

```plaintext
src/
├── components/
├── pages/
│   ├── PageAccueil.jsx
│   ├── pageMenu.jsx
│   ├── planning_page.jsx
│   ├── ingredients_page.jsx
│   └── plats_page.jsx
├── HeaderPlat.jsx
├── App.jsx
└── main.jsx
```

## Dépendances

### Dépendances principales

- `react` : ^19.0.0
- `react-dom` : ^19.0.0
- `react-router-dom` : ^7.4.0
- `@mui/icons-material` : ^7.0.1
- `@tailwindcss/vite` : ^4.0.17
- `framer-motion` : ^12.6.3
- `lucide-react` : ^0.484.0

### Dépendances de développement

- `vite` : ^6.2.0
- `eslint` : ^9.21.0
- `tailwindcss` : ^4.0.17
- `daisyui` : ^5.0.9
- `@vitejs/plugin-react-swc` : ^3.8.1

## Utilisation

Lancez le serveur de développement :

```bash
npm run dev
```

Accédez à `http://localhost:3000` dans votre navigateur pour voir l'application.

## Pages

- **Accueil** : La page d'accueil de l'application.
- **Menu** : Affiche les éléments du menu.
- **Planification** : Une page de planification pour organiser les horaires.
- **Ingrédients** : Une page pour gérer les ingrédients.
- **Plats** : Une page pour visualiser et gérer les plats.

## Licence

Ce projet est privé et n'est pas destiné à une distribution publique.

## Remerciements

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [TailwindCSS](https://tailwindcss.com/)
- [DaisyUI](https://daisyui.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [React Router](https://reactrouter.com/)
- [ESLint](https://eslint.org/)
- [SWC](https://swc.rs/)
- Maxence 
- Victor 
- Stéphane 
