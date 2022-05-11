const popupCloseButton = document.querySelector(".form__close-btn");
const editButton = document.querySelector(".profile__edit-button");
const popup = document.querySelector(".form");
const popupName = document.querySelector(".pop-up__text_type_name");
const popupTitle = document.querySelector(".pop-up__text_type_title");
const popupSaveButton = document.querySelector(".pop-up__save-btn");

const profileName = document.querySelector(".profile__name");
const profileTitle = document.querySelector(".profile__title");

function formSubmitHandler(evt) {
    evt.preventDefault();
    profileName.textContent = popupName.value;
    profileTitle.textContent = popupTitle.value;
    closePopup();

}

function openPopup() {
    popup.classList.add("form_state_show");
    popupName.value = profileName.textContent;
    popupTitle.value = profileTitle.textContent;
}

function closePopup() {
    popup.classList.remove("form_state_show");
}

editButton.addEventListener('click', openPopup);
popupCloseButton.addEventListener('click', closePopup);
popup.addEventListener('submit', formSubmitHandler);



