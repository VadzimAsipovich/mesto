export default class Popup {
  constructor(selector) {
    this._selector = selector;
    this._popup = document.querySelector(this._selector);
    this._handleEscClose = this._handleEscClose.bind(this);
    this._popupCloseButton = this._popup.querySelector(".popup__close-btn");
    this._popupOverlay = this._popup.querySelector(".popup__overlay");
    this.saveButton = this._popup.querySelector(".form__save-btn");
  }
  open() {
    this._popup.classList.add("animation");
    this._popup.classList.remove("animation_hide");
    document.addEventListener("keyup", this._handleEscClose);
  }
  close() {
    this._popup.classList.add("animation_hide");
    this._popup.classList.remove("animation");
    document.removeEventListener("keyup", this._handleEscClose);
  }
  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close(this._popup);
    }
  }
  setEventListeners() {
    this._popupCloseButton.addEventListener("click", this.close.bind(this));
    this._popupOverlay.addEventListener("click", this.close.bind(this));
  }
}
