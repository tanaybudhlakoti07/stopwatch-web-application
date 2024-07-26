let startTime;
let updatedTime;
let difference = 0;
let tInterval;
let running = false;
let paused = false;
let lapCounter = 0;

const display = document.getElementById('display');
const startStopBtn = document.getElementById('startStopBtn');
const pauseBtn = document.getElementById('pauseBtn');
const lapBtn = document.getElementById('lapBtn');
const resetBtn = document.getElementById('resetBtn');
const laps = document.getElementById('laps');

function startStopwatch() {
    startTime = new Date().getTime() - difference;
    tInterval = setInterval(updateTime, 10);
    running = true;
    paused = false;
    startStopBtn.innerText = 'Stop';
    pauseBtn.innerText = 'Pause';
    pauseBtn.disabled = false;
    lapBtn.disabled = false;
    resetBtn.disabled = true;
}

function stopStopwatch() {
    clearInterval(tInterval);
    running = false;
    startStopBtn.innerText = 'Start';
    pauseBtn.disabled = true;
    lapBtn.disabled = true;
    resetBtn.disabled = false;
}

function updateTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;
    let hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((difference % (1000 * 60)) / 1000);
    let milliseconds = Math.floor((difference % 1000) / 10);

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
    milliseconds = (milliseconds < 10) ? "0" + milliseconds : milliseconds;

    display.innerText = hours + ':' + minutes + ':' + seconds + ':' + milliseconds;
}

function pauseStopwatch() {
    if (running) {
        clearInterval(tInterval);
        running = false;
        paused = true;
        pauseBtn.innerText = 'Resume';
        startStopBtn.disabled = true;
    } else {
        startStopwatch();
        pauseBtn.innerText = 'Pause';
        startStopBtn.disabled = false;
    }
}

function resetStopwatch() {
    clearInterval(tInterval);
    running = false;
    paused = false;
    difference = 0;
    startStopBtn.innerText = 'Start';
    pauseBtn.innerText = 'Pause';
    pauseBtn.disabled = true;
    lapBtn.disabled = true;
    resetBtn.disabled = false;
    display.innerText = '00:00:00:00';
    laps.innerHTML = '';
    lapCounter = 0;
}

function recordLap() {
    lapCounter++;
    const lapTime = display.innerText;
    const lapDiv = document.createElement('div');
    lapDiv.classList.add('lap');
    lapDiv.innerText = `Lap ${lapCounter}: ${lapTime}`;
    laps.appendChild(lapDiv);
}

startStopBtn.addEventListener('click', () => {
    if (!running) {
        startStopwatch();
    } else {
        stopStopwatch();
    }
});

pauseBtn.addEventListener('click', pauseStopwatch);
resetBtn.addEventListener('click', resetStopwatch);
lapBtn.addEventListener('click', recordLap);
