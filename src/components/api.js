//Загрузка карточек с сервера
const config = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/wff-cohort-16',
  headers: {
    authorization: '86302fd8-e8eb-43c3-b292-e51885ed2960',
    'Content-Type': 'application/json'
  }
}

const handleResponse = (data) => {
  if(data.ok) {
    return data.json()
  }
  return Promise.reject(`Запрос: ${data.status}`);
}

const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {headers: config.headers})
  .then(handleResponse)
}

const getIProfile = () => {
  return fetch(`${config.baseUrl}/users/me`, {headers: config.headers})
  .then(handleResponse)
}

// получаем карточки и начальные данные
export const getInitialData = () => { 
  return Promise.all([getInitialCards(), getIProfile()])
  .then(([cards, user]) => { 
      return {cards, user} 
    })
}

//редактирование профиля
export const editProfileInformation = (newName, newJob) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: newName,
      about: newJob
    })
  })
  .then (handleResponse)
}

//добавление новой карточки
export const addNewCard = (nameNewCard, linkNewCard) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: nameNewCard,
      link: linkNewCard
    })
  })
  .then(handleResponse)
}

//Удаление карточки
export const deleteOneCard = (currentId) => {
  return fetch(`${config.baseUrl}/cards/${currentId}`, {
    method: 'DELETE',
    headers: config.headers
  })
  .then(handleResponse)
}

//Поставить лайк
export const putLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers
  })
  .then(handleResponse)
}

//Убрать лайк
export const deleteLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
  .then(handleResponse)
}

//Изменение аватара профиля
export const changeAvatar = (newAvatar) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: newAvatar
    })
  })
  .then(handleResponse)
}