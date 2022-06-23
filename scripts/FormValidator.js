export default class FormValidator {
  constructor(parameters, form) {
    this._formSaveButtInactive = parameters.formSaveButtInactive;
    this._formInputClass = parameters.formInputClass;
    this._formSaveButt = parameters.formSaveButt;
    this._inputElementErrorClass = parameters.inputElementErrorClass;
    this._errorElementErrorClass = parameters.errorElementErrorClass;
    this._formClass = parameters.formClass;
    this._form = form;
  }

  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _toggleButtonState(inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(this._formSaveButtInactive);
      buttonElement.disabled = true;
    } else {
      buttonElement.classList.remove(this._formSaveButtInactive);
      buttonElement.disabled = false;
    }
  }

  _setEventListeners(formElement) {
    const inputList = Array.from(
      formElement.querySelectorAll(this._formInputClass)
    );
    const buttonElement = formElement.querySelector(this._formSaveButt);

    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._isValid(formElement, inputElement);
        this._toggleButtonState(inputList, buttonElement);
      });
    });
  }

  _showInputError(formElement, inputElement, errorMessage) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._inputElementErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorElementErrorClass);
  }

  _hideInputError(formElement, inputElement) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._inputElementErrorClass);
    errorElement.classList.remove(this._errorElementErrorClass);
    errorElement.textContent = "";
  }

  _isValid(formElement, inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(
        formElement,
        inputElement,
        inputElement.validationMessage
      );
    } else {
      this._hideInputError(formElement, inputElement);
    }
  }

  enableValidation() {
    this._setEventListeners(this._form);
  }
}
