"use strict";


// инициализация DOM элементов 

const fullName = document.querySelector(".full-name input");
const mailInp = document.querySelector(".mail input");
const errorBlocksLoginPage = document.querySelectorAll('.error-login-page');
const userName = document.querySelector(".username input");
const check = document.getElementById("check");
const inputs = document.querySelectorAll(
  ".form div input:not(#check):not(#btn)"
);
const passwordInp = document.querySelector(".password input");
const passwordReapetInp = document.querySelector(".password-repeat input");
const popap = document.getElementById("popap");
const btn = document.getElementById("btn");
const agreeLink = document.querySelector(".already-have-account a");
let clients;
// создание блоков для вывода error message
const parentBlocksDiv = document.querySelectorAll('.form div:not(.agreement):not(.button):not(.password-repeat)');

for(let elem of [...parentBlocksDiv]) {
let divError = document.createElement('div');
divError.classList.add('valid-error');
elem.appendChild(divError)
}
const errorBlocks = document.querySelectorAll('.valid-error');


// функция установки ошибки
function setError(element, errorIndex, message) {
  element.classList.add('input-error');
  errorBlocks[errorIndex].style.display = 'block';
  errorBlocks[errorIndex].textContent = message;
}
// функция удаление ошибки
function clearError(element, errorIndex) {
  element.classList.remove('input-error');
  errorBlocks[errorIndex].style.display = 'none';
  errorBlocks[errorIndex].textContent = '';
}
// валидация поля FULL NAME
function noDigits(event) {
  if ("1234567890".includes(event.key)) {
    event.preventDefault();
  }
 
}
function isValidFullName(){
  let regExp = /^[A-ZА-ЯЁ][a-zа-яё]+\s[A-ZА-ЯЁ][a-zа-яё]+$/;
  if(!regExp.test(fullName.value)) {
   setError(fullName, 0, 'Full Name может содержать только буквы и пробел и начинаться с заглавной буквы');
                      
   } else {
    clearError(fullName, 0);
  }
}

fullName.addEventListener("keydown", noDigits);
fullName.addEventListener('blur', isValidFullName);

// валидация поля UserName


function noPunctMarks(event) {
  let regExp = /[\.,;:]+/g;
  if (regExp.test(event.key)) {
    event.preventDefault();
  }
}

function isValidUserName() {
  let regExp = /^[\w\d _-]+$/i;
  if(!regExp.test(userName.value)) {
   setError(userName, 1,'username может содержать только латинские буквы, цифры, символ подчеркивания и тире');
  }else {
 clearError(userName, 1);
  }

}
userName.addEventListener("keydown", noPunctMarks);
userName.addEventListener('blur', isValidUserName);

// валидация поля EMAIL

function isValidEmail() {
  let regExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
   if (!regExp.test(mailInp.value)) {
setError(mailInp, 2, 'Адрес электронной почты не является валидным');
  } else {
  clearError(mailInp,2);
}
}
mailInp.addEventListener("blur", isValidEmail);

// валидация полей пароля
function isValidPassword(){
  let regExp =  /^(?=.*[A-Z]+)(?=.*[0-9]+)(?=.*[\W_]+).{8,}$/;
   if (!regExp.test(passwordInp.value)) {
setError(passwordInp, 3, 'Пароль должен содержать - хотя бы одна буква в верхнем регистре, хотя бы одна цифра, хотя бы один спецсимвол');
 } else {
 clearError(passwordInp, 3);
}
}
passwordInp.addEventListener('blur', isValidPassword);

const passwordHide = document.getElementById('password-hide');
const passwordView = document.getElementById('password-view');

// 
// функция просмотра пароля Добавляем обработчик события на ссылку
passwordHide.addEventListener('click', showParole);
passwordView.addEventListener('click', showParole);
function showParole(event) {
  event.preventDefault();
  
  if ( passwordInp.type === 'password') {
      passwordInp.type = 'text';
      passwordHide.style.display = 'none';
      passwordView.style.display = 'inline-block';
   } else {
    passwordInp.type = 'password';
    passwordView.style.display = 'none';
    passwordHide.style.display = 'inline-block';
  }
}




check.addEventListener("change", function (e) {
  if (e.target.checked) {
    console.log("Согласен");
  } else {
    console.log("Не согласен");
  }
});

// 5



