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
 var time = "";
 var landing = "";
 var minute = "";

 // Capture Button Click
 $("#add-flight").on("click", function (event) {
     // Don't refresh the page!
     event.preventDefault();

     // Get inputs

     flight = $("#flight-input").val().trim();
     destination = $("#destination-input").val().trim();
     time = $("#time-input").val().trim();
     landing = $("#landing-input").val().trim();
    //  minute = $("#minute-input").val().trim();

     // Code in the logic for storing and retrieving the most recent user.
     database.ref().push({
         flight: flight,
         destination: destination,
         time: time,
         landing: landing,
        //  minute: minute,
         dateAdded: firebase.database.ServerValue.TIMESTAMP
     });
 });
 // Firebase is always watching for changes to the data.
 // When changes occurs it will print them to console and html
 database.ref().on("child_added", function (snapshot) {

     // Print the initial data to the console.
     console.log(snapshot.val());

     // Log the value of the various properties
     console.log(snapshot.val().flight);
     console.log(snapshot.val().destination);
     console.log(snapshot.val().time);
     console.log(snapshot.val().landing);
    //  console.log(snapshot.val().minute);


     // Change the HTML
     $("#flight-display").append(snapshot.val().flight);
     $("#desination-display").append(snapshot.val().destination);
     $("#time-display").append(snapshot.val().time);
     $("#landing-display").append(snapshot.val().landing);
    //  $("#minute-display").text(snapshot.val().minute);

     // Handle the errors
 }, function (errorObject) {
     console.log("Errors handled: " + errorObject.code);
 });
 // dataRef.ref().orderByChild("dataAdded").limitToLast(1).on('child_added", function(snapshot)