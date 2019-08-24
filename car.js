class Car extends Vehicle{
    constructor(obj){
        if (!obj) {
            console.log("Please provide a car object.");
        } else {
            super(obj);
            this.type = 'car';
            this.mpg = Number(obj.mpg);
            this.fuelCapacity = Number(16);
        }
    }
};
