import Dish from "./Dish.js";

class Appetizer extends Dish {
    constructor(name, description, cost = 0, ingredients = [], isCold = false) {
        super(name, description, cost, ingredients);
        this.isCold = isCold;
    }

    print() {
        let base = super.print();
        return `Entrée: ${base}${this.isCold ? ' (servi froid)' : ''}`;
    }
}

export default Appetizer;
