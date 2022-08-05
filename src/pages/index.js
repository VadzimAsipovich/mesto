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
const popup = document.querySelector("#edit_form");
const popupName = popup.querySelector(".form__text_type_name");
const popupTitle = popup.querySelector(".form__text_type_title");
const cardAddButton = document.querySelector(".profile__add-button");
const elementsContainer = document.querySelector(".elements");
const profilePictureChangeElement = document.querySelector(".profile__overlay");
const profilePicture = document.querySelector(".profile__avatar");

const allFormValidators = {};

const formList = Array.from(document.querySelectorAll(".form"));

function renderLoading(isLoading, button, buttonOriginal = "") {
  if (isLoading) {
    button.textContent = "... Сохранение";
  } else {
    button.textContent = buttonOriginal;
  }
}
const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-46",
  headers: {
    authorization: "38a97893-3463-42f6-bb0a-1fe7e04e295c",
    "Content-Type": "application/json",
  },
});
const userInfo = new UserInfo("", "", "");

api.getUser().then((userData) => {
  userInfo.setUserInfo(
    userData.name,
    userData.about,
    userData.avatar,
    userData._id
  );
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

api.getInitialCards().then((cards) => {
  const cardsList = new Section(
    {
      items: cards,
      renderer: (item) => {
        const cardElement = createCard(item);
        cardsList.setItem(cardElement);
      },
    },
    ".main__elements"
  );
  cardsList.renderItems();
});

const profilePopup = new PopupWithForm(
  "#edit_form",
  (formValues) => {
    renderLoading(true, profilePopup.saveButton);
    api
      .updateUser(formValues.name, formValues.title)
      .then((data) => {
        userInfo.setUserInfo(data.name, data.about);
      })
      .finally(() => {
        renderLoading(false, profilePopup.saveButton, "Сохранить");
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

const confirmationPopup = new ConfirmationPopup("#confirmation_form", (id) => {
  api
    .deleteCard(id)
    .then(() => {
      document.getElementById(id).remove();
    })
    .catch((error) => {
      console.log(error);
    });
});
confirmationPopup.setEventListeners();

const avatarPopup = new PopupWithForm(
  "#avatar_form",
  (formValue) => {
    renderLoading(true, avatarPopup.saveButton);
    api
      .updateAvatar(formValue.avatar)
      .then((data) => {
        profilePicture.src = data.avatar;
        avatarPopup.close();
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        renderLoading(false, avatarPopup.saveButton, "Сохранить");
      });
    profilePopup.close();
  },
  () => {
    allFormValidators["popup-form"].setButtonInactive();
  }
);

avatarPopup.setEventListeners();

profilePictureChangeElement.addEventListener(
  "click",
  avatarPopup.open.bind(avatarPopup)
);

function createCard(item) {
  const cardEntity = new Card(
    item,
    ".element",
    viewCardPopup.open.bind(viewCardPopup),
    userInfo.id,
    (evt) => {
      allFormValidators["confirmation_popup-form"].setButtonActive();
      confirmationPopup.open(evt.target.closest(".element").id);
    },
    (evt) => {
      if (evt.target.classList.contains("element__button_active")) {
        api.removeLike(evt.target.closest(".element").id).then((data) => {
          evt.target
            .closest(".element")
            .querySelector(".element__likes").innerHTML = data.likes.length;
        });
      } else {
        api.addLike(evt.target.closest(".element").id).then((data) => {
          evt.target
            .closest(".element")
            .querySelector(".element__likes").innerHTML = data.likes.length;
        });
      }
      evt.target.classList.toggle("element__button_active");
    }
  );
  const cardElement = cardEntity.generate();
  return cardElement;
}

const newCardPopup = new PopupWithForm(
  "#location_form",
  (formValues) => {
    renderLoading(true, newCardPopup.saveButton);
    const card = {};
    api
      .addNewCard(formValues.name, formValues.title)
      .then((res) => {
        card.link = res.link;
        card.name = res.name;
        card.likes = res.likes;
        card._id = res._id;
        card.owner = res.owner;
        const cardElement = createCard(card);
        elementsContainer.prepend(cardElement);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        renderLoading(false, newCardPopup.saveButton, "Создать");
      });

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
