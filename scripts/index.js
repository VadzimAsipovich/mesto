import Card from "./Card.js";
import FormValidator from "./FormValidator.js";

const profileName = document.querySelector(".profile__name");
const profileTitle = document.querySelector(".profile__title");
const editProfileButton = document.querySelector(".profile__edit-button");
const editPopup = document.querySelector("#edit_form");
const editPopupName = editPopup.querySelector(".form__text_type_name");
const editPopupTitle = editPopup.querySelector(".form__text_type_title");
const editPopupCloseButton = editPopup.querySelector(
  ".popup__close-btn_type_form"
);

const cardAddButton = document.querySelector(".profile__add-button");
const addCardPopup = document.querySelector("#location_form");
const addCardPopupName = addCardPopup.querySelector(".form__text_type_name");
const addCardPopupLink = addCardPopup.querySelector(".form__text_type_title");
const addCardPopupCloseButton = addCardPopup.querySelector(
  ".popup__close-btn_type_form"
);
const addCardPopupForm = addCardPopup.querySelector("#location_popup-form");

const elementsContainer = document.querySelector(".elements");
const elementTemplate = document.querySelector("#element").content;

const lightBox = document.querySelector(".popup_type_image");
const lightBoxImg = lightBox.querySelector(".popup__image");
const lightBoxText = lightBox.querySelector(".popup__text");
const lightBoxCloseButton = document.querySelector(
  ".popup__close-btn_type_image"
);

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  fillEditProfileFormFields();
  closeEditProfilePopup();
}

function fillEditProfileFormFields() {
  profileName.textContent = editPopupName.value;
  profileTitle.textContent = editPopupTitle.value;
}

function handleNewCardSubmit(evt) {
  evt.preventDefault();
  const card = {};
  card.link = addCardPopupLink.value;
  card.name = addCardPopupName.value;
  const cardObject = new Card(card, ".element");
  const cardElement = cardObject.generate();
  elementsContainer.prepend(cardElement);
  closeAddCardPopup();
}

function openEditProfilePopup() {
  editPopupName.value = profileName.textContent;
  editPopupTitle.value = profileTitle.textContent;
  openPopup(editPopup);
}

function closeEditProfilePopup() {
  closePopup(editPopup);
}

function openAddCardPopup() {
  openPopup(addCardPopup);
}

function closeAddCardPopup() {
  addCardPopupForm.reset();
  closePopup(addCardPopup);
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
function clearPopup(popup) {
  const closeButton = popup.querySelector(".form__save-btn");
  if (popup.id === "location_form") {
    closeButton.disabled = true;
    closeButton.classList.add("form__save-btn_inactive");
    popup.querySelector(".form").reset();
  }
  const errorList = Array.from(popup.querySelectorAll("span"));
  const inputList = Array.from(popup.querySelectorAll("input"));
  errorList.forEach((span) => {
    span.textContent = "";
  });
  inputList.forEach((input) => {
    input.classList.remove("form__text_type_error");
  });
}
function closePopup(popup) {
  clearPopup(popup);
  popup.classList.add("animation_hide");
  popup.classList.remove("animation");
  document.removeEventListener("keyup", handleClosePopupByKey);
}

lightBoxCloseButton.addEventListener("click", closeImagePopup);
editProfileButton.addEventListener("click", openEditProfilePopup);
editPopupCloseButton.addEventListener("click", closeEditProfilePopup);
editPopup.addEventListener("submit", handleProfileFormSubmit);
editPopup.addEventListener("click", handleClosePopupByClick);
cardAddButton.addEventListener("click", openAddCardPopup);
addCardPopupCloseButton.addEventListener("click", closeAddCardPopup);
addCardPopup.addEventListener("submit", handleNewCardSubmit);
addCardPopup.addEventListener("click", handleClosePopupByClick);
lightBox.addEventListener("click", handleClosePopupByClick);
// card rendering
initialCards.forEach((card) => {
  const cardObject = new Card(card, ".element");
  const cardElement = cardObject.generate();
  elementsContainer.prepend(cardElement);
});

const formList = Array.from(document.querySelectorAll(".form"));

formList.forEach((formElement) => {
  const formValidator = new FormValidator(
    {
      formSaveButtInactive: "form__save-btn_inactive",
      formInputClass: ".form__text",
      formSaveButt: ".form__save-btn",
      inputElementErrorClass: "form__text_type_error",
      errorElementErrorClass: "form__input-error_active",
      formClass: ".form",
    },
    formElement
  );
  formValidator.enableValidation();
});
