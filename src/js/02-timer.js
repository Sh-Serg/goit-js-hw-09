import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';

import { Notify } from 'notiflix/build/notiflix-notify-aio';

const calendar = document.querySelector('#datetime-picker');

const btnStart = document.querySelector('[data-start]');
const day = document.querySelector('[data-days]');
const hour = document.querySelector('[data-hours]');
const minute = document.querySelector('[data-minutes]');
const second = document.querySelector('[data-seconds]');

let intervalId = null;

btnStart.classList.add('btn');
btnStart.setAttribute('disabled', '');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0] - Date.now());
    if (selectedDates[0] <= Date.now()) {
      console.log('FALSE');
      Notify.failure('Please choose a date in the future');
    } else {
      console.log('OK');
      Notify.success('Lets go?');
      btnStart.removeAttribute('disabled');
    }
  },
};

flatpickr(calendar, options);

btnStart.addEventListener('click', getEndTime);

function getEndTime() {
  intervalId = setInterval(addValueToCounter, 1000);
  btnStart.setAttribute('disabled', 'true');
}

function addValueToCounter() {
  const time = new Date(calendar.value) - Date.now();
  const { days, hours, minutes, seconds } = convertMs(time);
  day.textContent = addLeadingZero(days);
  hour.textContent = addLeadingZero(hours);
  minute.textContent = addLeadingZero(minutes);
  second.textContent = addLeadingZero(seconds);

  if (time < 1000) {
    // console.log('STOP');
    clearInterval(intervalId);
  }

  if (days > 0) {
    console.log('red');
    day.style.color = 'red';
    hour.style.color = 'red';
    minute.style.color = 'red';
    second.style.color = 'red';
  } else if (hours > 0) {
    day.style.color = '#8c8f8f';
    hour.style.color = 'red';
    minute.style.color = 'red';
    second.style.color = 'red';
  } else if (minutes > 0) {
    day.style.color = '#8c8f8f';
    hour.style.color = '#8c8f8f';
    minute.style.color = 'red';
    second.style.color = 'red';
  } else if (seconds > 0) {
    day.style.color = '#8c8f8f';
    hour.style.color = '#8c8f8f';
    minute.style.color = '#8c8f8f';
    second.style.color = 'red';
  } else {
    day.style.color = '#8c8f8f';
    hour.style.color = '#8c8f8f';
    minute.style.color = '#8c8f8f';
    second.style.color = '#8c8f8f';
  }
}

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
  return `${value}`.padStart(2, '0');
}
