const placesList = document.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content;

// @todo: Функция создания карточки
function createCard(item, deleteCard) {
  const placesItem = cardTemplate.querySelector('.places__item').cloneNode(true);
  const cardImage = placesItem.querySelector('.card__image');
  const cardTitle = placesItem.querySelector('.card__title');
  const deleteButton = placesItem.querySelector('.card__delete-button');

  cardImage.setAttribute('src', item.link);
  cardImage.setAttribute('alt', item.name);
  cardTitle.textContent = item.name;
  deleteButton.addEventListener('click', deleteCard);

  return placesItem;
}

// @todo: Функция удаления карточки
function deleteCard(evt) {
  evt.target.closest('.places__item').remove();
}

// @todo: Вывести карточки на страницу
function renderCard(item) {
  placesList.prepend(createCard(item, deleteCard));
}

initialCards.forEach((item) => {
  renderCard(item);
});