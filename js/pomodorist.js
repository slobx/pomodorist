var default_time_seconds = 1500;
var intervalIdentifier;

function countdown() { // decrement diff by on seconds
    default_time_seconds--;

    var minutes = Math.floor((default_time_seconds % (60 * 60)) / 60);
    var seconds = Math.floor(default_time_seconds % 60);

    document.getElementById("minutes").innerHTML = minutes;
    if (seconds < 10) {
        var new_second = "0" + seconds;
        document.getElementById("seconds").innerHTML = new_second;
    } else {
        document.getElementById("seconds").innerHTML = seconds;
    }


    // check if we should stop counting
    if (isNegative(default_time_seconds)) {
        // stop repetition
        clearInterval(intervalIdentifier);
        alert("Ding ding ding");
    }
}


function startTimer() {
    clearInterval(intervalIdentifier);
    default_time_seconds = 1500;
    intervalIdentifier = setInterval(countdown, 1000);
    console.log(intervalIdentifier);
}