// Централізована обробка помилок
export const handleError = (error: Error, customMessage?: string): void => {
  const errorMessages: Record<string, string> = {
    // localStorage ошибки
    QUOTA_EXCEEDED_ERR: 'Не вдалося зберегти дані. Сховище браузера переповнене.',
    STORAGE_ERROR: 'Помилка при роботі з локальним сховищем браузера.',

    // Ошибки загрузки данных
    DATA_LOAD_ERROR: 'Не вдалося завантажити дані вікторини.',
    JSON_PARSE_ERROR: 'Помилка при обробці даних.',

    // DOM ошибки
    MODAL_ERROR: 'Помилка при роботі з модальним вікном.',

    // Анимации
    ANIMATION_ERROR: 'Не вдалося запустити анімацію.',

    // Общие ошибки
    DEFAULT: 'Сталася непередбачена помилка.',
  };

  const message = customMessage || errorMessages[error.name] || errorMessages.DEFAULT;
  alert(message);

  if (process.env.NODE_ENV === 'development') {
    console.error('Error details:', error);
  }
};


// Тип для безпечного сховища
export const safeStorage = {
  setItem(key: string, value: string): void {
    try {
      localStorage.setItem(key, value);
    } catch (error: unknown) {
      if (error instanceof Error) {
        handleError(error, 'Не вдалося зберегти прогрес гри.');
      } else {
        handleError(new Error('Неизвестная ошибка'), 'Не вдалося зберегти прогрес гри.');
      }
    }
  },

  getItem<T = string | null>(key: string, defaultValue?: T): T | null {
    try {
      const item = localStorage.getItem(key);
      return item !== null ? (item as unknown as T) : defaultValue ?? null;
    } catch (error: unknown) {
      if (error instanceof Error) {
        handleError(error, 'Не вдалося завантажити збережений прогрес.');
      } else {
        handleError(new Error('Неизвестная ошибка'), 'Не вдалося завантажити збережений прогрес.');
      }
      return defaultValue ?? null;
    }
  },

  removeItem(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (error: unknown) {
      if (error instanceof Error) {
        handleError(error, 'Не вдалося видалити збережені дані.');
      } else {
        handleError(new Error('Неизвестная ошибка'), 'Не вдалося видалити збережені дані.');
      }
    }
  },
};

// Безпечне перетворення JSON
export const safeJsonParse = <T>(jsonString: string, defaultValue?: T | null): T | null => {
  try {
    return JSON.parse(jsonString) as T;
  } catch (error: unknown) {
    if (error instanceof Error) {
      handleError(error, 'Помилка при обробці даних гри.');
    } else {
      handleError(new Error('Неизвестная ошибка'), 'Помилка при обробці даних гри.');
    }
    return defaultValue ?? null;
  }
};

// Безпечне завантаження даних вікторини
export const safeLoadQuizData = (): Array<Record<string, unknown>> => {
  try {
    const context = require.context('../data', false, /\.json$/);
    return context.keys().map((key) => ({
      ...context(key),
      filename: key,
    }));
  } catch (error) {
    handleError(error as Error, 'Не вдалося завантажити дані вікторини.');
    return [];
  }
};

// Типы для DOM операций
export const safeDomOperations = {
  toggleModal(modalId: string, isVisible: boolean): void {
    try {
      const modal = document.getElementById(modalId);
      if (modal) {
        modal.style.display = isVisible ? 'flex' : 'none';
      }
    } catch (error) {
      handleError(error as Error, 'Помилка при роботі з модальним вікном.');
    }
  },

  getElement(id: string): HTMLElement | null {
    try {
      return document.getElementById(id);
    } catch (error) {
      handleError(error as Error, 'Помилка при роботі з елементом сторінки.');
      return null;
    }
  },
};