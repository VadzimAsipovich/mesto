export default class Card {
    constructor(card, selector, handleCardClick, userId, deleteCard){
      this._name = card.name;
      this._link = card.link;
      this._likes = card.likes.length;
      this._id = card._id;
      this._selector = selector;
      this._handleCardClick = handleCardClick;
      this._isDeletable = (userId === card.owner._id);
      this._deleteCard = deleteCard;
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
        .addEventListener("click", this._handleCardClick);
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
  
    generate(){
      this._element = this._getElement();
      this._element.id = this._id;
      this._setEventListeners();
      this._element.querySelector(".element__image").src = this._link;
      this._element.querySelector(".element__image").alt = this._name;
      this._element.querySelector(".element__title").textContent = this._name;
      this._element.querySelector(".element__likes").textContent = this._likes;

      if(!this._isDeletable){
        this._element.querySelector(".element__trash").remove();
      }
      return this._element;
    }
  }