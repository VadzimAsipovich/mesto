
const enableValidation = (selectorObject) => {

  const hasInvalidInput = (inputList) => {
    // проходим по этому массиву методом some
    return inputList.some((inputElement) => {
      // Если поле не валидно, колбэк вернёт true
      // Обход массива прекратится и вся функция
      // hasInvalidInput вернёт true
      return !inputElement.validity.valid;
    })
  };
// Функция принимает массив полей ввода
// и элемент кнопки, состояние которой нужно менять

const toggleButtonState = (inputList, buttonElement) => {
    // Если есть хотя бы один невалидный инпут
    if (hasInvalidInput(inputList)) {
      // сделай кнопку неактивной
      buttonElement.classList.add(selectorObject.formSaveButtInactive);
    } else {
      // иначе сделай кнопку активной
      buttonElement.classList.remove(selectorObject.formSaveButtInactive);
    }
  }; 
  
  const setEventListeners = (formElement) => {
    // Находим все поля внутри формы,
    // сделаем из них массив методом Array.from
    const inputList = Array.from(formElement.querySelectorAll(selectorObject.formInputClass));
    const buttonElement = formElement.querySelector(selectorObject.formSaveButt);
    if(formElement.id === "location_popup-form"){
      toggleButtonState(inputList, buttonElement);
    }
    // Обойдём все элементы полученной коллекции
    inputList.forEach((inputElement) => {
      // каждому полю добавим обработчик события input
      inputElement.addEventListener('input', () => {
        // Внутри колбэка вызовем isValid,
        // передав ей форму и проверяемый элемент
        isValid(formElement, inputElement);
        toggleButtonState(inputList, buttonElement);
      });
    });
  }; 
  
  const showInputError = (formElement, inputElement, errorMessage) => {
    // Находим элемент ошибки внутри самой функции
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    // Остальной код такой же
    inputElement.classList.add(selectorObject.inputElementErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(selectorObject.errorElementErrorClass);
  };
  
  const hideInputError = (formElement, inputElement) => {
    // Находим элемент ошибки
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    // Остальной код такой же
    inputElement.classList.remove(selectorObject.inputElementErrorClass);
    errorElement.classList.remove(selectorObject.errorElementErrorClass);
    errorElement.textContent = '&nbsp;';
  }; 
  // Функция, которая проверяет валидность поля
  const isValid = (formElement, inputElement) => {
    if (!inputElement.validity.valid) {
      // showInputError теперь получает параметром форму, в которой
      // находится проверяемое поле, и само это поле
      showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
      // hideInputError теперь получает параметром форму, в которой
      // находится проверяемое поле, и само это поле
      hideInputError(formElement, inputElement);
    }
  }; 
    // Найдём все формы с указанным классом в DOM,
    // сделаем из них массив методом Array.from
    const formList = Array.from(document.querySelectorAll(selectorObject.formClass));
  
    // Переберём полученную коллекцию
    formList.forEach((formElement) => {
      formElement.addEventListener('submit', (evt) => {
        // У каждой формы отменим стандартное поведение
        evt.preventDefault();
      });
  
      // Для каждой формы вызовем функцию setEventListeners,
      // передав ей элемент формы
      setEventListeners(formElement);
    });
  };
  