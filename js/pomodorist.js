var default_time_seconds = 1500;
var intervalIdentifier;
var timer_state = 1; //1 - stopped, 2 - paused, 3 - running
var html_seconds = document.getElementById("seconds");
var html_minutes = document.getElementById("minutes");
var html_btn_pause = document.getElementById("btn_pause");
var new_minutes = 0;

function countdown() {
    default_time_seconds--;

    var minutes = Math.floor((default_time_seconds % (60 * 60)) / 60);
    var seconds = Math.floor(default_time_seconds % 60);

    html_minutes.innerHTML = minutes;
    if (seconds < 10) {
        var new_second = "0" + seconds;
        html_seconds.innerHTML = new_second;
    } else {
        html_seconds.innerHTML = seconds;
    }


    if (default_time_seconds <= 0) {
        clearInterval(intervalIdentifier);
        var audio = document.getElementById("audio");
        audio.play();
    }
}


function startTimer() {
    if (timer_state == 1) {
        clearInterval(intervalIdentifier);
        intervalIdentifier = setInterval(countdown, 1000);
        console.log(intervalIdentifier);
        timer_state = 3;
    }
}

function pauseTimer() {
    if (timer_state == 3) {
        clearInterval(intervalIdentifier);
        paused_state = true;
        html_btn_pause.value = "Resume timer";
        timer_state = 2;
    } else {
        intervalIdentifier = setInterval(countdown, 1000);
        paused_state = false;
        html_btn_pause.value = "Pause timer";
        timer_state = 3;
    }
}

function stopTimer() {
    clearInterval(intervalIdentifier);
    if (new_minutes == 0) {
        default_time_seconds = 1500;
    } else {
        default_time_seconds = new_minutes * 60;
    }
    var minutes = Math.floor((default_time_seconds % (60 * 60)) / 60);
    var seconds = Math.floor(default_time_seconds % 60);
    html_minutes.innerHTML = minutes;
    html_seconds.innerHTML = "0" + seconds;
    html_btn_pause.value = "Pause timer";
    timer_state = 1;

}

function changeMinutes() {

    if (timer_state == 1) {
        alertBox('Enter new minutes between 0-60', 'prompt', '');
    }
    /*if (timer_state == 1) {
        var minutes = Math.floor((default_time_seconds % (60 * 60)) / 60);
        new_minutes = window.prompt("Enter new minutes between 0-60", minutes);

        if (isNaN(new_minutes)) {
            new_minutes = prompt("A number is required.");
        } else if (new_minutes % 1 != 0) {
            new_minutes = prompt("Please do not enter a decimal number.");
        } else if (new_minutes > 60) {
            new_minutes = prompt("Please enter number 0-60");
        } else if (new_minutes == null || new_minutes == "") {
            new_minutes = default_time_seconds / 60;
        }

        html_minutes.innerHTML = new_minutes;
        default_time_seconds = new_minutes * 60;*/

}



function alertBox(text, type, text) {

    var button = '<div id="alertBox_button_div" ><input id="alertBox_button" class="button" style="margin: 7px;" type="button" value="Close" onclick="alertBox_hide()"></div>'

    var field = '<div><input id="ptext" class="field" type="number" autofocus></div>'

    if (type == "err") {
        document.getElementById('alertBox_text').innerHTML = text + button
        document.getElementById('alertBox_text').style.color = "#FF0000"
        document.getElementById('alertBox_text').style.top = "50%"
    } else if (type == "ok") {
        document.getElementById('alertBox_text').innerHTML = text + button
        document.getElementById('alertBox_text').style.top = "50%"
    } else if (type == "prompt") {
        document.getElementById('alertBox_text').innerHTML = text + field + button
        document.getElementById('alertBox_text').style.top = "25%"
        document.getElementById('alertBox_button').value = "OK"
        document.getElementById('alertBox_button').onclick = function() {
            new_minutes = parseInt(document.getElementById('ptext').value);
            if (new_minutes == "" || new_minutes > 60) {
                alert("You must enter number between 0-60");
            } else {
                html_minutes.innerHTML = new_minutes;
                default_time_seconds = new_minutes * 60;
                alertBox_hide();
            }
        }
        if (text) { document.getElementById('ptext').value = text }

    } else {
        document.getElementById('alertBox_text').innerHTML = text
    }

    document.getElementById('alertBox_container').style.visibility = 'visible'

} //end function

function alertBox_hide() {

    document.getElementById('alertBox_container').style.visibility = 'hidden'

}