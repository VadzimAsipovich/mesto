import Popup from "./Popup.js";
export default class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);
    this._popupImage = this._popup.querySelector(".popup__image");
    this._popupText = this._popup.querySelector(".popup__text");
  }
  open(evt) {
    console.log(evt);
    this._popupImage.src = evt.target.src;
    this._popupImage.alt = evt.target.alt;
    this._popupText.src = evt.target.alt;
    super.open();
  }
}
