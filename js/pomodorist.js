var time = 1500;
var new_time = 1500;
var intervalIdentifier;
var timer_state = 1; //1 - stopped, 2 - paused, 3 - running
const html_btn_pause = document.getElementById("btn_pause");
const html_btn_start = document.getElementById('btn_start');
const html_btn_stop = document.getElementById('btn_stop');
const display = document.getElementById('display');


function refresh() {
    display.innerHTML = (Math.floor(time / 60) < 10 ? "0" : "") + Math.floor(time / 60) + ":" + (Math.floor(time % 60) < 10 ? "0" : "") + Math.floor(time % 60);

}

function countdown() {
    time--;
    refresh();

    if (time <= 0) {
        clearInterval(intervalIdentifier);
        var audio = document.getElementById("audio");
        audio.play();
    }
}

function startTimer() {
    if (timer_state == 1) {
        clearInterval(intervalIdentifier);
        intervalIdentifier = setInterval(countdown, 1000);
        timer_state = 3;
    }
}

function pauseTimer() {
    if (timer_state == 3) {
        clearInterval(intervalIdentifier);
        html_btn_pause.value = "Resume timer";
        timer_state = 2;
    } else if (timer_state == 2) {
        intervalIdentifier = setInterval(countdown, 1000);
        html_btn_pause.value = "Pause timer";
        timer_state = 3;
    }
}

function stopTimer() {
    clearInterval(intervalIdentifier);
    time = new_time;
    refresh();
    html_btn_pause.value = "Pause timer";
    timer_state = 1;

}

function changeMinutes() {

    if (timer_state == 1) {
        alertBox('Enter new minutes between 0-60', 'prompt', '');
    }

}

function alertBox(text, type, text) {
    html_btn_pause.disabled = true;
    html_btn_stop.disabled = true;
    html_btn_start.disabled = true;


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
            time = parseInt(document.getElementById('ptext').value);
            if (time == "" || time > 60) {
                alert("You must enter number between 0-60");
            } else {
                time = time * 60;
                new_time = time;
                refresh();
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
    html_btn_pause.disabled = false;
    html_btn_stop.disabled = false;
    html_btn_start.disabled = false;

}