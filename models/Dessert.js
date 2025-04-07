import Dish from "./Dish.js";

class Dessert extends Dish {
    constructor(name, description, cost, ingredients = [], containLactose = true) {
        super(name, description, cost, ingredients);
        this.containLactose = containLactose;
    }

    print() {
        let base = super.print();
        return `Dessert: ${base}${this.containLactose ? '' : ' (sans lactose)'}`;
    }
}

export default Dessert;
