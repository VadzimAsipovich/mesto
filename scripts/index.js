const profileName = document.querySelector(".profile__name");
const profileTitle = document.querySelector(".profile__title");
const editProfileButton = document.querySelector(".profile__edit-button");
const editPopup = document.querySelector("#edit_form");
const editPopupName = editPopup.querySelector(".form__text_type_name");
const editPopupTitle = editPopup.querySelector(".form__text_type_title");
const editPopupCloseButton = editPopup.querySelector(".popup__close-btn_type_form");

const cardAddButton = document.querySelector(".profile__add-button");
const addCardPopup = document.querySelector("#location_form");
const addCardPopupName = addCardPopup.querySelector(".form__text_type_name");
const addCardPopupLink = addCardPopup.querySelector(".form__text_type_title");
const addCardPopupCloseButton = addCardPopup.querySelector(".popup__close-btn_type_form");

const elementsContainer = document.querySelector(".elements");
const elementTemplate = document.querySelector('#element').content;

const lightBox = document.querySelector(".popup_type_image");
const lightBoxImg = lightBox.querySelector(".popup__image");
const lightBoxText = lightBox.querySelector(".popup__text");
const lightBoxCloseButton = document.querySelector(".popup__close-btn_type_image");

function submitProfileForm(evt) {
    evt.preventDefault();
    profileName.textContent = editPopupName.value;
    profileTitle.textContent = editPopupTitle.value;
    closeEditProfilePopup();
}

function createNewCard(card) {
  const elementCard = elementTemplate.querySelector('.element').cloneNode(true);
  const elementImage = elementCard.querySelector('.element__image');
  elementImage.src = card.link;
  elementImage.alt = card.name;
  elementCard.querySelector('.element__title').textContent = card.name;
  elementImage.addEventListener('click', openImagePopup);
  elementCard.querySelector('.element__button').addEventListener('click', evt => {
    evt.target.classList.toggle("element__button_active");
  });
  elementCard.querySelector('.element__trash').addEventListener('click', evt => {
    evt.target.closest('.element').remove();
  });
  return elementCard;
}

function submitCard(evt) {
  evt.preventDefault();
  const card = {};
  card.link = addCardPopupLink.value;
  card.name = addCardPopupName.value;
  const cardElement = createNewCard(card);
  elementsContainer.prepend(cardElement);
  closeAddCardPopup();
}

function openEditProfilePopup() {
  openPopup(editPopup);
  editPopupName.value = profileName.textContent;
  editPopupTitle.value = profileTitle.textContent;
}

function closeEditProfilePopup() {
  closePopup(editPopup);
}

function openAddCardPopup() {
  openPopup(addCardPopup);
}

function closeAddCardPopup() {
  addCardPopup.querySelector('#location_popup-form').reset();
  closePopup(addCardPopup);
}

function openImagePopup(evt) {
  openPopup(lightBox);
  lightBoxImg.src = evt.target.src;
  lightBoxImg.alt = evt.target.alt;
  lightBoxText.textContent = evt.target.alt;
}

function closeImagePopup() {
  closePopup(lightBox);
}

function openPopup(popup){
  popup.classList.add('animation');
  popup.classList.remove('animation_hide');
  const form = popup.querySelector('.form');
  const closePopupClick = (evt) => {
      if(!evt.target.closest('.form')){
        popup.removeEventListener('click', closePopupClick);
        closePopup(popup);
      }
  }
  const closePopupKey = (evt => {
    console.log(evt.key);
      if(evt.key == "Escape"){
        document.removeEventListener('keydown', closePopupKey);
        closePopup(popup);
      }
  })
  popup.addEventListener('click', closePopupClick);
  document.addEventListener('keydown', closePopupKey);
  
}

function closePopup(popup){
  popup.classList.add('animation_hide');
  popup.classList.remove('animation');
}

lightBoxCloseButton.addEventListener('click', closeImagePopup);
editProfileButton.addEventListener('click', openEditProfilePopup);
editPopupCloseButton.addEventListener('click', closeEditProfilePopup);
editPopup.addEventListener('submit', submitProfileForm);
cardAddButton.addEventListener('click', openAddCardPopup);
addCardPopupCloseButton.addEventListener('click', closeAddCardPopup);
addCardPopup.addEventListener('submit', submitCard);
// card rendering
initialCards.forEach(card => {
  const cardElement = createNewCard(card);
  elementsContainer.prepend(cardElement);
});

enableValidation({
  formSaveButtInactive:"form__save-btn_inactive",
  formInputClass:".form__text",
  formSaveButt:'.form__save-btn',
  inputElementErrorClass:'form__text_type_error',
  errorElementErrorClass:'form__input-error',
  formClass:'.form',
}
);