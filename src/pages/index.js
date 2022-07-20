import Card from "../scripts/components/Card.js";
import FormValidator from "../scripts/components/FormValidator.js";
import PopupWithForm from "../scripts/components/PopupWithForm.js";
import PopupWithImage from "../scripts/components/PopupWithImage.js";
import Section from "../scripts/components/Section.js";
import UserInfo from "../scripts/components/UserInfo.js";
import { initialCards } from "../scripts/cards.js";

import "./index.css";

const profileButton = document.querySelector(".profile__edit-button");
const popup = document.querySelector("#edit_form");
const popupName = popup.querySelector(".form__text_type_name");
const popupTitle = popup.querySelector(".form__text_type_title");

const cardAddButton = document.querySelector(".profile__add-button");
const cardPopup = document.querySelector("#location_form");
const cardPopupName = cardPopup.querySelector(".form__text_type_name");
const cardPopupLink = cardPopup.querySelector(".form__text_type_title");

const elementsContainer = document.querySelector(".elements");

const allFormValidators = {};

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

const userInfo = new UserInfo({
  userNameSelector: ".profile__name",
  userInfoSelector: ".profile__title",
});

const profilePopup = new PopupWithForm(
  "#edit_form",
  (formValues) => {
    userInfo.setUserInfo({
      userName: formValues.name,
      userInfo: formValues.title,
    });
    profilePopup.close();
  },
  () => {
    allFormValidators["popup-form"].setButtonInactive();
    popupName.value = userInfo.getUserInfo().userName;
    popupTitle.value = userInfo.getUserInfo().userInfo;
  }
);
profilePopup.setEventListeners();
profileButton.addEventListener("click", profilePopup.open.bind(profilePopup));

function createCard(item) {
  const cardEntity = new Card(
    item,
    ".element",
    viewCardPopup.open.bind(viewCardPopup)
  );
  const cardElement = cardEntity.generate();
  return cardElement;
}

const newCardPopup = new PopupWithForm(
  "#location_form",
  (formValues) => {
    const card = {};
    card.link = formValues.name;
    card.name = formValues.title;
    const cardElement = createCard(card);
    elementsContainer.prepend(cardElement);
    newCardPopup.close();
  },
  () => {
    allFormValidators["location_popup-form"].setButtonInactive();
  }
);
newCardPopup.setEventListeners();
cardAddButton.addEventListener("click", newCardPopup.open.bind(newCardPopup));

const viewCardPopup = new PopupWithImage(".popup_type_image");
viewCardPopup.setEventListeners();

const cardsList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const cardElement = createCard(item);
      cardsList.setItem(cardElement);
    },
  },
  ".main__elements"
);

cardsList.renderItems();
