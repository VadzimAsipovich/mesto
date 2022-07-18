export default class FormValidator {

  constructor(parameters, form) {
    this._formSaveButtonInactive = parameters.formSaveButtonInactive;
    this._formInputClass = parameters.formInputClass;
    this._formSaveButton = parameters.formSaveButton;
    this._inputElementErrorClass = parameters.inputElementErrorClass;
    this._errorElementErrorClass = parameters.errorElementErrorClass;
    this._formClass = parameters.formClass;
    this._form = form;
    this._inputList = Array.from(
      this._form.querySelectorAll(this._formInputClass)
    );
    this._buttonElement = this._form.querySelector(this._formSaveButton);
  }

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  setButtonInactive(){
    this._buttonElement.classList.add(this._formSaveButtonInactive);
    this._buttonElement.disabled = true;
  }
  
  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this.setButtonInactive();
    } else {
      this._buttonElement.classList.remove(this._formSaveButtonInactive);
      this._buttonElement.disabled = false;
    }
  }

  _setEventListeners() {
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._isValid(inputElement);
        this._toggleButtonState();
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
    this._setEventListeners();
  }
}
