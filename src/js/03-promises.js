import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector('form.form');
const optionsNotify = {
  position: 'right-top',
  distance: '25px',
  borderRadius: '15px',
  timeout: 5000,
  clickToClose: true,
};

form.addEventListener('submit', onPromiseCreate);

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

function onPromiseCreate(e) {
  e.preventDefault();
  const { delay, step, amount } = e.currentTarget.elements;
  let inputDelay = Number(delay.value);
  let inputStep = Number(step.value);
  let inputAmount = Number(amount.value);

  for (let i = 0; i < inputAmount; i += 1) {
    const delays = inputDelay + inputStep * i;
    // console.log(delays);
    createPromise(i, delays)
      .then(({ position, delay }) => {
        Notify.success(
          `Fulfilled promise ${position} in ${delay}ms`,
          optionsNotify
        );
      })
      .catch(({ position, delay }) => {
        Notify.failure(
          `Rejected promise ${position} in ${delay}ms`,
          optionsNotify
        );
      });
    e.currentTarget.reset();
  }
}
