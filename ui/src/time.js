export function localTimeToMinSinceMidnight(time) {
  const [hh, mm] = time.split(':');
  return parseInt(hh) * 60 + parseInt(mm);
}

export function calcHoursWorked(startTime, stopTime) {
  const startMins = localTimeToMinSinceMidnight(startTime);
  const stopMins = localTimeToMinSinceMidnight(stopTime);

  let minsWorked = stopMins - startMins;
  if (minsWorked < 0) { // Acount for working past midnight (you poor soul)
    minsWorked = (stopMins + (24 * 60)) - startMins;
  }

  const hrsWorked = minsWorked / 60;
  const hrsWorkedRounded = Math.ceil(hrsWorked * 10) / 10; // round to the tenths place

  return hrsWorkedRounded;
}
