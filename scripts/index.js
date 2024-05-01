// @todo: Темплейт карточки
const placesCards = document.querySelector('.places');
const placesList = placesCards.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content;
/* <template id="card-template">
  <li class="places__item card">
    <img class="card__image" src="" alt="" />
    <button type="button" class="card__delete-button"></button>
    <div class="card__description">
      <h2 class="card__title">
      </h2>
      <button type="button" class="card__like-button"></button>
    </div>
  </li>
</template> */

// @todo: Функция создания карточки
function addCard(item, deleteCard) {
  const placesItem = cardTemplate.querySelector('.places__item').cloneNode(true);
  const cardImage = placesItem.querySelector('.card__image');
  const cardTitle = placesItem.querySelector('.card__title');
  const deleteButton = placesItem.querySelector('.card__delete-button');

  cardImage.setAttribute('src', item.link);
  cardImage.setAttribute('alt', item.name);
  cardTitle.textContent = item.name;
  deleteButton.addEventListener('click', deleteCard);
  placesList.append(placesItem);
}

// @todo: Функция удаления карточки
function deleteCard(evt) {
  evt.target.closest('.places__item').remove();
}

// @todo: Вывести карточки на страницу
initialCards.forEach((item) => {
  addCard(item, deleteCard);
});