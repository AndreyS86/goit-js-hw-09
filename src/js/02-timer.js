import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

// const datetimePicker = document.getElementById("datetime-picker");
const startButton = document.querySelector("[data-start]");
const daysEl = document.querySelector("[data-days]");
const hoursEl = document.querySelector("[data-hours]");
const minutesEl = document.querySelector("[data-minutes]");
const secondsEl = document.querySelector("[data-seconds]");

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    if (selectedDate > new Date()) {
      startButton.removeAttribute("disabled");
      localStorage.setItem("countdownStartTime", selectedDate);
      updateTimer();
    } else {
      window.alert("Please choose a date in the future");
      startButton.setAttribute("disabled", true);
    }
  },
};

flatpickr("#datetime-picker", options);

function addLeadingZero(value) {
  return value < 10 ? `0${value}` : value;
}

let countdownInterval;

function startTimer() {
  clearInterval(countdownInterval);
  const countdownStartTime = localStorage.getItem("countdownStartTime");
  if (countdownStartTime) {
    const selectedDate = new Date(countdownStartTime).getTime();
    const currentDate = new Date().getTime();
    const timeRemaining = selectedDate - currentDate;

    if (timeRemaining > 0) {
      countdownInterval = setInterval(updateTimer, 1000);
    } else {
      localStorage.removeItem("countdownStartTime");
      startButton.setAttribute("disabled", true);
    }

    updateTimer();
  }
}

function updateTimer() {
  const countdownStartTime = localStorage.getItem("countdownStartTime");
  if (!countdownStartTime) {
    return;
  }

  const selectedDate = new Date(countdownStartTime).getTime();
  const currentDate = new Date().getTime();
  const timeRemaining = selectedDate - currentDate;

  if (timeRemaining <= 0) {
    clearInterval(countdownInterval);
    startButton.setAttribute("disabled", true);
    localStorage.removeItem("countdownStartTime");
    return;
  }

  const { days, hours, minutes, seconds } = convertMs(timeRemaining);
  daysEl.textContent = addLeadingZero(days);
  hoursEl.textContent = addLeadingZero(hours);
  minutesEl.textContent = addLeadingZero(minutes);
  secondsEl.textContent = addLeadingZero(seconds);
}

startButton.addEventListener("click", startTimer);

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

startTimer();