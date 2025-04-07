class Dish {
    constructor(name, description, cost = 0, ingredients = []) {
        this.name = name;
        this.description = description;
        this.cost = cost;
        this.ingredients = ingredients;
    }

    print() {
        return `${this.name} - ${this.cost}€\n${this.description}`;
    }

    addIngredient(ingredient) {
        this.ingredients.push(ingredient);
    }
}

export default Dish;
