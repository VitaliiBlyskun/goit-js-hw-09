import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector('.form');


form.addEventListener('submit', onFormSubmit);


function onFormSubmit(event) {
  event.preventDefault();


  let delay = Number(form.elements.delay.value);
  const step = Number(form.elements.step.value);
  const amount = Number(form.elements.amount.value);


  function createPromise(position, delay) {
      const shouldResolve = Math.random() > 0.3;
      return new Promise((resolve, reject) => {
  
      setTimeout(() => {
        if (shouldResolve) {
          resolve({ position, delay });
        } else {
          reject({ position, delay });
        }
      }, delay);
    });

  }


  for (let i = 1; i <= amount; i += 1) {
    createPromise(i, delay)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
          delay += step;
  }
}