// _____________________проверка успешно заполненной формы и вызов попаппа
function checkForSuccess(event) {

  event.preventDefault();
  let allConditions = true;

  inputs.forEach((input) => {
    let inpVal = input.value;
    let prompt = input.previousElementSibling.textContent;
    if (!inpVal) {
      alert(`Заполните поле ${prompt}.`);
      allConditions = false;
    }
  });


  if (passwordInp.value !== passwordReapetInp.value) {
    alert("Пароли не совпадают!");
    allConditions = false;
  }

  if (!check.checked) {
    alert("Не получено согласие с нашими условиями!");
    allConditions = false;
  }

  if (allConditions) {
    popap.style.transform = "translateY(0)";

    let close = document.querySelector(".close");
    close.addEventListener("click", closePopap);
    let btnPopap = document.getElementById("btn-in-popap");
    btnPopap.addEventListener("click", getLoginPage);
    // запись данных пользователя в объект LocaleStorage после проверки валидации полей инпутов
let user = {
  name: fullName.value,
  email: mailInp.value,
  userName: userName.value,
  password: passwordInp.value
}

clients = JSON.parse(localStorage.getItem('clients')) || [];
clients.push(user);
localStorage.setItem('clients', JSON.stringify(clients));
  }

  
}
//кнопки навешено событие проверки валидации и вызов попаппа и запись в LocaleStorage
btn.addEventListener("click", checkForSuccess);



// -------------------функция закрывающая попапп
function closePopap() {
  popap.style.transform = "translateY(-100%)";
}

// ----------------функция имитация перехода на страницу логина
function getLoginPage() {
  closePopap();
  check.checked = false;
  inputs.forEach((input) => {
    input.value = "";
    let inpName = input.parentElement.className;
    if (
      inpName === "full-name" ||
      inpName === "mail" ||
      inpName === "password-repeat"
    ) {
      input.parentElement.remove();
    }
  });
  // удаляем событие с оставшихся инпутов
  userName.removeEventListener('blur', isValidUserName);
  passwordInp.removeEventListener('blur', isValidPassword);

  const title = document.querySelector(".content-left__title");
  title.innerHTML = "Log in to the system";
  document.querySelector(".agreement").remove();
  agreeLink.textContent = 'Registration';
  agreeLink.style.paddingLeft = '183px'
  agreeLink.addEventListener('click',function(){
    window.location.reload(); 
  })


  btn.removeEventListener("click", checkForSuccess);
  btn.addEventListener("click", isValidEnter);
}

agreeLink.addEventListener("click", getLoginPage);

// -------------функция проверки инпутов на странице Входа--
function isValidLoginPageInput() {

if (!userName.value) {

setError(userName, 1, 'Заполните поле');
} else {
clearError(userName,1);
}
if (!passwordInp.value) { 

setError(passwordInp, 3, 'Заполните поле');
}else {
  clearError(passwordInp, 3);
}


}

// проверка имени и пороля пользователя на странице входа

function isValidEnter() {
  isValidLoginPageInput();

  let userNameValue = userName.value;
  let passwordValue = passwordInp.value;
  let isValidUser = false;
 let userFullName;// пустая пременная она понесет имя юзера в другую функцию
  if (userNameValue && passwordValue) {
    clients = JSON.parse(localStorage.getItem('clients')) || [];

      for (let obj of clients) {
          if (obj.userName === userNameValue) {
              if (obj.password === passwordValue) {
                userFullName = obj.name; //здесь когда все условия совпадут в переменную запишется имя юзера
                  isValidUser = true;
                  break;
              } else {
             setError(passwordInp, 3,'Неверный пароль');
                  return;
              }
          }
      }

      if (!isValidUser) {
        
setError(userName, 1, 'Такой пользователь не зарегистрирован')
      } else {
                btn.removeEventListener('click', isValidEnter);
          btn.addEventListener('click', logInPersonalAccount(userFullName));
      }
  }
}

// код перехода в личный кабинет
function logInPersonalAccount(userFullName) {
  // Находим элементы на странице
  const title = document.querySelector('.content-left__title');
  const contentText = document.querySelector('.content-left__text');
  const username = document.querySelector('.username');
  const password = document.querySelector('.password');
  const alreadyHaveAccount = document.querySelector('.already-have-account');

  // Изменяем текст и удаляем элементы
  title.textContent = `Welcome, ${userFullName}`;
  btn.value = 'Exit';
  contentText.remove();
  username.remove();
  password.remove();
  alreadyHaveAccount.remove();

  // Удаляем обработчик события и добавляем новый
  btn.removeEventListener('click', logInPersonalAccount);
  btn.addEventListener('click', function(e){
      e.preventDefault();
      location.reload();
  });
}




// localStorage.clear();
