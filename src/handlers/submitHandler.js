import * as Yup from 'yup';
import download from './downloader.js';
import parse from './parser.js';
import save from './saver.js';
import { STATUS, ERRORS } from '../constants.js';

const errorTypes = {
  notOneOf: ERRORS.URL_NOT_UNIQ,
  url: ERRORS.INVALID_URL,
};

const validateUrl = (url, urls) => {
  const urlFormSchema = Yup.object().shape({
    url: Yup.string().trim().url().notOneOf(urls),
  });

  return urlFormSchema.validate(url).catch((e) => {
    throw Error(errorTypes[e.type]);
  });
};

export default (e, form, state) => {
  const urls = state.rss.feeds.map(({ url }) => url);
  const setState = (status, err = null) => {
    state.error = err;
    state.status = status;
  };

  e.preventDefault();
  const formData = Object.fromEntries(new FormData(form));
  state.status = STATUS.PENDING;

  validateUrl(formData, urls)
    .then(({ url }) => download(url))
    .then(({ data, url }) => {
      const feedData = parse({ data, url });
      save(feedData, state);

      setState(STATUS.SUCCESS);
    })
    .catch((err) => setState(STATUS.FAILED, err))
    .finally(() => {
      setState(STATUS.IDLE);
    });
};
