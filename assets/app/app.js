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

var dataRef = firebase.database();


$("#timeDisplay").html(moment().format("hh:mm: A"))

// Capture Button Click
$("#add-train-info").on("click", function (event) {
  event.preventDefault();
  // gets train info
  var trainName = $("#trainName").val().trim();
  var destination = $("#destination").val().trim();
  var frequency = $("#frequency").val().trim();
  var firstTime = $("#first-train-time").val().trim();


  if (trainName !== "") {

    // object to hold train data
    var newTrainInfo = {

      nameOfTrain: trainName,
      nameOfDestination: destination,
      nameOfFrequency: frequency,
      nameOFfirstTime: firstTime,
      dateAdded: firebase.database.ServerValue.TIMESTAMP
    };

    // push the data into database
    dataRef.ref().push(newTrainInfo);

  } else {
    dataRef.ref().push(newTrainInfo);
    alert("enter the train name")
  }

  // clears all the textboxes
  $("#trainName").val("")
  $("#destination").val("")
  $("#frequency").val("")
  $("#first-train-time").val("")


});



snapshot();
setInterval(snapshot, 60000)


function snapshot() {
  // empty the contents of the body tag
  $("#train-info-display > tbody").empty(),

    // displays the time
    $("#timeDisplay").html(moment().format("llll")).css('color','aqua')
 
  dataRef.ref().on("child_added", function (childSnapshot) {
    console.log(childSnapshot.val());

    //train info

    var trainName = childSnapshot.val().nameOfTrain;
    var destination = childSnapshot.val().nameOfDestination;
    var frequency = childSnapshot.val().nameOfFrequency;
    var firstTime = childSnapshot.val().nameOFfirstTime;

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
      $("<td>").text(trainName),
      $("<td>").text(destination),
      $("<td>").text(frequency),
      $("<td>").text(nextArrival),
      $("<td>").text(time_remaining),
      $("<td>").append(deleteRow),

    );
    // Append the new row to the table
    $("#train-info-display > tbody").append(newRow),


      function (errorObject) {
        console.log("The read failed: " + errorObject.code);
      }



  });

}


