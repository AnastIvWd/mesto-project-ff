// функция открытия модалки
export function openModal (modal) {
  modal.classList.add('popup_is-opened');
  document.addEventListener('keydown', handelEscKeydown);
}

//функция закрытия модалки
export function closeModal (modal) {
  modal.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', handelEscKeydown);
}

export function changeModalState(form, isUploading) {
  const submitButtun = form.querySelector('.popup__button');

  submitButtun.textContent = isUploading ? 'Сохранение...' : 'Сохранить';
}

// закрытие на esc
export function handelEscKeydown(evt) {
  if (evt.key === 'Escape') { 
    const openedModal = document.querySelector('.popup_is-opened'); 
    closeModal(openedModal);
  }
}

// закрытие на оверлей или кнопку х
export function handleModalClose(evt) {
  const isCloseButton = evt.target.classList.contains('popup__close');
  const isOverlay = !evt.target.closest('.popup__content');

  if (isCloseButton || isOverlay) {
    closeModal(evt.currentTarget);
  }
}