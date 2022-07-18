export default class Popup {
  constructor(selector) {
    this._selector = selector;
    this._popup = document.querySelector(this._selector);
  }
  open() {
    this._popup.classList.add("animation");
    this._popup.classList.remove("animation_hide");
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
    document.addEventListener("keyup", this._handleEscClose.bind(this));
    this._popup
      .querySelector(".popup__close-btn")
      .addEventListener("click", this.close.bind(this));
  }
}
