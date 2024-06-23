import '../pages/index.css';
import {createCard, handleLike, deleteCard} from './card';
import {openModal, closeModal, handleModalClose, changeModalState} from './modal';
import {enableValidation, clearValidation} from './validation';
import {configValidation} from './configvalidation';
import {getInitialData, editProfileInformation, addNewCard, changeAvatar} from './api';

const placesList = document.querySelector('.places__list');
const editProfileButton = document.querySelector('.profile__edit-button');
const editProfileModal = document.querySelector('.popup_type_edit');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description'); 
const profileFormElement = editProfileModal.querySelector('.popup__form');
const nameInput = profileFormElement.querySelector('.popup__input_type_name');
const jobInput = profileFormElement.querySelector('.popup__input_type_description');
const addCardButton = document.querySelector('.profile__add-button'); 
const addCardModal = document.querySelector('.popup_type_new-card');
const cardModalImage = document.querySelector('.popup_type_image');
const modalImage = cardModalImage.querySelector('.popup__image');
const modalCaptions = cardModalImage.querySelector('.popup__caption');
const cardFormElement = addCardModal.querySelector('.popup__form');
const cardName = cardFormElement.querySelector('.popup__input_type_card-name');
const cardImageUrl = cardFormElement.querySelector('.popup__input_type_url');
const profileImage = document.querySelector('.profile__image');
const editAvatarModal = document.querySelector('.popup_type_avatar');
const editAvatarElement = editAvatarModal.querySelector('.popup__form')
const editProfilAvatarButton = document.querySelector('.avatar__edit-button');
const avatarUrl = editAvatarModal.querySelector('.popup__input_type_url');

//добавляет карточки и начальные данные
getInitialData()
  .then(({cards, user}) => {
    cards.forEach((item) => {
      renderCard(item, user);
    })
    profileTitle.textContent = user.name;
    profileDescription.textContent = user.about;
    profileImage.style = `background-image: url("${user.avatar}")`;
  })
  .catch(err => {
    console.error(err)
  });

// валидация форм
enableValidation(configValidation);

// Вывести карточки на страницу
function renderCard(item, user) {
  placesList.prepend(createCard({item, deleteCard, openCardModalImage, handleLike, user}));
}

// модалка редактирования профиля - открытие
editProfileButton.addEventListener('click', () => {
  openModal(editProfileModal);
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;

  clearValidation(configValidation, profileFormElement);
});

// модалка редактирования профиля - закрытие
editProfileModal.addEventListener('click', handleModalClose); 

// изменение информации о профиле
function handleProfileEdit(evt) {
  evt.preventDefault();
  const nameInputValue = nameInput.value;
  const jobInputValue = jobInput.value;
  changeModalState(profileFormElement, true)

  editProfileInformation(nameInputValue, jobInputValue)
    .then(user => {
      profileTitle.textContent = user.name;
      profileDescription.textContent = user.about;
      closeModal(editProfileModal);
    })
    .catch(err => {
      console.error(err)
    })
    .finally(() => {
      changeModalState(profileFormElement, false)
    })
}

profileFormElement.addEventListener('submit', handleProfileEdit);

//модалка изменения аватара - открытие
editProfilAvatarButton.addEventListener('click', () => {
  openModal(editAvatarModal);
  avatarUrl.value = '';

  clearValidation(configValidation, editAvatarElement);
});

//модалка изменения аватара - изменение
const handleAvatarEdit = (evt) => {
  evt.preventDefault();
  const newImage = avatarUrl.value
  changeModalState(editAvatarModal, true)

  changeAvatar(newImage)
    .then((user) => {
      profileImage.style = `background-image: url("${user.avatar}")`;
      closeModal(editAvatarModal)
    })
    .catch(err => {
    console.error(err)
    })
    .finally(() => {
      changeModalState(editAvatarModal, false)
    })
}

editAvatarElement.addEventListener('submit', handleAvatarEdit)

//модалка изменения аватара - закрытие
editAvatarModal.addEventListener('click', handleModalClose)

// модалка добавления карточек - открытие
addCardButton.addEventListener('click', () => {
  openModal(addCardModal);
  cardName.value = '';
  cardImageUrl.value = '';

  clearValidation(configValidation, cardFormElement);
});

// модалка добавления карточек - закрытие
addCardModal.addEventListener('click', handleModalClose);

// добавление новой карточки
function handleCardAppend(evt) {
  evt.preventDefault();
  changeModalState(addCardModal, true)

  addNewCard(cardName.value, cardImageUrl.value)
    .then(card => {
      renderCard(card, true)
      closeModal(addCardModal);
    })
    .catch(err => {
      console.error(err)
    })
    .finally(() => {
      changeModalState(addCardModal, false)
    })
}

cardFormElement.addEventListener('submit', handleCardAppend);

// Функция открытия модалки img
function openCardModalImage(evt) {
  modalImage.setAttribute('src', evt.target.src);
  modalImage.setAttribute('alt', evt.target.alt);
  modalCaptions.textContent = evt.target.alt;
  
  openModal(cardModalImage);
}

// Закрытие модалки img
cardModalImage.addEventListener('click', handleModalClose);