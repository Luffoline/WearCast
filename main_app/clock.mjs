export function startClock(elementId = "clock", timezoneOffset = 0) {
  const clockEl = document.getElementById(elementId);
  if (!clockEl) return;

  function updateTime() {
    const now = new Date();

    const utc = now.getTime() + now.getTimezoneOffset() * 60000;
    
    const localTime = new Date(utc + timezoneOffset * 1000);

    const hours = String(localTime.getHours()).padStart(2, "0");
    const minutes = String(localTime.getMinutes()).padStart(2, "0");

    clockEl.textContent = `${hours}:${minutes}`;
  }

  updateTime();
  setInterval(updateTime, 1000);
}