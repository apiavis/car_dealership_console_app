class Dealership {
  constructor(dealershipName,startingBalance) {
    if (!dealershipName || !startingBalance) {
      console.log("You are missing the dealership name and/or the starting balance.");
    } else {
      this.salesHistory = [];
      this.balance = Number(startingBalance);
      this.carLot = [];
      this.dealershipName = String(dealershipName);
    }
  }
  addToLot(vehicleArr) { 
    console.log("----------------------------")
    console.log(" Add Vehicles to the Lot ")
    console.log("----------------------------")
    let numNewVehiclesAdded = 0;
    for (let i = 0; i < vehicleArr.length; i++) {
      let numModelInCarLot = this.carLot.getCountByKeyValue('model',vehicleArr[i].model)
      if (numModelInCarLot < 3) {
        this.carLot.push(vehicleArr[i]);
        numNewVehiclesAdded++;
        this.balance -= parseFloat((vehicleArr[i].costToDealership).toFixed(2));
        this.balance = parseFloat((this.balance).toFixed(2));
      }
    }
    console.log(numNewVehiclesAdded + " new vehicles have been added to the car lot.");
    console.log("");
    return numNewVehiclesAdded;
  }
  sellVehicle(vinNum,buyerObj,discountPercentage) {
    console.log("----------------------------")
    console.log("        Sell Vehicle        ")
    console.log("----------------------------")
    if (!vinNum) {
      console.log("Please enter VIN number of desired vehicle.");
    } else if (!buyerObj){
      console.log("Please enter the buyer's information.");
    } else if (!discountPercentage) {
      console.log("You have not entered a discount percentage for this customer.");
    }
    String(vinNum);
    Number(discountPercentage);
    if (discountPercentage > 1) {
      console.log("Please enter the discount percentage as a decimal.");
    }
    let numVinInCarLot = this.carLot.getCountByKeyValue('vin',vinNum);
    if (numVinInCarLot === 0) {
      console.log("This vehicle is not available.")
      console.log("");
    } else if (numVinInCarLot > 1) {
      console.log("Seems like you have a scam on your hands.")
      console.log("");
    } else {
      let desiredVehicleIndex = this.carLot.findIndex(x => x.vin === vinNum)
      console.log("Vehicle found in car lot: " + this.carLot[desiredVehicleIndex].make + ", " + this.carLot[desiredVehicleIndex].model + ", " + this.carLot[desiredVehicleIndex].year);  
      if (this.carLot[desiredVehicleIndex].clean === false) {
          console.log("Vehicle needs a wash.");
          this.wash(this.carLot[desiredVehicleIndex]);
        }
      console.log("Vehicle price before customer discount: $" + this.carLot[desiredVehicleIndex].price);
      let priceForCustomer = parseFloat(((this.carLot[desiredVehicleIndex].price) * (1 - discountPercentage)).toFixed(2));
      console.log("Price for this customer is: $" + priceForCustomer);
      console.log("Dealership balance before selling vehicle: $" + this.balance);
      this.balance += parseFloat(priceForCustomer.toFixed(2));
      this.balance = parseFloat((this.balance).toFixed(2));
      console.log("Dealership balance after selling vehicle: $ " + this.balance);
      console.log("");
      buyerObj.vehicle = this.carLot[desiredVehicleIndex];
      this.salesHistory.push(buyerObj);
      this.carLot.splice(desiredVehicleIndex, 1);
    }
    return this.balance;
  }
  insuranceCheck(date='') {
    console.log("----------------------------")
    console.log("       Insurance Check      ")
    console.log("----------------------------")
    console.log("Balance of dealership before insurance check: $" + this.balance);
    if (date) {
      let insGreaterThan30 = [];
      for (let i = 0; i < this.carLot.length; i++) {
        let diffInDates = dateDiff.inDays(this.carLot[i].maintenanceAndInsurance.lastInsured,date);
        if (diffInDates > 30) {
          insGreaterThan30.push(this.carLot[i]);
        }
      }
      return insGreaterThan30;
    } else {
      var overdueInsRenewed = [];
      for (let j = 0; j < this.carLot.length; j++) {
        let todaysDate = new Date();
        let diffInDates = dateDiff.inDays(this.carLot[j].maintenanceAndInsurance.lastInsured, todaysDate);
        if (diffInDates > 30) {
          this.renewInsurance(this.carLot[j]);
          overdueInsRenewed.push(this.carLot[j]);
        }
      }
    }
    console.log("Balance of dealership after insurance check: $" + this.balance);
    console.log("");
    return overdueInsRenewed;
  }
  renewInsurance(vehicleObj) {
    let todaysDate = new Date();
    vehicleObj.maintenanceAndInsurance.lastInsured = todaysDate;
    let insuranceCost = parseFloat(parseFloat((getRandomPrice(100,300))).toFixed(2));
    this.balance -= parseFloat(insuranceCost.toFixed(2));
    this.balance = parseFloat((this.balance).toFixed(2));
    vehicleObj.costToDealership += parseFloat(insuranceCost.toFixed(2));
    vehicleObj.costToDealership = parseFloat((vehicleObj.costToDealership).toFixed(2));
    return vehicleObj;
  }
  maintenanceCheck(date) {
    console.log("----------------------------")
    console.log("      Maintenance Check     ")
    console.log("----------------------------")
    console.log("Balance of dealership before maintenance check: $" + this.balance);
    if (date) {
      let mainGreaterThan90 = [];
      for (let i = 0; i < this.carLot.length; i++) {
        let diffInDates = dateDiff.inDays(this.carLot[i].maintenanceAndInsurance.lastServiced,date);
        if (diffInDates > 90) {
          mainGreaterThan90.push(this.carLot[i]);
        }
      }
      return mainGreaterThan90;
    } else {
      var overdueMainPerformed = [];
      for (let i = 0; i < this.carLot.length; i++) {
        let todaysDate = new Date();
        let diffInDates = dateDiff.inDays(this.carLot[i].maintenanceAndInsurance.lastServiced,todaysDate);
        if (diffInDates > 90) {
          this.maintenance(this.carLot[i]);
          overdueMainPerformed.push(this.carLot[i]);
        }
      }
    }
    console.log("Balance of dealership after maintenance check: $" + this.balance);
    console.log("");
    return overdueMainPerformed;
  }
  maintenance(vehicleObj) {
    let todaysDate = new Date();
    vehicleObj.maintenanceAndInsurance.lastServiced = todaysDate;
    let maintenanceCost = parseFloat(parseFloat((getRandomPrice(100,2000))).toFixed(2));
    this.balance -= parseFloat(maintenanceCost.toFixed(2));
    this.balance = parseFloat((this.balance).toFixed(2));
    vehicleObj.costToDealership += parseFloat(maintenanceCost.toFixed(2));
    vehicleObj.costToDealership = parseFloat((vehicleObj.costToDealership).toFixed(2));
    return vehicleObj;
  }
  refuel(vehicleObj) {
    console.log("----------------------------")
    console.log("       Vehicle Refuel       ")
    console.log("----------------------------")
    vehicleObj.fuel = vehicleObj.fuelCapacity;
    console.log(vehicleObj.description + " has been refueled!");
    console.log("");
    return vehicleObj;
  }
  salesPitch(vehicleObj) {
    console.log("----------------------------")
    console.log("        Sales Pitch         ")
    console.log("----------------------------")
    let salesPitch = ("Come on down to " + this.dealershipName + "! We've got " + vehicleObj.description + " for $" + vehicleObj.price + " today only!");
    console.log(salesPitch);
    console.log("");
    return salesPitch;
  }
  selectCarForTestDrive(make,model,year) {
    console.log("----------------------------")
    console.log("         Test Drive         ")
    console.log("----------------------------")
    make = capitalize(make);
    model = capitalize(model);
    year = Number(year);
    console.log("Vehicle desired for test drive: " + make + ", " + model + ", " + year);
    for (let i = 0; i < this.carLot.length; i++) {
      if ((this.carLot[i].make === make) && (this.carLot[i].model === model) && (this.carLot[i].year === year)){
        console.log("Vehicle found in car lot.");
        let desiredVehicle = this.carLot[i];
        if (desiredVehicle.checkFuel()) {
          desiredVehicle.testDrive(3);
          return desiredVehicle;
        } else {
          console.log("Vehicle did not have enough fuel for a test drive.")
          console.log("");
          return false
        }
      } 
    }
    console.log("Vehicle not found.");
    console.log("");
    return false;
  }
  wash(vehicleObj) {
    console.log("-------Wash Vehicle-------")
    console.log("Vehicle has been washed.")
    vehicleObj.clean = true;
    console.log("Vehicle cost to dealership before car wash: $" + vehicleObj.costToDealership);
    vehicleObj.costToDealership += 10;
    vehicleObj.costToDealership = parseFloat((vehicleObj.costToDealership).toFixed(2));
    console.log("Vehicle cost to dealership after car wash: $" + vehicleObj.costToDealership);
    console.log("Balance of dealership before car wash: $" + this.balance);
    this.balance -= 10;
    this.balance = parseFloat((this.balance).toFixed(2));
    console.log("Balance of dealership after car wash: $" + this.balance);
    return true;
  }
};