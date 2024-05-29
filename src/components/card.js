const cardTemplate = document.querySelector('#card-template').content;

// Функция создания карточки
export function createCard(item, deleteCard, openCardModalImage, handleLike) {
  const placesItem = cardTemplate.querySelector('.places__item').cloneNode(true);
  const cardImage = placesItem.querySelector('.card__image');
  const cardTitle = placesItem.querySelector('.card__title');
  const deleteButton = placesItem.querySelector('.card__delete-button');
  const likeButton = placesItem.querySelector('.card__like-button');

  cardImage.setAttribute('src', item.link);
  cardImage.setAttribute('alt', item.name);
  cardTitle.textContent = item.name;
  
  deleteButton.addEventListener('click', deleteCard);
  cardImage.addEventListener('click', openCardModalImage);
  likeButton.addEventListener('click', handleLike);

  return placesItem;
}

// Функция нажатия на лайк
export function handleLike(evt) {
  evt.target.classList.toggle('card__like-button_is-active');
}

// Функция удаления карточки
export function deleteCard(evt) {
  evt.target.closest('.places__item').remove();
}