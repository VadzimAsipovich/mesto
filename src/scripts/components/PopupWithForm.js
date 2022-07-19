import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(selector, submitForm, openForm) {
    super(selector);
    this._submitForm = submitForm;
    this._inputList = this._popup.querySelectorAll(".form__text");
    this._openForm = openForm;
    this._form = this._popup.querySelector(".form");
  }
  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach(
      (input) => (this._formValues[input.name] = input.value)
    );
    return this._formValues;
  }
  setEventListeners() {
    super.setEventListeners();
    this._form
      .addEventListener("submit", this._submitForm.bind(this));
  }

  open(){
    this._openForm();
    super.open();
  }
  close() {
    this.formData = this._getInputValues();
    this._form.reset();
    super.close();
  }
}
