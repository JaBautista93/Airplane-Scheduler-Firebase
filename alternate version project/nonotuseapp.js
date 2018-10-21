var isNameEntered = false;
var update;

src = "https://www.gstatic.com/firebasejs/5.5.2/firebase.js"

// Initialize Firebase
var config = {
    apiKey: "AIzaSyDqT1b88zOaaeew2D1j1yNDjMNVdyHQrAc",
    authDomain: "flight-tracker-b1c2b.firebaseapp.com",
    databaseURL: "https://flight-tracker-b1c2b.firebaseio.com",
    projectId: "flight-tracker-b1c2b",
    storageBucket: "flight-tracker-b1c2b.appspot.com",
    messagingSenderId: "664708434965"
};
firebase.initializeApp(config);

// Create a variable to reference the database
var database = firebase.database();

$("#timeDisplay").html(moment().format("hh:mm: A"))

// Note remember to create these same variables in Firebase!
//  var flight = "";
//  var destination = "";
//  var takeoff = "";
//  var frequency = "";
// var nextflight = "";
// var minute = "";
// var tMinutesTillPlane = "";
// var nextFlight = "";

// Capture Button Click
$("#add-flight").on("click", function (event) {
    // Don't refresh the page!
    event.preventDefault();
    // Get inputs
    var flight = $("#flight-input").val().trim();
    var destination = $("#destination-input").val().trim();
    var frequency = $("#frequency-input").val().trim();
    var takeoff = $("#time-input").val().trim();

    if (flight !== "") {

        //object to hold plane data
        var newPlaneinfo = {
            
            nameOfflight: flight,
            nameOfdestination: destination,
            nameOffrequency: frequency,
            nameOftakeoff: takeoff,
            dateAdded: firebase.database.ServerValue.TIMESTAMP
        };

        //push the data into the database
        dataRef.ref().push(newPlaneinfo);

    } else {
        dataRef.ref().push(newPlaneinfo);
        alert("enter the flight number")
    }

    // clears all the textboxes
    $("#flight-input").val("")
    $("#destination-input").val("")
    $("#frequency-input").val("")
    $("#time-input").val("")


});



snapshot();
setInterval(snapshot, 60000)


function snapshot() {
     // empty the contents of the body tag
  $("#time-input > tbody").empty(),

  // displays the time
  $("#timeDisplay").html(moment().format("llll")).css('color','aqua')

dataRef.ref().on("child_added", function (childSnapshot) {
  console.log(childSnapshot.val());


//flight info

 var flight = childSnapshot.val().nameOfflight;
 var destination = childSnapshot.val().nameOfdestination;
 var frequency = childSnapshot.val().nameOffrequency;
 var takeoff = childSnapshot.val().nameOftakeoff;

 var time_converted = moment(firstTime, "HH:mm").subtract(1, "years")
 console.log(time_converted)

 var child_key = childSnapshot.key; // variable to get child key

 // diffence in minutes between the times
 var minutes_difference = moment().diff(moment(time_converted), "minutes");
 console.log(minutes_difference)

 // minutes from the time of arrival
 var time_remaining = frequency - (minutes_difference % frequency);
 console.log(" The time remainig before arrival time is : " + time_remaining);
// next train arrival time

var nextArrival = moment().add(time_remaining, "minutes").format("hh:mm:A") // gets the arrival time in minutes
// var arrivalTime = moment(nextArrival).format("hh:mm:A") // gets the arrival time in this normal time formal
// console.log( " The current time is : " + current_time)
console.log(" the next arrival time is : " + nextArrival)

// delete button dynamically created
var deleteRow = $("<button>").addClass("btn btn-danger delete").text("delete").attr("data-key", child_key)
$(deleteRow).on("click", function () {
  console.log("click me")
  var keyref = $(this).attr("data-key");
  dataRef.ref().child(keyref).remove();
  window.location.reload();
})


// Create the new row
var newRow = $("<tr>").append(
    $("<td>").text(flight),
    $("<td>").text(destination),
    $("<td>").text(frequency),
    $("<td>").text(takeoff),
    $("<td>").text(time_remaining),
    $("<td>").append(deleteRow),

    );
    // Append the new row to the table
    $("#flight-status > tbody").append(newRow),


      function (errorObject) {
        console.log("The read failed: " + errorObject.code);
      }



  });

}

 // time = $("#time-input").val().trim();
// console.log(time)
// frequency = $("#frequency-input").val().trim();
// console.log(frequency)
// // First Time (pushed back 1 year to make sure it comes before current time)
// var firstTimeConverted = moment(time, "HH:mm").subtract(1, "years");
// console.log(firstTimeConverted);

// // Current Time
// var currentTime = moment();
// console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

// // Difference between the times
// var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
// console.log("DIFFERENCE IN TIME: " + diffTime);

// // Time apart (remainder)
// var tRemainder = diffTime % frequency;
// console.log(tRemainder);

// // Minute Until flight
// tMinutesTillPlane = frequency - tRemainder;
// console.log("MINUTES TILL FLIGHT: " + tMinutesTillPlane);

// // Next flight
// nextFlight = moment().add(tMinutesTillPlane, "minutes");
// console.log("ARRIVAL TIME: " + moment(nextFlight).format("hh:mm"));



// So this kept causing an error, it just stopped worked at some point and I am not sure why I so took it out
// Print the initial data to the console.
//console.log(snapshot.val());

// Log the value of the various properties
//  console.log(snapshot.val().flight);
//  console.log(snapshot.val().destination);
//  console.log(snapshot.val().takeoff);
//  console.log(snapshot.val().frequency);
//  console.log(snapshot.val().tMinutesTillPlane);
//  console.log(snapshot.val().nextFlight);


// Code in the logic for storing and retrieving the most recent user.
// database.ref().push({
// flight: flight,
// destination: destination,
// takeoff: takeoff,
// frequency: frequency,
// tMinutesTillPlane: tMinutesTillPlane,
// nextFlight: nextFlight,
// dateAdded: firebase.database.ServerValue.TIMESTAMP
// });

// // Firebase is always watching for changes to the data.
// // When changes occurs it will print them to console and html
// database.ref().on("child_added", function (snapshot) {

//     // Change the HTML
//     $("#flight-display").after(snapshot.val().flight);
//     $("#desination-display").after(snapshot.val().destination);
//     $("#frequency-display").after(snapshot.val().takeoff);
//     $("#minute-display").append(tMinutesTillPlane);
//     $("#nextarriaval-display").append(nextFlight);

//     // Handle the errors
// }, function (errorObject) {
//     console.log("Errors handled: " + errorObject.code);
// });