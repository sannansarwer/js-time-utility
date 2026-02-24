// Clock Elements
const clockCountry = document.getElementById("clockCountry");
const clockTime = document.getElementById("clockTime");
const clockDate = document.getElementById("clockDate");

// Alarm Elements
const alarmTime = document.getElementById("alarmTime");
const alarmDate = document.getElementById("alarmDate");
const setAlarmBtn = document.getElementById("setAlarmBtn");

//Stopwatch Elements
const stopwatchDate = document.getElementById("stopwatchDate");
const stopwatchTime = document.getElementById("stopwatchTime");
const startStopwatchBtn = document.getElementById("startStopwatchBtn");
const stopWatchBtn = document.getElementById("stopWatchBtn");
const resetStopwatchBtn = document.getElementById("resetStopwatchBtn");

//Settings Elements
const darkModeSwitch = document.getElementById("darkModeSwitch");
const digitalFontSwitch = document.getElementById("digitalFontSwitch");
const hideDateSwitch = document.getElementById("hideDateSwitch");

// Define Local Time & Date 
// local Time 
const optionsTime = {

    timeZone : "Asia/karachi",
    hour : "2-digit",
    minute : "2-digit",
    second : "2-digit",
    hour12 : true

}

// local Date
const optionsDate = {

    timeZone : "Asia/karachi",
    day : "2-digit",
    month : "short",
    year : "numeric"

}

// Clock Functionality*
// Country Name
clockCountry.textContent = "Pakistan - Lahore";

// Function update time & date
const updateClock = () => {

    const now = new Date();

    const currentTime = now.toLocaleTimeString("en-US",optionsTime);
    const currentDate = now.toLocaleDateString("en-US",optionsDate);

    // Push values to HTML
    clockTime.textContent = currentTime;
    clockDate.textContent = currentDate;

}

// Update every second
setInterval(updateClock,1000);

// Run immediately on load
updateClock();


// Alarm Functionality*
// Function update time & date
const updateAlarmClock = () => {

    const now = new Date();

    const currentTime = now.toLocaleTimeString("en-US",optionsTime);
    const currentDate = now.toLocaleDateString("en-US",optionsDate);

    // Push values to HTML
    alarmTime.textContent = currentTime;
    alarmDate.textContent = currentDate;

}

// Update every second
setInterval(updateAlarmClock,1000);

// Run immediately on load
updateAlarmClock();

// Set Alarm Functionality
// Store the set alarm time
let alarmTimeValue = null;

// Click event set alarm
setAlarmBtn.addEventListener("click", () => {

    const userTime = prompt("Enter Alarm Time (e.g., 07:30 PM):");

    if(userTime) {
        alarmTimeValue = userTime.trim();
        alert(`Alarm set for ${alarmTimeValue}`);
    }

});

// Function check alarm every second
const alarmCheck = () => {

    if(!alarmTimeValue) return; // no alarm set

    const now = new Date();
    const currentTime = now.toLocaleTimeString("en-US", {
        ...optionsTime,
        second: undefined // remove seconds
    });

    if(currentTime === alarmTimeValue){
        
        alert("⏰ Alarm! Time reached: " + alarmTimeValue);

        // Reset alarm so it doesn't repeat
        alarmTimeValue = null;
    }

};

// Check alarm every second
setInterval(alarmCheck, 1000);


// Stopwatch Functionallity*
// High-accuracy timestamp variables
let startTime = 0;          // When stopwatch started
let elapsedTime = 0;        // Total time accumulated (ms)
let stopwatchRunning = false;
let stopwatchIntervalId = null;


// Format time into MM:SS.ms
const formatTime = (ms) => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, "0");
    const seconds = String(totalSeconds % 60).padStart(2, "0");
    const milli = String(Math.floor((ms % 1000) / 10)).padStart(2, "0");
    return `${minutes}:${seconds}.${milli}`;
};


// Live stopwatch update loop
const updateStopwatchDisplay = () => {
    const now = performance.now();
    const currentElapsed = elapsedTime + (now - startTime);
    stopwatchTime.textContent = formatTime(currentElapsed);
};


// START button
startStopwatchBtn.addEventListener("click", () => {
    if (!stopwatchRunning) {
        startTime = performance.now(); // capture precise start timestamp
        stopwatchIntervalId = setInterval(updateStopwatchDisplay, 10); // 10ms refresh
        stopwatchRunning = true;
    }
});


// STOP button
stopWatchBtn.addEventListener("click", () => {
    if (stopwatchRunning) {
        const now = performance.now();
        elapsedTime += (now - startTime); // accumulate total time
        clearInterval(stopwatchIntervalId);
        stopwatchRunning = false;
    }
});


// RESUME button
resumeStopwatchBtn.addEventListener("click", () => {
    if (!stopwatchRunning && elapsedTime > 0) {
        startTime = performance.now();
        stopwatchIntervalId = setInterval(updateStopwatchDisplay, 10);
        stopwatchRunning = true;
    }
});


// RESET button
resetStopwatchBtn.addEventListener("click", () => {
    clearInterval(stopwatchIntervalId);
    stopwatchRunning = false;
    elapsedTime = 0;
    stopwatchTime.textContent = "00:00.00";
});

// Function to update stopwatch date
const updateStopwatchDate = () =>{

    const now = new Date();
    const currentDate = now.toLocaleDateString("en-US",optionsDate);
    stopwatchDate.textContent = currentDate;

}

// Update every second
setInterval(updateStopwatchDate,1000);

// Run immediately on load
updateStopwatchDate();


//Settings Functionallity*
//Dark Mode
darkModeSwitch.addEventListener("change", () =>{
    document.body.classList.toggle("dark-mode",darkModeSwitch.checked);
})

//Digital Font
digitalFontSwitch.addEventListener("change", () => {
    const textElements = document.querySelectorAll(
        "#clockTime, #clockDate, #clockCountry, #alarmTime, #alarmDate, #stopwatchTime, #stopwatchDate"
    );

    textElements.forEach(el => {
        if (digitalFontSwitch.checked) {
            el.classList.add("digital-font");
        } else {
            el.classList.remove("digital-font");
        }
    });
});

//Hide Date
hideDateSwitch.addEventListener("change", () => {
    document.body.classList.toggle("hide-dates", hideDateSwitch.checked);
});