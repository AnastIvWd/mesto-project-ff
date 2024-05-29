import '../pages/index.css';
import {initialCards} from './cards';
import {createCard, handleLike, deleteCard} from './card';
import {openModal, closeModal, handleModalClose} from './modal';

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

// Вывести карточки на страницу
function renderCard(item) {
  placesList.prepend(createCard({item, deleteCard, openCardModalImage, handleLike}));
}

initialCards.forEach((item) => {
  renderCard(item);
});

// модалка редактирования профиля - открытие
editProfileButton.addEventListener('click', () => {
  openModal(editProfileModal);
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
});

// модалка редактирования профиля - закрытие
editProfileModal.addEventListener('click', handleModalClose); 

// изменение информации о профиле
function handleProfileEdit(evt) {
  evt.preventDefault();
  const nameInputValue = nameInput.value;
  const jobInputValue = jobInput.value;
  
  profileTitle.textContent = nameInputValue;
  profileDescription.textContent = jobInputValue;
  closeModal(editProfileModal);
}

profileFormElement.addEventListener('submit', handleProfileEdit);

// модалка добавления карточек - открытие
addCardButton.addEventListener('click', () => {
  openModal(addCardModal);
});

// модалка добавления карточек - закрытие
addCardModal.addEventListener('click', handleModalClose);

// добавление новой карточки
function handleCardAppend(evt) {
  evt.preventDefault();
  renderCard({name: cardName.value, link: cardImageUrl.value})
  closeModal(addCardModal);

  cardName.value = '';
  cardImageUrl.value = '';
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