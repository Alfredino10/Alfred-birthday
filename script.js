'use strict';
const bDayWish = document.querySelector('.birthday');
const bdaySection = document.querySelector('.bday-section');
const displayTimeLeft = document.querySelector('.remaining-time');
const displayDays = document.querySelector('.days');
const displayHours = document.querySelector('.hours');
const displayMinutes = document.querySelector('.minutes');
const bLoad = document.querySelector('.bload');
const displaySeconds = document.querySelector('.seconds');

const userInputWrapper = document.querySelector('.user-input-wrapper');
const firstNameInput = document.querySelector('#first-name');
const lastNameInput = document.querySelector('#last-name');
const checker = document.querySelector('.checker');
const alertBox = document.querySelector('.alert-msg');
const messageToDisplay = document.querySelector('.user-message');

const treatBtn = document.querySelector('.treat-btn');
const treatWrapper = document.querySelector('.treat-wrapper');
const textArea = document.querySelector('#text-message');
const sendTreatBtn = document.querySelector('.send-treat');

const showDataFromStorageWrapper = document.querySelector('.localD');
const showDataFromStorage = document.querySelector('.localD table');
const hideData = document.querySelector('.close-page');

let userName = [];

const birth = new Date('Jul 16, 2022 00:00:00');
const birthDay = birth.getTime();

window.addEventListener('load', function () {
  userInputWrapper.classList.add('display-user-input-wrapper');
});

const num = [
  '0',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '!',
  '@',
  '#',
  '$',
  '%',
  '^',
  '&',
  '*',
  '(',
  ')',
  '_',
  '-',
  '+',
  '=',
  '[',
  '{',
  ']',
  '}',
  '\\',
  '|',
  ';',
  ':',
  '"',
  "'",
  ',',
  '<',
  '.',
  '>',
  '/',
  '?',
  '`',
  '~',
];

const validateInput = function () {
  if (firstNameInput.value === '' || lastNameInput.value === '') {
    alertBox.textContent = `Please Enter Your First and Last Name!!!`;
  } else if (firstNameInput.value !== '' && lastNameInput.value !== '') {
    const addInput = firstNameInput.value + lastNameInput.value;
    function prepareNames() {
      const trimFirstNameAndLowerCaseIt = firstNameInput.value
        .trim()
        .toLowerCase();
      const trimLastNameAndLowerCaseIt = lastNameInput.value
        .trim()
        .toLowerCase();

      const capitalizeNames =
        trimFirstNameAndLowerCaseIt.slice(0, 1).toUpperCase() +
        trimFirstNameAndLowerCaseIt.slice(1) +
        ' ' +
        trimLastNameAndLowerCaseIt.slice(0, 1).toUpperCase() +
        trimLastNameAndLowerCaseIt.slice(1);

      return capitalizeNames;
    }

    const validBox = [];

    for (let i = 0; i < num.length; i++) {
      if (addInput.includes(i)) {
        validBox.push('invalid');
      }
    }

    if (validBox.includes('invalid')) {
      alertBox.textContent =
        'Names does not contain numbers or symbols. Please enter a valid name!!';
    } else {
      document.querySelector(
        '.user-input-wrapper > div'
      ).innerHTML = `<h2 class="msg-load">Loading Message</h2> <div class="present"></div>`;

      userName = [prepareNames()];

      function removeFormAndDisplayMsg() {
        userInputWrapper.classList.remove('display-user-input-wrapper');
        messageToDisplay.textContent = `Thanks for showing up ${prepareNames()}`;
      }
      window.setTimeout(removeFormAndDisplayMsg, 5000);
    }
  }
};

checker.addEventListener('click', function () {
  validateInput();
});

const birthCount = function () {
  const currentDate = new Date().getTime();
  const timeRemaining = birthDay - currentDate;

  const days = Math.trunc(timeRemaining / (1000 * 60 * 60 * 24));
  const hours = Math.trunc(
    (timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.trunc((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.trunc((timeRemaining % (1000 * 60)) / 1000);

  displayDays.textContent = `${days}d`;
  displayHours.textContent = `${hours}h`;
  displayMinutes.textContent = `${minutes}m`;
  displaySeconds.textContent = `${seconds}s`;
  if (timeRemaining === 0) {
    bDayWish.textContent = `Happy Birthday Kernel Boy`;
    bLoad.textContent = `Today is my birthday`;
    displayDays.textContent = `July`;
    displayHours.textContent = `${birth.getDate()}`;
    displayMinutes.textContent = `${birth.getFullYear()}`;

    displaySeconds.style.display = 'none';

    clearInterval(x);
  }
};
const x = setInterval(birthCount, 1000);

treatBtn.addEventListener('click', function () {
  if (userName.join('').includes('Lekpelleh Smallman')) {
    getData();
  } else {
    treatWrapper.classList.add('display-treat-wrapper');
  }
});

sendTreatBtn.addEventListener('click', function () {
  if (textArea.value !== '') {
    window.localStorage.setItem(
      `${userName.join('')}`,
      JSON.stringify(textArea.value)
    );

    document.querySelector(
      '.treat-wrapper > div'
    ).innerHTML = `<h3 class="msg-load">Thanks for the time ${userName.join(
      ''
    )}. It was nice having you around</h3> <p class="msg-load">Please Wait few Seconds to clear this message</p> <div class="present"></div>`;

    setTimeout(function () {
      treatWrapper.classList.remove('display-treat-wrapper');
    }, 8000);
    treatBtn.disabled = true;
    treatBtn.style.opacity = '0.4';
    document.querySelector('.btn-disable').textContent =
      'You have submitted a message✔';
  } else {
    document.querySelector('.alert-msg2').textContent =
      'Please enter a message!!';
  }
});

function getData() {
  const localData = localStorage;

  for (const [key, value] of Object.entries(localData)) {
    const listOfData = document.createElement('tr');
    showDataFromStorage.append(listOfData);
    listOfData.innerHTML = `<th>${key}</th> <td>${value}</td>`;
  }
  showDataFromStorageWrapper.classList.add('display-localD');
}

hideData.addEventListener('click', function () {
  showDataFromStorageWrapper.classList.remove('display-localD');
  showDataFromStorage.innerHTML = '';
});
