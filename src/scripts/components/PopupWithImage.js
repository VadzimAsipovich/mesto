import Popup from './Popup.js';
export default class PopupWithImage extends Popup {
    constructor(selector) {
        super(selector);
      } 
    open(evt){
        console.log(evt)
        this._popup.querySelector('.popup__image').src = evt.target.src;
        this._popup.querySelector('.popup__image').alt = evt.target.alt;
        this._popup.querySelector('.popup__text').src = evt.target.alt;
        super.open();
    }
}