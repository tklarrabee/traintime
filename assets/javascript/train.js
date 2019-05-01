// Initialize Firebase
var config = {
    apiKey: "AIzaSyCXX90mXLRTKgInXqMauiwZNzNwwCP-gKo",
    authDomain: "trainymctrainfacesenior.firebaseapp.com",
    databaseURL: "https://trainymctrainfacesenior.firebaseio.com",
    projectId: "trainymctrainfacesenior",
    storageBucket: "trainymctrainfacesenior.appspot.com",
    messagingSenderId: "615288150859"
};
firebase.initializeApp(config);

var keySet = [];

var database = firebase.database();
$("#trainButt").on("click", function () {

    var trainNameButt = $("#trainName").val().trim();
    var destinationButt = $("#destination").val().trim();
    var firstTrainButt = $("#firstTrain").val().trim();
    var frequencyButt = $("#frequency").val().trim();

    addTrain(frequencyButt, firstTrainButt, trainNameButt, destinationButt);

});

function addTrain(freq, first, name, dest) {


    var newTrain = {
        name: name,
        destination: dest,
        frequency: freq,
        firstTrain: JSON.stringify(first),
    }

    console.log(newTrain);

    database.ref().push(newTrain);
}

database.ref().on("child_added", function (childSnapshot) {
    console.log(childSnapshot.val());
    // var tFrequency = freq;


    var trainName = childSnapshot.val().name;
    var destination = childSnapshot.val().destination;
    var frequency = childSnapshot.val().frequency;
    var firstTrain = childSnapshot.val().firstTrain;

    var ogTrain = moment(firstTrain, "HH:mm").subtract(1, "years");
    var diffTime = moment().diff(moment(ogTrain), "minutes");
    var tRemainder = diffTime % frequency;
    var tMinutesTillTrain = frequency - tRemainder;
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    var prettyTime = moment(nextTrain).format("HH:mm");

    var rowUrBoat = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(destination),
        $("<td>").text(frequency),
        $("<td class='next'>").text(prettyTime),
        $("<td class='minutes'>").text(tMinutesTillTrain)
    );

    rowUrBoat.attr("id", childSnapshot.key)

    keySet.push(childSnapshot.key);
    console.log(keySet);
    $("#trainBod").append(rowUrBoat);
});

// function trainNext(freq, first){
//     var ogTrain = moment(first, "HH:mm").subtract(1, "years");
//     var diffTime = moment().diff(moment(ogTrain), "minutes");
//     var tRemainder = diffTime % freq;
//     var tMinutesTillTrain = frequency - tRemainder;
//     var nextTrain = moment().add(tMinutesTillTrain, "minutes");
//     var prettyTime = moment(nextTrain).format("hh:mm a");
//     return prettyTime;
// }

// function trainMinute(freq, first){
//     var ogTrain = moment(first, "HH:mm").subtract(1, "years");
//     var diffTime = moment().diff(moment(ogTrain), "minutes");
//     var tRemainder = diffTime % freq;
//     var tMinutesTillTrain = frequency - tRemainder;
//     return tMinutesTillTrain;
// }

// function trainUpdate(){
//     for(i = 0; i < keySet.length; i++){
//         var fireKey = keySet[i]
//         $("#"+fireKey+" > .next").text()
//     }
// }

// setInterval(trainUpdate, 60000)