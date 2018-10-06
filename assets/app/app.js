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

 // Note remember to create these same variables in Firebase!
 var flight = "";
 var destination = "";
 var takeoff = "";
 var frequency = "";
 var nextflight = "";
 var minute = "";


 // Capture Button Click
 $("#add-flight").on("click", function (event) {
     // Don't refresh the page!
     event.preventDefault();

     // Get inputs
     flight = $("#flight-input").val().trim();
     destination = $("#destination-input").val().trim();
     takeoff = $("#time-input").val().trim();
     frequency = $("#frequency-input").val().trim();

// So this kept causing an error, it just stopped worked at some point and I am not sure why I so took it out
     // Print the initial data to the console.
     //console.log(snapshot.val());

     // Log the value of the various properties
    //  console.log(snapshot.val().flight);
    //  console.log(snapshot.val().destination);
    //  console.log(snapshot.val().takeoff);
    //  console.log(snapshot.val().frequency);

     // Code in the logic for storing and retrieving the most recent user.
     database.ref().push({
         flight: flight,
         destination: destination,
         takeoff: takeoff,
         frequency: frequency,
         dateAdded: firebase.database.ServerValue.TIMESTAMP
     });

 });
 // Firebase is always watching for changes to the data.
 // When changes occurs it will print them to console and html
 database.ref().on("child_added", function (snapshot) {

     // Change the HTML
     $("#flight-display").after(snapshot.val().flight);
     $("#desination-display").after(snapshot.val().destination);
     $("#frequency-display").after(snapshot.val().takeoff);
    
     
     // Handle the errors
 }, function (errorObject) {
     console.log("Errors handled: " + errorObject.code);
 });
 
 // This is how we should get the moment js but I am not sure why I am not getting the inputs to grab
// the inputed number.  Everytime I try and put this inside the click event, it doesn't work, I thought about making two seperate events
// but that doesn't seem right.  I will ask for help on the this.    
    time = $("#time-input").val().trim();
    console.log(time)
    frequency = $("#frequency-input").val().trim();
    console.log(frequency)
    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(time, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);
   
    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));
   
    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);
   
    // Time apart (remainder)
    var tRemainder = diffTime % frequency;
    console.log(tRemainder);
   
    // Minute Until flight
    var tMinutesTillPlane = frequency - tRemainder;
    console.log("MINUTES TILL FLIGHT: " + tMinutesTillPlane);
    $("#minute-display").append(tMinutesTillPlane);
   
    // Next flight
    var nextFlight = moment().add(tMinutesTillPlane, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextFlight).format("hh:mm"));
    $("#nextarriaval-display").append(nextFlight);
