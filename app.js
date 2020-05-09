const FORM = document.getElementById("calcTime");
const START_INPUT = document.getElementById("start");
const STOP_INPUT = document.getElementById("stop");
const COMMENT_INPUT = document.getElementById("comment");
const LOG = document.getElementById("log");
const TIME_BY_COMMENT_TABLE = document.getElementById("timeByComment");

let totalTime = 0;
let timeByComment = {};

function init() {
  updateTotalTime(0);
  document.getElementById("today").textContent = new Date().toDateString();
}

function calcTime(start, stop) {
  return Math.ceil(Math.abs(stop - start) / (60 * 60 * 1000) * 10) / 10;
}

function formatTime(time) {
  return time.toFixed(1);
}

function updateTotalTime(time) {
  totalTime += time;
  document.getElementById("totalTime").textContent = `Total Time: ${formatTime(totalTime)}`;
}

function updateTimeByComment(time, comment) {
  if (comment in timeByComment === false) {
    timeByComment[comment] = time;

    const tr = document.createElement("tr");
    const label = document.createElement("td");
    const total = document.createElement("td");

    label.textContent = comment;
    total.id = comment;
    total.textContent = formatTime(time);

    tr.appendChild(label);
    tr.appendChild(total);

    TIME_BY_COMMENT_TABLE.appendChild(tr);
  }
  else {
    timeByComment[comment] += time;
    document.getElementById(comment).textContent = formatTime(timeByComment[comment]);
  }
}

function updateLog(start, stop, time, comment) {
  const entry = document.createElement("tr");
  const startTd = document.createElement("td")
  const stopTd = document.createElement("td");
  const timeTd = document.createElement("td");
  const commentTd = document.createElement("td");

  startTd.textContent = start;
  stopTd.textContent = stop;
  timeTd.textContent = time;
  commentTd.textContent = comment;

  entry.appendChild(startTd)
  entry.appendChild(stopTd)
  entry.appendChild(timeTd)
  entry.appendChild(commentTd)
  LOG.appendChild(entry);
}

FORM.addEventListener("submit", e => {
  e.preventDefault();

  const startTime = START_INPUT.valueAsNumber;
  const stopTime = STOP_INPUT.valueAsNumber;

  if (isNaN(startTime) || isNaN(stopTime)) {
    return;
  }

  const timeWorked = calcTime(startTime, stopTime);
  const comment = COMMENT_INPUT.value;

  updateLog(
    START_INPUT.value,
    STOP_INPUT.value,
    timeWorked,
    comment
  );
  updateTotalTime(timeWorked);
  updateTimeByComment(timeWorked, comment);

  FORM.reset();
  START_INPUT.focus();

  return true;
});
