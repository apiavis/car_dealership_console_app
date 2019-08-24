const VehicleFactory = (()=> {
    const _vehicles = {
      car: Car,
      truck: Truck,
      motorcycle: Motorcycle,
      electricvehicle: ElectricVehicle
    };
  
    return {
      build: (vehicleType, obj)=> {
        if (!vehicleType) {
          throw "vehicleType is a required parameter";
        }
  
        vehicleType = vehicleType.toLowerCase();
  
        if (_vehicles[vehicleType]) {
          return new _vehicles[vehicleType](obj);
        } else {
          throw vehicleType + " is not a valid vehicle";
        }
      }
    };
  })();
  
  document.addEventListener("DOMContentLoaded", ()=> {
    console.log("THE WINDOW OBJECT IS...", window);
    window.readyToShip = [];

    fetch("./vehicleData.json")
      .then(res => {
        return res.json();
      })
      .then(data => {
        processVehicles(data);
        init();
      });
  });

  function init() {
    window.subaruDealership = new Dealership("Jo's Cars",5000000);
    subaruDealership.addToLot(window.readyToShip);
    subaruDealership.sellVehicle("WAUBVAFB4BN838575",{name: 'Jane Doe',phone:1111111111,address:"144 uisheiugh"},0.05);
    subaruDealership.insuranceCheck();
    subaruDealership.maintenanceCheck();
    subaruDealership.refuel(subaruDealership.carLot[1]);
    subaruDealership.salesPitch(subaruDealership.carLot[1]);
    subaruDealership.selectCarForTestDrive("mercury","cougar",1999);
}
  
  function processVehicles(vehicleObjArr) {
    console.log("----------------------------");
    console.log("    Process Vehicles     ");
    console.log("----------------------------");
    const vehicleJunkYard = [];
    const vehicleProperties= ['type','vin','make','model','color','year','mileage','price','fuel','costToDealership'];
    for (let i = 0; i < vehicleObjArr.length; i++) {
        if (!(hasAllProperties(vehicleObjArr[i],vehicleProperties)))
        {
            console.log("Additional data is required for one or more vehicles.  Sending vehicle(s) to the Junk Yard.");
            vehicleJunkYard.push(vehicleObjArr[i]);
        } else {
            vehicleObjArr[i].maintenanceAndInsurance.lastServiced = new Date(
            vehicleObjArr[i].maintenanceAndInsurance.lastServiced
            );
            vehicleObjArr[i].maintenanceAndInsurance.lastInsured = new Date(
            vehicleObjArr[i].maintenanceAndInsurance.lastInsured
            );
            vehicleObjArr[i].costToDealership = Number((vehicleObjArr[i].price * 0.8).toFixed(2));
            if (vehicleObjArr[i].type === "car" || vehicleObjArr[i].type === "truck" || vehicleObjArr[i].type === "motorcycle" || vehicleObjArr[i].type === "electricvehicle")
            handle[vehicleObjArr[i].type](vehicleObjArr[i]);
        }
    }
    console.log(readyToShip.length + " vehicle(s) have been processed and are ready to ship.");
    console.log(vehicleJunkYard.length + " vehicles were sent to the junk yard.");
    console.log("");
    return readyToShip;
  };

  const handle = {
    car: function(vehicleObj) {
      vehicleObj.mpg = getRandomNum(20, 30);
      let newCarInstance = VehicleFactory.build(vehicleObj.type, vehicleObj);
      readyToShip.push(newCarInstance);
      return newCarInstance;
    },
    truck: function(vehicleObj) {
      vehicleObj.mpg = getRandomNum(15, 20);
      vehicleObj.towingCapacity = getRandomNum(5000, 40000);
      let newTruckInstance = VehicleFactory.build(vehicleObj.type, vehicleObj);
      readyToShip.push(newTruckInstance);
      return newTruckInstance;
    },
    motorcycle: function(vehicleObj) {
        vehicleObj.mpg = getRandomNum(35, 50);
        let newMotorcycleInstance = VehicleFactory.build(vehicleObj.type, vehicleObj);
        readyToShip.push(newMotorcycleInstance);
        return newMotorcycleInstance;
    },
    electricvehicle: function(vehicleObj) {
        vehicleObj.mpc = getRandomNum(200, 300);
        let newElectricVehicleInstance = VehicleFactory.build(vehicleObj.type, vehicleObj);
        readyToShip.push(newElectricVehicleInstance);
        return newElectricVehicleInstance;
    }
  };  

function hasAllProperties(obj, props) {
    for (let i = 0; i < props.length; i++) {
        if (!obj.hasOwnProperty(props[i]))
            return false;
    }
    return true;
}