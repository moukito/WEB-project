import Dish from 'models/Dish.js';

class mainDish extends Dish {
    constructor(name, description, cost = 0, ingredients = [], sideDish = null, typeCooking = 'standard') {
        super(name, description, cost, ingredients);
        this.sideDish = sideDish;
        this.typeCooking = typeCooking;
    }

    print() {
        let base = super.print();
        let info = `Plat: ${base}`;
        
        if (this.sideDish) {
            info += `\nAccompagnement: ${this.sideDish}`;
        }
        
        return info;
    }
}

export default mainDish;
