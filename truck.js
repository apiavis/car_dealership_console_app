class Truck extends Vehicle{
    constructor(obj){
        if (!obj) {
            console.log("Please provide a truck object.");
        } else {
            super(obj);
            this.type = 'truck';
            this.mpg = Number(obj.mpg);
            this.fuelCapacity = Number(65);
            this.towingCapacity = Number(obj.towingCapacity);
            this.wheels = Number(8);
        }
    }
};
