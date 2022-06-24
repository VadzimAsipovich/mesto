import Card from "./Card.js";
import FormValidator from "./FormValidator.js";

const profileName = document.querySelector(".profile__name");
const profileTitle = document.querySelector(".profile__title");
const profileButton = document.querySelector(".profile__edit-button");
const popup = document.querySelector("#edit_form");
const popupName = popup.querySelector(".form__text_type_name");
const popupTitle = popup.querySelector(".form__text_type_title");
const popupCloseButton = popup.querySelector(
  ".popup__close-btn_type_form"
);

const cardAddButton = document.querySelector(".profile__add-button");
const cardPopup = document.querySelector("#location_form");
const cardPopupName = cardPopup.querySelector(".form__text_type_name");
const cardPopupLink = cardPopup.querySelector(".form__text_type_title");
const cardPopupCloseButton = cardPopup.querySelector(
  ".popup__close-btn_type_form"
);
const cardPopupForm = cardPopup.querySelector("#location_popup-form");

const elementsContainer = document.querySelector(".elements");

const lightBox = document.querySelector(".popup_type_image");
const lightBoxImg = lightBox.querySelector(".popup__image");
const lightBoxText = lightBox.querySelector(".popup__text");
const lightBoxCloseButton = document.querySelector(
  ".popup__close-btn_type_image"
);
const allFormValidators = {};

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  fillEditProfileFormFields();
  closeEditProfilePopup();
}

function fillEditProfileFormFields() {
  profileName.textContent = popupName.value;
  profileTitle.textContent = popupTitle.value;
}
function createCard(card,selector){
  const cardObject = new Card(card, selector);
  const cardElement = cardObject.generate();
  return cardElement;
}
function handleNewCardSubmit(evt) {
  evt.preventDefault();
  const card = {};
  card.link = cardPopupLink.value;
  card.name = cardPopupName.value;
  const cardElement = createCard(card,".element")
  elementsContainer.prepend(cardElement);
  closeAddCardPopup();
}

function openEditProfilePopup() {
  popupName.value = profileName.textContent;
  popupTitle.value = profileTitle.textContent;
  openPopup(popup);
}

function closeEditProfilePopup() {
  closePopup(popup);
}

function openAddCardPopup() {
  openPopup(cardPopup);
}

function closeAddCardPopup() {
  cardPopupForm.reset();
  closePopup(cardPopup);
}

export default function openImagePopup(evt) {
  lightBoxImg.src = evt.target.src;
  lightBoxImg.alt = evt.target.alt;
  lightBoxText.textContent = evt.target.alt;
  openPopup(lightBox);
}

function closeImagePopup() {
  closePopup(lightBox);
}

const handleClosePopupByClick = (evt) => {
  if (!evt.target.closest(".form") && !evt.target.closest(".popup__image")) {
    const popup = evt.target.closest(".popup");
    closePopup(popup);
  }
};
const handleClosePopupByKey = (evt) => {
  if (evt.key === "Escape") {
    const popup = document.querySelector(".animation");
    closePopup(popup);
  }
};

function openPopup(popup) {
  popup.classList.add("animation");
  popup.classList.remove("animation_hide");
  document.addEventListener("keyup", handleClosePopupByKey);
}

function closePopup(popup) {
  popup.classList.add("animation_hide");
  popup.classList.remove("animation");
  document.removeEventListener("keyup", handleClosePopupByKey);
  if(popup.querySelector('.form')){
    allFormValidators[popup.querySelector('.form').id].setButtonInactive();
  }
}

lightBoxCloseButton.addEventListener("click", closeImagePopup);
profileButton.addEventListener("click", openEditProfilePopup);
popupCloseButton.addEventListener("click", closeEditProfilePopup);
popup.addEventListener("submit", handleProfileFormSubmit);
popup.addEventListener("click", handleClosePopupByClick);
cardAddButton.addEventListener("click", openAddCardPopup);
cardPopupCloseButton.addEventListener("click", closeAddCardPopup);
cardPopup.addEventListener("submit", handleNewCardSubmit);
cardPopup.addEventListener("click", handleClosePopupByClick);
lightBox.addEventListener("click", handleClosePopupByClick);
// card rendering
initialCards.forEach((card) => {
  const cardElement = createCard(card, ".element");
  elementsContainer.prepend(cardElement);
});

const formList = Array.from(document.querySelectorAll(".form"));

formList.forEach((formElement) => { 
  const formValidator = new FormValidator( 
    { 
      formSaveButtonInactive: "form__save-btn_inactive", 
      formInputClass: ".form__text", 
      formSaveButton: ".form__save-btn", 
      inputElementErrorClass: "form__text_type_error", 
      errorElementErrorClass: "form__input-error_active", 
      formClass: ".form", 
    }, 
    formElement 
  ); 
  allFormValidators[formElement.id] = formValidator;
  formValidator.enableValidation(); 
});