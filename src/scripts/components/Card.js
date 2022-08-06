export default class Card {
  constructor(card, selector, handleCardClick, userId, deleteCard, api) {
    this._name = card.name;
    this._link = card.link;
    this._likes = card.likes.length;
    this._id = card._id;
    this._userID = userId;
    this._selector = selector;
    this._handleCardClick = handleCardClick;
    this._isDeletable = (this._userID === card.owner._id);
    this._deleteCard = deleteCard;
    this._isLiked = JSON.stringify(card.likes).indexOf(this._userID) > -1;
    this._api = api;
  }

  _toggleLikeButton(evt){
    if (evt.target.classList.contains("element__button_active")) {
      this._api.removeLike(evt.target.closest(".element").id).then((data) => {
        evt.target
          .closest(".element")
          .querySelector(".element__likes").innerHTML = data.likes.length;
      })
      .catch((error) => {
        console.log(error);
      });
    } else {
      this._api.addLike(evt.target.closest(".element").id).then((data) => {
        evt.target
          .closest(".element")
          .querySelector(".element__likes").innerHTML = data.likes.length;
      })
      .catch((error) => {
        console.log(error);
      });;
    }
    evt.target.classList.toggle("element__button_active");
  }

  _getElement() {
    const elementCard = document
      .querySelector("#element")
      .content.querySelector(this._selector)
      .cloneNode(true);

    return elementCard;
  }
  _setEventListeners() {
    this._elementImage
      .addEventListener("click", this._handleCardClick);
    this._elementButton
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
    this._elementButton = this._element.querySelector(".element__button");
    this._elementTrash = this._element.querySelector(".element__trash");
    this._element.id = this._id;
    this._setEventListeners();
    this._elementImage.src = this._link;
    this._elementImage.alt = this._name;
    this._elementTitle.textContent = this._name;
    this._elementLikes.textContent = this._likes;
    if (this._isLiked) {
      this._elementButton
        .classList.add("element__button_active");
    }
    if (!this._isDeletable) {
      this._elementTrash.remove();
    }
    return this._element;
  }
}
