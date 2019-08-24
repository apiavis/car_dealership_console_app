class Motorcycle extends Vehicle{
    constructor(obj){
        if (!obj) {
            console.log("Please provide an electric vehicle object.");
        } else {
            super(obj);
            this.type = 'motorcycle';
            this.mpg = Number(obj.mpg);
            this.fuelCapacity = Number(10);
            this.wheels = Number(2);
        }
    }
};