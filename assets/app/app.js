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
 var tMinutesTillPlane = "";
 var nextFlight = "";

 // Capture Button Click
 $("#add-flight").on("click", function (event) {
     // Don't refresh the page!
     event.preventDefault();

     // Get inputs
     flight = $("#flight-input").val().trim();
     destination = $("#destination-input").val().trim();
     takeoff = $("#time-input").val().trim();
     frequency = $("#frequency-input").val().trim();

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
     tMinutesTillPlane = frequency - tRemainder;
     console.log("MINUTES TILL FLIGHT: " + tMinutesTillPlane);

     // Next flight
     nextFlight = moment().add(tMinutesTillPlane, "minutes");
     console.log("ARRIVAL TIME: " + moment(nextFlight).format("hh:mm"));



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
     database.ref().push({
         flight: flight,
         destination: destination,
         takeoff: takeoff,
         frequency: frequency,
         tMinutesTillPlane: tMinutesTillPlane,
         nextFlight: nextFlight,
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
     $("#minute-display").append(tMinutesTillPlane);
     $("#nextarriaval-display").append(nextFlight);

     // Handle the errors
 }, function (errorObject) {
     console.log("Errors handled: " + errorObject.code);
 });

