export default class Card {
  constructor(card, templateSelector, elementSelector, handleCardClick, userId, deleteCard, api) {
    this._name = card.name;
    this._link = card.link;
    this._likes = card.likes.length;
    this._id = card._id;
    this._userID = userId;
    this._templateSelector = templateSelector;
    this._elementSelector = elementSelector;
    this._handleCardClick = handleCardClick;
    this._isDeletable = (this._userID === card.owner._id);
    this._deleteCard = deleteCard;
    this._isLiked = JSON.stringify(card.likes).indexOf(this._userID) > -1;
    this._api = api;
  }

  _toggleLikeButton(evt){
    this._elementLikes = evt.target
    .closest(".element")
    .querySelector(".element__likes");
    if (evt.target.classList.contains("element__button_active")) {
      this._api.removeLike(evt.target.closest(".element").id).then((data) => {
        this._elementLikes.textContent = data.likes.length;
        evt.target.classList.toggle("element__button_active");
      })
      .catch((error) => {
        console.log(error);
      });
    } else {
      this._api.addLike(evt.target.closest(".element").id).then((data) => {
        this._elementLikes.textContent = data.likes.length;
        evt.target.classList.toggle("element__button_active");
      })
      .catch((error) => {
        console.log(error);
      });;
    }
  }

  _getElement() {
    const elementCard = document
      .querySelector(this._templateSelector)
      .content.querySelector(this._elementSelector)
      .cloneNode(true);

    return elementCard;
  }
  
  _setEventListeners() {
    this._elementImage
      .addEventListener("click", this._handleCardClick);
    this._likeButton
      .addEventListener("click", (evt) => {
        this._toggleLikeButton(evt);
      });
    this._elementTrash
      .addEventListener("click", (evt) => {
        this._deleteCard(evt);
      });
  }

  generate() {
    this._element = this._getElement();
    this._elementImage = this._element.querySelector(".element__image");
    this._elementTitle = this._element.querySelector(".element__title");
    this._elementLikes = this._element.querySelector(".element__likes");
    this._likeButton = this._element.querySelector(".element__button");
    this._elementTrash = this._element.querySelector(".element__trash");
    this._element.id = this._id;
    this._setEventListeners();
    this._elementImage.src = this._link;
    this._elementImage.alt = this._name;
    this._elementTitle.textContent = this._name;
    this._elementLikes.textContent = this._likes;
    if (this._isLiked) {
      this._likeButton
        .classList.add("element__button_active");
    }
    console.log(this._isDeletable);
    console.log(this._userID);

    if (!this._isDeletable) {
      this._elementTrash.remove();
    }
    return this._element;
  }
}
