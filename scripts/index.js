
const profileName = document.querySelector(".profile__name");
const profileTitle = document.querySelector(".profile__title");
// Popups
const editButton = document.querySelector(".profile__edit-button");
const edit_popup = document.querySelector("#edit_form");
const edit_popupName = edit_popup.querySelector(".pop-up__text_type_name");
const edit_popupTitle = edit_popup.querySelector(".pop-up__text_type_title");
const edit_popupSaveButton = edit_popup.querySelector(".pop-up__save-btn");
const edit_popupCloseButton = edit_popup.querySelector(".form__close-btn");

const cardAddButton = document.querySelector(".profile__add-button");
const new_popup = document.querySelector("#new_form");
const new_popupName = new_popup.querySelector(".pop-up__text_type_name");
const new_popupLink = new_popup.querySelector(".pop-up__text_type_title");
const new_popupSaveButton = new_popup.querySelector(".pop-up__save-btn");
const new_popupCloseButton = new_popup.querySelector(".form__close-btn");

// Card's related logic
const elementsContainer = document.querySelector(".elements");
const elementTemplate = document.querySelector('#element').content;
const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

initialCards.forEach(newCardCreation);

// Lightbox logic
const lightBox = document.querySelector(".modal");
const lightBoxImg = lightBox.querySelector(".modal__image");
const lightBoxText = lightBox.querySelector(".modal__text");
const lightBoxCloseButton = document.querySelector(".modal__close-btn");
lightBoxCloseButton.addEventListener('click', closeModal);

function formSubmitHandler(evt) {
    evt.preventDefault();
    profileName.textContent = edit_popupName.value;
    profileTitle.textContent = edit_popupTitle.value;
    closePopup();
}


function newCardCreation(card) {
  const elementElement = elementTemplate.querySelector('.element').cloneNode(true);
  elementElement.querySelector('.element__image').src = card.link;
  elementElement.querySelector('.element__image').alt = card.name;
  elementElement.querySelector('.element__title').textContent = card.name;
  elementElement.querySelector('.element__image').addEventListener('click', openModal);
  elementElement.querySelector('.element__button').addEventListener('click', evt => {
    evt.target.classList.toggle("element__button_active");
  });
  elementElement.querySelector('.element__trash').addEventListener('click', evt => {
    evt.target.parentElement.remove();
  });
  elementsContainer.prepend(elementElement);
}

function cardSubmitHandler(evt) {
  evt.preventDefault();
  const card = {};
  card.link = new_popupLink.value;
  card.name = new_popupName.value;
  newCardCreation(card);
  closeNewPopup();
}

function openPopup() {
  openAnimation(edit_popup);
  edit_popupName.value = profileName.textContent;
  edit_popupTitle.value = profileTitle.textContent;
}

function closePopup() {
  closeAnimation(edit_popup);
}

function openNewPopup() {
  openAnimation(new_popup);
}

function closeNewPopup() {
  new_popupName.value = '';
  new_popupLink.value = '';
  closeAnimation(new_popup);
}

function openModal(evt) {
  openAnimation(lightBox);
  lightBoxImg.src = evt.target.src;
  lightBoxImg.alt = evt.target.alt;
  lightBoxText.textContent = evt.target.alt;
}

function closeModal() {
  closeAnimation(lightBox);
}

function openAnimation(item){
  item.classList.add('animation');
  item.classList.remove('animation_hide');
}

function closeAnimation(item){
  item.classList.add('animation_hide');
  item.classList.remove('animation');
}

editButton.addEventListener('click', openPopup);
edit_popupCloseButton.addEventListener('click', closePopup);
edit_popup.addEventListener('submit', formSubmitHandler);

cardAddButton.addEventListener('click', openNewPopup);
new_popupCloseButton.addEventListener('click', closeNewPopup);
new_popup.addEventListener('submit', cardSubmitHandler);