"use strict";
var myApp = {
    Car: function (make, model, color) {
        this.make = make;
        this.model = model;
        this.color = color;
    },
    Cars: [],
    createCar: function () {
        var makeVal = document.getElementById("carMake").value;
        var modelVal = document.getElementById("carModel").value;
        var colorVal = document.getElementById("carColor").value;
        myApp.Cars.push(new myApp.Car(makeVal, modelVal, colorVal));

        var car = new myApp.Car(makeVal, modelVal, colorVal);
        var url = "https://popping-fire-7184.firebaseio.com/.json";

        var request = new XMLHttpRequest();
        //create a new request object
        request.open('POST', url, true);
        //This addresses and puts the stamp on the envelope
            request.onload = function () {
            if (this.status >= 200 && this.status < 400) {
                var data = JSON.parse(this.response);
                for (var x in data) {
                   // myApp.Cars.push(data[x]);
                }
                //myApp.Cars.push(this.response);
                alert(this.response);
                //it worked  
            } else {
                //it failed 
                alert(this.response);
            }
        };
        //This triggers on a response from the server
        request.onerror = function () {
            console.log("Connection Error");
            //the message never got there or the response never came back to us   
        };
        //everything until now was building the request
        request.send(JSON.stringify(car));





        document.getElementById("carMake").value = "";
        document.getElementById("carModel").value = "";
        document.getElementById("carColor").value = "";
        myApp.redrawCars();
    },
    redrawCars: function () {
        var allCars = document.getElementById("allCars");
        allCars.innerHTML = "";
        allCars.setAttribute("style", "visibility: visible;");
        var prop = "";
        for (var i in myApp.Cars) {
            prop += '<tr><td>' + myApp.Cars[i].make + '</td><td>'
                + myApp.Cars[i].model + '</td><td>' + myApp.Cars[i].color
            + '</td><td><div class="btn btn-info" onclick="myApp.editCar(' + i + ')">Edit</div><div class="btn btn-danger" onclick="myApp.deleteCar(' + i + ')">Delete</div></tr>';

        }
        allCars.innerHTML += prop;
    },
    editCar: function (index) {
        //hide create button
        //unhide a button for update
        //unhide a second button to cancel
        var hideCreate = document.getElementById("createCar");
        hideCreate.style.visibility = "hidden";

        var updateButton = document.getElementById("updateCar");
        updateButton.style.visibility = "visible";

        var cancelButton = document.getElementById("cancelEdit");
        cancelButton.style.visibility = "visible";

        document.getElementById("carMake").value = myApp.Cars[index].make;
        document.getElementById("carModel").value = myApp.Cars[index].model;
        document.getElementById("carColor").value = myApp.Cars[index].color;

        //set hidden input or as a variable
        myApp.currentEdit = index;
    },
    saveEditCar: function () {


        myApp.Cars[myApp.currentEdit].make = document.getElementById("carMake").value;
        myApp.Cars[myApp.currentEdit].model = document.getElementById("carModel").value;
        myApp.Cars[myApp.currentEdit].color = document.getElementById("carColor").value;
        myApp.currentEdit = -1;
     
      
        var url = "https://popping-fire-7184.firebaseio.com/.json";

        var request = new XMLHttpRequest();
        //create a new request object
        request.open('GET', url, true);
        //This addresses and puts the stamp on the envelope
        request.onload = function () {
            if (this.status >= 200 && this.status < 400) {
                var data = JSON.parse(this.response);
                for (var x in data) {
                    //myApp.Cars.push(data[x]);
                }
                alert(this.response);
                //it worked  
            } else {
                //it failed 
                alert(this.response);
            }
        };
        //This triggers on a response from the server
        request.onerror = function () {
            console.log("Connection Error");
            //the message never got there or the response never came back to us   
        };
        //everything until now was building the request
        request.send();

        document.getElementById("carMake").value = "";
        document.getElementById("carModel").value = "";
        document.getElementById("carColor").value = "";

        myApp.redrawCars();

        var hideCreate = document.getElementById("createCar");
        hideCreate.style.visibility = "visible";

        var updateButton = document.getElementById("updateCar");
        updateButton.style.visibility = "hidden";

        var cancelButton = document.getElementById("cancelEdit");
        cancelButton.style.visibility = "hidden";

    },

    cancelEditCar: function () {
        hideCreate.style.visibility = "visible";
    },



    deleteCar: function (index) {
        myApp.Cars.splice(index, 1);
        myApp.redrawCars();

    },
    sortCars: function () {
        myApp.redrawCars();
    }

};