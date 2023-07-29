import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const btnStart = document.querySelector('button[data-start="Start"]');
const daysEl = document.querySelector('span[data-days="00"]');
const hoursEl = document.querySelector('button[data-hours="00"]');
const minEl = document.querySelector('button[data-minutes="00"]');
const secondsEl = document.querySelector('button[data-seconds="00"]');
let timerId = null;

// btnStart.disabled = true;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  noClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      alert('Please choosea date un the future');
    } else {
      btnStart.disabled = false;
      btnStart.addEventListener('click', onStartClick);
    }
  },
}; 
flatpickr('#dayetime-picker', options);

function onStartClick() {
    const selectDates = flatpickr.parseDate(
        document.querySelector('#datetime-picker').value
    );
    const currentTime = new Date();
    const difference = selectDates - currentTime;
    if (difference <= 0) {
        alert('Please choosea date un the future');
        return;
    }
clearInterval(timerId);
timerId = setInterval(() => {
    const remainingTime = convertVs(selectDates - new Date());
    daysEl.textContent = addLeadingZero(remainingTime.days);
    hoursEl.textContent = addLeadingZero(remainingTime.hours);
    minEl.textContent = addLeadingZero(remainingTime.minutes);
    secondsEl.textContent = addLeadingZero(remainingTime.seconds);
    if (
        remainingTime.days === 0 &&
        remainingTime.minutes === 0 &&
        remainingTime.hours === 0 &&
        remainingTime.seconds === 0
    ) {
        clearInterval(timerId);
    }
 }, 1000)
};

function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  
    return { days, hours, minutes, seconds };
  }

  function addLeadingZero(value) {
    return String(value).padStart(2, '0')
  }
