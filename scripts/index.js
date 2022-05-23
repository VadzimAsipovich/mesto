
const profileName = document.querySelector(".profile__name");
const profileTitle = document.querySelector(".profile__title");
// Popups
const editProfileButton = document.querySelector(".profile__edit-button");
const editPopup = document.querySelector("#edit_form");
const editPopupName = editPopup.querySelector(".pop-up__text_type_name");
const editPopupTitle = editPopup.querySelector(".pop-up__text_type_title");
const editPopupCloseButton = editPopup.querySelector(".form__close-btn_type_form");

const cardAddButton = document.querySelector(".profile__add-button");
const locationPopup = document.querySelector("#location_form");
const locationPopupName = locationPopup.querySelector(".pop-up__text_type_name");
const locationPopupLink = locationPopup.querySelector(".pop-up__text_type_title");
const locationPopupSaveButton = locationPopup.querySelector(".pop-up__save-btn");
const locationPopupCloseButton = locationPopup.querySelector(".form__close-btn_type_form");

// Card's related logic
const elementsContainer = document.querySelector(".elements");
const elementTemplate = document.querySelector('#element').content;

// Lightbox logic
const lightBox = document.querySelector(".form_type_image");
const lightBoxImg = lightBox.querySelector(".form__image");
const lightBoxText = lightBox.querySelector(".form__text");
const lightBoxCloseButton = document.querySelector(".form__close-btn_type_image");
lightBoxCloseButton.addEventListener('click', closeImagePopup);

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
  elementsContainer.prepend(elementCard);
}

function cardSubmitHandler(evt) {
  evt.preventDefault();
  const card = {};
  card.link = locationPopupLink.value;
  card.name = locationPopupName.value;
  createNewCard(card);
  closeLocationPopup();
}

function openEditProfilePopup() {
  openPopup(editPopup);
  editPopupName.value = profileName.textContent;
  editPopupTitle.value = profileTitle.textContent;
}

function closeEditProfilePopup() {
  closePopup(editPopup);
}

function openLocationPopup() {
  openPopup(locationPopup);
}

function closeLocationPopup() {
  locationPopup.querySelector('#location_popup-form').reset();
  closePopup(locationPopup);
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
// не удалось реализовать анимации открытия и закрытия одним классом, поэтому класса 2, и вынести один в дефолтное состояние не получается, потому что 
// анимация отыгрывает при загрузке страницы

function openPopup(item){
  item.classList.add('animation');
  item.classList.remove('animation_hide');
}

function closePopup(item){
  item.classList.add('animation_hide');
  item.classList.remove('animation');
}

editProfileButton.addEventListener('click', openEditProfilePopup);
editPopupCloseButton.addEventListener('click', closeEditProfilePopup);
editPopup.addEventListener('submit', submitProfileForm);

cardAddButton.addEventListener('click', openLocationPopup);
locationPopupCloseButton.addEventListener('click', closeLocationPopup);
locationPopup.addEventListener('submit', cardSubmitHandler);
// card rendering
initialCards.forEach(createNewCard);