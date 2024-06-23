import {deleteOneCard, putLike, deleteLike} from './api';

const cardTemplate = document.querySelector('#card-template').content;

// Функция создания карточки
export function createCard({item, deleteCard, openCardModalImage, handleLike, user}) {
  const placesItem = cardTemplate.querySelector('.places__item').cloneNode(true);
  const cardImage = placesItem.querySelector('.card__image');
  const cardTitle = placesItem.querySelector('.card__title');
  const likeButton = placesItem.querySelector('.card__like-button');
  const sumLikes = placesItem.querySelector('.number-likes');
  let likes = item.likes;
  const hasLike = likes.some((item) => item._id === user._id)

  cardImage.setAttribute('src', item.link);
  cardImage.setAttribute('alt', item.name);
  cardTitle.textContent = item.name;
  sumLikes.textContent = item.likes.length;

  cardImage.addEventListener('click', openCardModalImage);
  likeButton.addEventListener('click', (evt) => handleLike(evt, item._id));

  if (item.owner._id === user._id) {
    const deleteButton = document.createElement('button');
    deleteButton.setAttribute('class', 'card__delete-button');
    deleteButton.addEventListener('click', (evt) => {
      deleteOneCard(item._id)
      .catch(err => {
        console.error(err)
      })
      deleteCard(evt)
    });
    placesItem.appendChild(deleteButton);
  }

  if(hasLike) {
    likeButton.classList.toggle('card__like-button_is-active');
  }
  return placesItem;
}

// Функция нажатия на лайк
export function handleLike(evt, cardId) {
  const cardDesc = evt.target.closest('.card__description')
  const isActive = evt.target.classList.contains('card__like-button_is-active')
  const sumLikes = cardDesc.querySelector('.number-likes');
  const likeMethod = isActive ? deleteLike : putLike;

  likeMethod(cardId)
    .then((card) => {
      sumLikes.textContent = card.likes.length;
      evt.target.classList.toggle('card__like-button_is-active');
    })
    .catch(err => {
      console.error(err)
    })
}

// Функция удаления карточки
export function deleteCard(evt) {
  evt.target.closest('.places__item').remove();
}