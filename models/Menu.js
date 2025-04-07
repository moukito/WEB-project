class Menu {
    constructor(name, appetizer, mainDish, dessert) {
        this.name = name;
        this.appetizer = appetizer;
        this.mainDish = mainDish;
        this.dessert = dessert;
    }

    computeTotalCost() {
        return this.appetizer.cost + this.mainDish.cost + this.dessert.cost;
    }

    print() {
        return `MENU "${this.name}" - ${this.computeTotalCost()}€\n\n` +
               `${this.appetizer.print()}\n\n` +
               `${this.mainDish.print()}\n\n` +
               `${this.dessert.print()}`;
    }
}

export default Menu;
