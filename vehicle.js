class Vehicle {
    constructor(obj) {
        if (!obj) {
            console.log("Please provide a vehicle object.");
        } else {
            this.type = String(obj.type);
            this.vin = String(obj.vin);
            this.make = String(obj.make);
            this.model = String(obj.model);
            this.color = String(obj.color);
            this.year = Number(obj.year);
            this.wheels = Number(4);
            this.mileage = Number(obj.mileage);
            this.price = Number(obj.price);
            this.fuel = Number(obj.fuel);
            this.description = 'A ' + obj.color + ' ' + obj.make + ' ' + obj.model + ' with ' +  obj.mileage + ' miles'
            this.costToDealership = Number(obj.costToDealership);
            this.clean = Boolean(obj.clean);
            this.maintenanceAndInsurance = {
                lastServiced: obj.maintenanceAndInsurance.lastServiced,
                lastInsured: obj.maintenanceAndInsurance.lastInsured
                }
        }
    }
    checkFuel() {
        if (this.fuel > 5) {
            return true;
        } else {
            return false;
        }
    }
    testDrive(miles) {
        if (!miles) {
            console.log("Please enter the number of miles of the test drive.");
        }
        if (miles < 1 || miles > 5) {
            return false;
        } else {
            this.mileage += miles;
            this.fuel -= miles;
            console.log("Vehicle taken for test drive.");
            console.log("The new mileage for this vehicle is: " + this.mileage + ".  " + "The new fuel value is: " + this.fuel + ".");
            return this;
        }
    }
};