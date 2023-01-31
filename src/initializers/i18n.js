import i18next from 'i18next';
import ru from '../locales/ru';

const i18nConfig = {
  lng: 'ru',
  debug: true,
  resources: {
    ru,
  },
};

export default i18next
  .createInstance()
  .init(i18nConfig);
