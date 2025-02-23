const timerElement = document.getElementById("timer");
const ctfTime =    1749258000000; // Fri 6 June 2025 9 PM EST
const ctfEndTime = 1749517200000;
let interval;
let showSeconds = window.innerWidth > 801;

function updateTime() {
    timerElement.innerHTML = formatTime((ctfTime - Date.now()) / 1000);
}

function formatTime(timeStr) {
    timeStr = Number(timeStr);
    let label = "<p class='time-info'>Competition Starts In: </p>";
    let d = Math.floor(timeStr / (60 * 60 * 24));
    let h = Math.floor(timeStr % (3600 * 24) / 3600);
    let m = Math.floor(timeStr % 3600 / 60);
    let s = Math.floor(timeStr % 60);

    let dDisplay = "<span class='val'>" + String(Math.abs(d)).padStart(2, '0') + "</span> ";
    let hDisplay = "<span class='val'>" + String(Math.abs(h)).padStart(2, '0') + "</span> ";
    let mDisplay = "<span class='val'>" + String(Math.abs(m)).padStart(2, '0') + "</span> ";
    let sDisplay = "<span class='val'>" + String(Math.abs(s)).padStart(2, '0') + "</span> ";

    return label + 
        `<div id='timer-values'>` +
        dDisplay + 
        hDisplay + 
        mDisplay + 
        (showSeconds ? sDisplay : "") +
        `</div><div id='timer-labels'>
            <label> Days</label><label> Hours</label><label> Minutes</label>` +
        (showSeconds ? "<label> Seconds</label>" : "") +
        "</div>";
}

if (Date.now() >= ctfEndTime) {
    timerElement.innerHTML = "<p class='time-info'>The event is over! See you next year!</p>";
}
else
    if (Date.now() >= ctfTime) {
        timerElement.innerHTML = "<p class='time-info'>The event has started! Good luck!</p>";
    }
    else {
        updateTime();
        interval = setInterval(updateTime, 1000);
    }

window.addEventListener('resize', function () {
    showSeconds = window.innerWidth > 801;
});
