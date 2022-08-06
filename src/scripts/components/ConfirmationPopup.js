import Popup from "./Popup.js";

export default class ConfirmationPopup extends Popup {
  constructor(selector, deleteFunction) {
    super(selector);
    this._deleteFunction = deleteFunction;
    this._form = this._popup.querySelector(".form");
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._deleteFunction(this._idToDelete);
    });
  }

  open(id) {
    super.open();
    this._idToDelete = id;
  }
}