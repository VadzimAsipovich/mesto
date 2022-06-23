import openImagePopup from "./index.js"

export default class Card {
    constructor(card, selector){
      this._name = card.name;
      this._link = card.link;
      this._selector = selector;
    }
    _getElement(){
      const elementCard = document
      .querySelector("#element")
      .content
      .querySelector(this._selector)
      .cloneNode(true);
  
      return elementCard;
    }
    _setEventListeners() {
      this._element
        .querySelector(".element__image")
        .addEventListener("click", openImagePopup);
      this._element
        .querySelector(".element__button")
        .addEventListener("click", (evt) => {
          this._likeCard(evt);
        });
      this._element
        .querySelector(".element__trash")
        .addEventListener("click", evt => {
          this._deleteCard(evt);
        });
    }
  
    _likeCard(evt) {
      evt.target.classList.toggle("element__button_active");
    }
  
    _deleteCard(evt) {
      evt.target.closest(this._selector).remove();
    }
  
    generate(){
      this._element = this._getElement();
      this._setEventListeners();
      this._element.querySelector(".element__image").src = this._link;
      this._element.querySelector(".element__image").alt = this._name;
      this._element.querySelector(".element__title").textContent = this._name;
  
      return this._element;
    }
  }