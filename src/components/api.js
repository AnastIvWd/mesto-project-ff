import { data } from "autoprefixer";

//Загрузка карточек с сервера
const config = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/wff-cohort-16',
  headers: {
    authorization: '86302fd8-e8eb-43c3-b292-e51885ed2960',
    'Content-Type': 'application/json'
  }
}

// получаем карточки и начальные данные
export const getInitialData = () => {
  return Promise.all([
    fetch(`${config.baseUrl}/cards`, {headers: config.headers}),
    fetch(`${config.baseUrl}/users/me`, {headers: config.headers})  
  ])
    .then(([data1, data2]) => {
      if(data1.ok && data2.ok) {
        return Promise.all([
          data1.json(),
          data2.json()
        ])
      }
      return Promise.reject(`Запрос 1: ${data1.status} Запрос 2: ${data2.status}`);
    })
    .then(([cards, user]) => {
      return {cards, user}
    })
    .catch(err => {
      console.error(err)
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
  .then ((data) => {
    if(data.ok) {
      return data.json()
    }
    return Promise.reject(`Запрос: ${data.status}`);
  })
  .catch(err => {
    console.error(err)
  })
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
  .then((data) => {
    if(data.ok) {
      return data.json()
    }
    return Promise.reject(`Запрос: ${data.status}`);
  })
  .catch(err => {
    console.error(err)
  })
}

//Удаление карточки
export const deleteOneCard = (currentId) => {
  return fetch(`${config.baseUrl}/cards/${currentId}`, {
    method: 'DELETE',
    headers: config.headers
  })
  .then((data) => {
    if(data.ok) {
      return data.json()
    }
    return Promise.reject(`Запрос: ${data.status}`);
  })
  .catch(err => {
    console.error(err)
  })
}

//Поставить лайк
export const putLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers
  })
  .then((data) => {
    if(data.ok) {
      return data.json()
    }
    return Promise.reject(`Запрос: ${data.status}`);
  })
  .catch(err => {
    console.error(err)
  })
}

//Убрать лайк
export const deleteLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
  .then((data) => {
    if(data.ok) {
      return data.json()
    }
    return Promise.reject(`Запрос: ${data.status}`);
  })
  .catch(err => {
    console.error(err)
  })
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
  .then((data) => {
    if(data.ok) {
      return data.json()
    }
    return Promise.reject(`Запрос: ${data.status}`);
  })
  .catch(err => {
    console.error(err)
  })
}