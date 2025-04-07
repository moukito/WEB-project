import csv
import json
import random

# Définition des catégories
CATEGORIES = {
    "entree": ["01-ENTREES FROIDES", "03-ENTREE CHAUDE"],
    "viande": ["04-VIANDE/POISSON/OEUF", "05-LAPIN & VOLAILLE"],
    "vege": ["06-PLATS VEGETARIENS"],
    "dessert": ["11-DESSERT LACTÉ/FRUIT", "12-PATISSERIES"],
    "base": ["09-GARNITURES", "02-GARNITURES SALADES"]
}

# Lecture du CSV
def lire_csv(nom_fichier):
    plats = {
        "entree": [],
        "viande": [],
        "poisson": [],
        "vege": [],
        "dessert": [],
        "base": []
    }

    with open(nom_fichier, newline='', encoding='utf-8') as csvfile:
        reader = csv.reader(csvfile)
        for ligne in reader:
            if len(ligne) < 3:
                continue
            nom = ligne[0].strip()
            type_principal = ligne[1].strip()
            sous_type = ligne[2].strip().upper()

            if type_principal in CATEGORIES["entree"]:
                plats["entree"].append(nom)
            elif type_principal in CATEGORIES["vege"]:
                plats["vege"].append(nom)
            elif type_principal in CATEGORIES["viande"]:
                if "POISSON" in sous_type:
                    plats["poisson"].append(nom)
                else:
                    plats["viande"].append(nom)
            elif type_principal in CATEGORIES["dessert"]:
                plats["dessert"].append(nom)
            elif type_principal in CATEGORIES["base"]:
                plats["base"].append(nom)

    return plats

# Combine une protéine avec une base pour un plat complet
def composer_plat(proteine, bases):
    base = random.choice(bases)
    return f"{proteine} avec {base}"

# Génère un menu avec contraintes
def generer_menu(plats):
    entree_count = random.randint(3, 4)
    dessert_count = random.randint(2, 3)

    return {
        "entrees": random.sample(plats["entree"], min(entree_count, len(plats["entree"]))),
        "plats": {
            "viande": composer_plat(random.choice(plats["viande"]), plats["base"]),
            "poisson": composer_plat(random.choice(plats["poisson"]), plats["base"]),
            "vegetarien": composer_plat(random.choice(plats["vege"]), plats["base"])
        },
        "desserts": random.sample(plats["dessert"], min(dessert_count, len(plats["dessert"])))
    }

# Génération des menus
def main():
    fichier_csv = "liste recette.xlsx - Feuil1.csv"
    plats = lire_csv(fichier_csv)

    if any(len(plats[cat]) < 5 for cat in ["entree", "viande", "poisson", "vege", "dessert", "base"]):
        print("Pas assez de données dans une des catégories nécessaires.")
        return

    menus = {}
    for i in range(1, 21):  # De 1 à 20
        menus[f"menu_{i}"] = generer_menu(plats)

    with open("menus.json", "w", encoding="utf-8") as f:
        json.dump(menus, f, indent=4, ensure_ascii=False)

    print("20 menus générés dans menus.json")


if __name__ == "__main__":
    main()
