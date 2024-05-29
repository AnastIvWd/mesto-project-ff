// функция открытия модалки
export function openModal (modal) {
  modal.classList.add('popup_is-opened');
}

//функция закрытия модалки
export function closeModal (modal) {
  modal.classList.remove('popup_is-opened');
}

// закрытие на esc
export function handelEscKeydown(evt) {
  if (evt.key === 'Escape') { 
    const openedModal = document.querySelector('.popup_is-opened'); 
    closeModal(openedModal);
    document.removeEventListener('keydown', handelEscKeydown);
  }
}

// закрытие на оверлей или кнопку х
export function handleModalClose(evt) {
  const isCloseButton = evt.target.classList.contains('popup__close');
  const isOverlay = !evt.target.closest('.popup__content');

  if (isCloseButton || isOverlay) {
    const openedModal = document.querySelector('.popup_is-opened');
    closeModal(openedModal);
    document.removeEventListener('keydown', handelEscKeydown);
  }
}