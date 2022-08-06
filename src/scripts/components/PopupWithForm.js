import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(selector, submitForm, openForm, submitBtnText) {
    super(selector);
    this._submitForm = submitForm.bind(this);
    this._inputList = this._popup.querySelectorAll(".form__text");
    this._openForm = openForm;
    this._form = this._popup.querySelector(".form");
    this._submitBtn =  this._form.querySelector(".button");
    this._submitBtnText = submitBtnText;
  }

  renderLoading(isLoading, loadingText='Сохранение...') {
    if (isLoading) {
      this._submitBtn.textContent = loadingText;
    } else {
      this._submitBtn.textContent = this._submitBtnText;
    }
  }

  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach(
      (input) => (this._formValues[input.name] = input.value)
    );
  }
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._getInputValues();
      this._submitForm(this._formValues);
    });
  }

  open() {
    this._openForm();
    super.open();
  }

  close() {
    this._form.reset();
    super.close();
  }
}
