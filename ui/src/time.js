export function getCurrentTimeMs() {
  const date = new Date();
  const minutes = (date.getHours() * 60) + date.getMinutes();
  const ms = minutes * 60 * 1000;
  return ms;
}

export function msToTime(ms) {
  let hrs = ms / 1000 / 60 / 60;
  let mins = Math.floor((hrs % 1) * 60);

  hrs = Math.floor(hrs);
  hrs = hrs < 10 ? "0" + hrs.toString() : hrs;
  mins = mins < 10 ? "0" + mins.toString() : mins;
  return `${hrs}:${mins}`;
}

