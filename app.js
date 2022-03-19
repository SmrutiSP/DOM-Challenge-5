const progressBar = document.querySelector(".progress-bar");
const runBtn = document.querySelector(".run-button");
const waitingQueue = document.querySelector(".waiting-queue");
let isRunning = false;
let indexOfProgressBar = 0;
let cache = [];

runBtn.addEventListener("click", cacheUtility);


function cacheUtility() {
    indexOfProgressBar++;
    if (isRunning) {
        cache.push(indexOfProgressBar);
        updateWaitingQueue(cache)
    } else {
        updateRunBtn(indexOfProgressBar);
      initiateProgressBar();
    }
}

function initiateProgressBar() {
    isRunning = true;
    setTimeout(() => {
        isRunning = false;
        if (cache.length) {
            updateRunBtn(cache.shift());
            updateWaitingQueue(cache)
            initiateProgressBar();
        }
    }, 4000);
    startProgressBar();
}

function startProgressBar() {
    const div = document.createElement("div");
    div.classList.add("progress");
    progressBar.innerHTML = "";
    progressBar.appendChild(div);
}

function updateRunBtn(progressBarIndex) {
    runBtn.textContent='Run';
    runBtn.textContent+=' '+ progressBarIndex;
}

function updateWaitingQueue(cache) {
    waitingQueue.innerHTML = '';
    waitingQueue.textContent = `Waiting Queue is ${JSON.stringify(cache)}`;
}