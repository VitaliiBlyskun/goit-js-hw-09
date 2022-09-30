// Описаний в документації
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';


const refs = {
  startBtn: document.querySelector(`button[data-start]`),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

refs.startBtn.disabled = true;

flatpickr('input#datetime-picker', {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    console.log(selectedDates[0]);

    const delta = selectedDates[0].getTime() - Date.now();

    if (delta <= 0) {
      Notify.failure('Please choose a date in the future', {
        position: 'center-center',
        backOverlay: true,
        clickToClose: true,
      });
      return;
    }
    Notify.success('The selected date is valid');
    refs.startBtn.disabled = false;

    refs.startBtn.addEventListener('click', onTimerStartClick);

    function onTimerStartClick() {
      this.defaultDate = setInterval(() => {
        const ms = selectedDates[0].getTime() - Date.now();

        if (ms <= 1000) {
          clearInterval(this.defaultDate);
          Notify.success('Astalavista, baby!!!', {backOverlay: true});
        }

        const data = convertMs(ms);

        Object.entries(data).forEach(([name, value]) => {
          refs[name].textContent = addLeadingZero(value);
        })

        // refs.days.textContent = addLeadingZero(data.days);
        // refs.hours.textContent = addLeadingZero(data.hours);
        // refs.minutes.textContent = addLeadingZero(data.minutes);
        // refs.seconds.textContent = addLeadingZero(data.seconds);
      }, 1000);
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
      return String(value).padStart(2, '0');
    }
  },
});
