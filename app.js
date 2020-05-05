  const FORM = document.getElementById("calcTime");
  const START_INPUT = document.getElementById("start");
  const STOP_INPUT = document.getElementById("stop");
  const COMMENT_INPUT = document.getElementById("comment");
  const LOG = document.getElementById("log");

  let totalTime = 0;

  function init() {
    updateTotalTime(0);
    document.getElementById("today").textContent = new Date().toDateString();
  }

  function calcTime(start, stop) {
    return Math.ceil(Math.abs(stop - start) / (60 * 60 * 1000) * 10) / 10;
  }

  function updateTotalTime(time) {
    totalTime += time;
    document.getElementById("totalTime").textContent = `Total Time: ${totalTime.toFixed(1)}`;

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

    updateLog(
      START_INPUT.value,
      STOP_INPUT.value,
      timeWorked,
      COMMENT_INPUT.value
    );
    updateTotalTime(timeWorked);

    FORM.reset();
    START_INPUT.focus();

    return true;
  });
