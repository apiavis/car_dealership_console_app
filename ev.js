class ElectricVehicle extends Vehicle{
    constructor(obj){
        if (!obj) {
          console.log("Please provide an electric vehicle object.");
        } else {
          super(obj);
          this.type = 'electricvehicle';
          this.mpc = Number(obj.mpc);
          this.fuelCapacity = Number(100);
        }
    }
    checkFuel() { 
        if (this.fuel > 80) {
          return true;
        } else {
          return false;
        }
    }
};


