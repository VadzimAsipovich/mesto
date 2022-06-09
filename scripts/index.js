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

function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    storeIncertedValues();
    closeEditProfilePopup();
}

function storeIncertedValues(){
  profileName.textContent = editPopupName.value;
  profileTitle.textContent = editPopupTitle.value;
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

function handleNewCardSubmit(evt) {
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
  const handleClosePopupClick = (evt) => {
      if(!evt.target.closest('.form') &&  !evt.target.closest('.popup__image')){
        closePopup(popup);
      }
  }
  const handleClosePopupByKey = (evt => {
      if(evt.key === "Escape"){
        closePopup(popup);
      }
  })
  popup.addEventListener('click', handleClosePopupClick);
  document.addEventListener('keyup', handleClosePopupByKey);
  
}
function clearPopup(popup) {
  const errorList = Array.from(popup.querySelectorAll('span'));
  const inputList = Array.from(popup.querySelectorAll('input'));
  errorList.forEach(span => {
    span.textContent = '';
  })
  inputList.forEach(input => {
    input.classList.remove('form__text_type_error');
  })
}
function closePopup(popup){
  clearPopup(popup);
  popup.classList.add('animation_hide');
  popup.classList.remove('animation');
  popup.removeEventListener('click', handleClosePopupClick);
  document.removeEventListener('keyup', handleClosePopupByKey);
}

lightBoxCloseButton.addEventListener('click', closeImagePopup);
editProfileButton.addEventListener('click', openEditProfilePopup);
editPopupCloseButton.addEventListener('click', closeEditProfilePopup);
editPopup.addEventListener('submit', handleProfileFormSubmit);
cardAddButton.addEventListener('click', openAddCardPopup);
addCardPopupCloseButton.addEventListener('click', closeAddCardPopup);
addCardPopup.addEventListener('submit', handleNewCardSubmit);
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
  errorElementErrorClass:'form__input-error_active',
  formClass:'.form',
}
);