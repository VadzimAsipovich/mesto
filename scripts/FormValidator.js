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

  _setEventListeners() {
    this._inputList = Array.from(
      this._form.querySelectorAll(this._formInputClass)
    );
    const buttonElement = this._form.querySelector(this._formSaveButt);

    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._isValid(inputElement);
        this._toggleButtonState(this._inputList, buttonElement);
      });
    });
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._inputElementErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorElementErrorClass);
  }

  _hideInputError(inputElement) {
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._inputElementErrorClass);
    errorElement.classList.remove(this._errorElementErrorClass);
    errorElement.textContent = "";
  }

  _isValid(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(
        inputElement,
        inputElement.validationMessage
      );
    } else {
      this._hideInputError(inputElement);
    }
  }

  enableValidation() {
    this._setEventListeners(this._form);
  }
}
