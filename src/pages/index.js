import Card from "../scripts/components/Card.js";
import FormValidator from "../scripts/components/FormValidator.js";
import ConfirmationPopup from "../scripts/components/ConfirmationPopup.js";
import PopupWithForm from "../scripts/components/PopupWithForm.js";
import PopupWithImage from "../scripts/components/PopupWithImage.js";
import Section from "../scripts/components/Section.js";
import UserInfo from "../scripts/components/UserInfo.js";
import Api from "../scripts/components/Api.js";

import "./index.css";

const profileButton = document.querySelector(".profile__edit-button");
const editProfilePopup = document.querySelector("#edit_form");
const editProfilePopupName = editProfilePopup.querySelector(".form__text_type_name");
const editProfilePopupTitle = editProfilePopup.querySelector(".form__text_type_title");
const cardAddButton = document.querySelector(".profile__add-button");
const profilePictureChangeElement = document.querySelector(".profile__overlay");

const allFormValidators = {};
const formList = Array.from(document.querySelectorAll(".form"));

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-46",
  headers: {
    authorization: "38a97893-3463-42f6-bb0a-1fe7e04e295c",
    "Content-Type": "application/json",
  },
});
const userInfo = new UserInfo(".profile__name",".profile__title",".profile__avatar");

Promise.all([api.getUser(), api.getInitialCards()])
  .then(([userData, cards]) => {
    userInfo.setUserInfo(
      userData.name,
      userData.about,
      userData.avatar,
      userData._id
    );
    cardsList.renderItems(cards);
  })
  .catch(err => {
    console.log(err);
  });
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

const cardsList = new Section(
  (item) => {
    const cardElement = createCard(item);
    cardsList.setItem(cardElement);
  },
  ".main__elements"
);

const profilePopup = new PopupWithForm(
  "#edit_form",
  (formValues) => {
    profilePopup.renderLoading(true);
    api
      .updateUser(formValues.name, formValues.title)
      .then((data) => {
        userInfo.setUserInfo(data.name, data.about,data.avatar,data._id);
        profilePopup.close();
      })
      .catch(err => console.log(err))
      .finally(() => {
        profilePopup.renderLoading(false);
      });
  },
  () => {
    allFormValidators["popup-form"].setButtonInactive();
    const userInfoValues = userInfo.getUserInfo();
    editProfilePopupName.value = userInfoValues.userName;
    editProfilePopupTitle.value = userInfoValues.userInfo;
  },
  "Сохранить"
);

profilePopup.setEventListeners();
profileButton.addEventListener("click", profilePopup.open.bind(profilePopup));

const confirmationPopup = new ConfirmationPopup("#confirmation_form", (id) => {
  api
    .deleteCard(id)
    .then(() => {
      document.getElementById(id).remove();
      confirmationPopup.close();
    })
    .catch((error) => {
      console.log(error);
    });
});
confirmationPopup.setEventListeners();

const avatarPopup = new PopupWithForm(
  "#avatar_form",
  (formValue) => {
    avatarPopup.renderLoading(true);
    api
      .updateAvatar(formValue.avatar)
      .then((data) => {
        userInfo.setUserInfo(data.name, data.about,data.avatar,data._id)
        avatarPopup.close();
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        avatarPopup. renderLoading(false);
      });
  },
  () => {
    allFormValidators["avatar_popup-form"].setButtonInactive();
  },
  "Сохранить"
);

avatarPopup.setEventListeners();

profilePictureChangeElement.addEventListener(
  "click",
  avatarPopup.open.bind(avatarPopup)
);

function createCard(item) {
  const cardEntity = new Card(
    item,
    "#element",
    ".element",
    viewCardPopup.open.bind(viewCardPopup),
    userInfo._id,
    (evt) => {
      allFormValidators["confirmation_popup-form"].setButtonActive();
      confirmationPopup.open(evt.target.closest(".element").id);
    },
    api
  );
  const cardElement = cardEntity.generate();
  return cardElement;
}

const newCardPopup = new PopupWithForm(
  "#location_form",
  (formValues) => {
    newCardPopup.renderLoading(true);
    api
      .addNewCard(formValues.name, formValues.title)
      .then((res) => {
        const cardElement = createCard(res);
        cardsList.prependItem(cardElement);
        newCardPopup.close();
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        newCardPopup.renderLoading(false);
      });
  },
  () => {
    allFormValidators["location_popup-form"].setButtonInactive();
  },
  "Создать"
);
newCardPopup.setEventListeners();
cardAddButton.addEventListener("click", newCardPopup.open.bind(newCardPopup));

const viewCardPopup = new PopupWithImage(".popup_type_image");
viewCardPopup.setEventListeners();
