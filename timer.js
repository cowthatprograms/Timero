onload = function() {
  titleNode = document.querySelector('title');
  timeNode = document.querySelector('#time');
  totalNode = document.querySelector('#total-time');
  focusedNode = document.querySelector('#focused-time');
  breakNode = document.querySelector('#break-time');
  wastedNode = document.querySelector('#wasted-time');
  setInterval(() => {
    tick();
    timeNode.innerHTML = String(minutes) + (seconds < 10 ? ':0' : ':') + String(seconds);
    titleNode.innerHTML = String(minutes) + (seconds < 10 ? ':0' : ':') + String(seconds);
    
    totalNode.innerHTML = 'Total Time: ' + String(Math.floor(totalTime / 60)) + (totalTime % 60 < 10 ? ':0' : ':') + String(totalTime % 60);
    focusedNode.innerHTML = 'Focused Time: ' + String(Math.floor(focusedTime / 60)) + (focusedTime % 60 < 10 ? ':0' : ':') + String(focusedTime % 60);
    breakNode.innerHTML = 'Break Time: ' + String(Math.floor(breakTime / 60)) + (breakTime % 60 < 10 ? ':0' : ':') + String(breakTime % 60);
    wastedNode.innerHTML = 'Wasted Time: ' +String(Math.floor(wastedTime / 60)) + (wastedTime % 60 < 10 ? ':0' : ':') + String(wastedTime % 60);
  }, 1000);

  let quoteNode = document.querySelector('#quote');
  
  // quotes
  const quotes = [
    "Lack of direction, not lack of time, is the problem. We all have twenty-four hour days.",
    "The bad news is time flies. The good news is you're the pilot",
    "Tomorrow is often the busiest day of the week.",
    "Procrastination is the art of keeping up with yesterday and avoiding today.",
    "You may delay, but time will not.",
    "A plan is what, a schedule is when. It takes both a plan and a schedule to get things done.",
    "A man who dares to waste one hour of life has not discovered the value of life."
  ];
  const quote = quotes[Math.floor(Math.random() * quotes.length)];
  quoteNode.innerHTML = '"' + quote + '"';

  reloadTasks();
}

let mode = 'focused';
let totalTime = 0; // always runs
let focusedTime = 0; // when focused
let breakTime = 0; // when on break
let wastedTime = 0; // when not focused nor on break

let minutes = 25;
let seconds = 0;
let ticking = false;

function tick() {
  totalTime++;
  if (ticking) {
    if (seconds != 0) {
      seconds--;
    } else {
      if (minutes == 0) {
        stopTimer();
      } else {
        minutes--;
        seconds = 59;
      }
    }
    if (mode == 'focused') {
      focusedTime++;
    } else {
      breakTime++;
    }
  } else {
    wastedTime++;
  }
}

function startTimer() {
  ticking = true;
}

function pauseTimer() {
  ticking = false;
}

function focusMode() {
  mode = 'focused';
  minutes = 25;
  seconds = 0;
  ticking = false;
}

function breakMode() {
  mode = 'break';
  minutes = 5;
  seconds = 0;
  ticking = false;
}