// добавляет класс с ошибкой
const showInputError = (validationConfig, formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(validationConfig.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(validationConfig.errorClass);
};
  
// удаляет класс с ошибкой
const hideInputError = (validationConfig, formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(validationConfig.inputErrorClass);
  errorElement.classList.remove(validationConfig.errorClass);
  errorElement.textContent = '';
};
  
  // проверяет валидность поля, сообщение об ошибке
const isValid = (validationConfig, formElement, inputElement) => {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }
  if (!inputElement.validity.valid) {
    showInputError(validationConfig, formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(validationConfig, formElement, inputElement);
  }
};

// добавляет полям формы обработчики
const setEventListeners = (validationConfig, formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
  const formButton = formElement.querySelector(validationConfig.submitButtonSelector);

  toggleButtonState(validationConfig, inputList, formButton);
  
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(validationConfig, formElement, inputElement);
      toggleButtonState(validationConfig, inputList, formButton);
    });
  });
};

// проверяет наличие невалидного поля
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
};

const disableSubmitButton = (buttonElement, className) => {
  buttonElement.disabled = true;
  buttonElement.classList.add(className);
}
  
// меняет состояние кнопки
const toggleButtonState = (validationConfig, inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    disableSubmitButton(buttonElement, validationConfig.inactiveButtonClass);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(validationConfig.inactiveButtonClass);
  }
};

  // перебирает все формы на странице
export const enableValidation = (validationConfig) => {
  const formList = document.querySelectorAll(validationConfig.formSelector);

  formList.forEach((formElement) => {
    setEventListeners(validationConfig, formElement);
  });
}

// очистка формы от сообщений об ошибках
export const clearValidation = (validationConfig, formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
  const submitButtun = formElement.querySelector('.popup__button');
  disableSubmitButton(submitButtun, validationConfig.inactiveButtonClass);

  inputList.forEach((inputElement) => {
    hideInputError(validationConfig, formElement, inputElement);
  });
};