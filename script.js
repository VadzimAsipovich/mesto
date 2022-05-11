let popupCloseButton = document.querySelector(".form__close-btn");
let editButton = document.querySelector(".profile__edit-button");
let popup = document.querySelector(".form");
let popupName = document.querySelector(".pop-up__text_type_name");
let popupTitle = document.querySelector(".pop-up__text_type_title");
let popupSaveButton = document.querySelector(".pop-up__save-btn");

let profileName = document.querySelector(".profile__name");
let profileTitle = document.querySelector(".profile__title");

function formSubmitHandler(evt) {
    evt.preventDefault();
    profileName.textContent = popupName.value;
    profileTitle.textContent = popupTitle.value;
    closePopup();

}

function openPopup() {
    popup.style.display ='flex';
}

function closePopup() {
    popup.style.display ='none';
}

function replacePopupContent() {
    popupName.value = profileName.textContent;
    popupTitle.value = profileTitle.textContent;
}
replacePopupContent();
editButton.addEventListener('click', openPopup);
popupCloseButton.addEventListener('click', closePopup);
popup.addEventListener('submit', formSubmitHandler);



