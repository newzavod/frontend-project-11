import onChange from 'on-change';
import submit from './handlers/submitHandler.js';
import render from './handlers/render.js';
import { DELAY, STATUS } from './constants.js';
import download from './handlers/downloader.js';
import parse from './handlers/parser.js';
import save from './handlers/saver.js';
import { getUrls } from './helpers.js';
import i18n from './initializers/i18n.js';

const addPostsEventListener = (postContainer, state) => {
  postContainer.addEventListener('click', (e) => {
    const { postId } = e.target.dataset;
    state.visitedPostIds = [...state.visitedPostIds, postId];
    if (e.target.tagName === 'BUTTON') {
      state.postInModalWindow = state.rss.posts.find((post) => post.id === postId);
    }
  });
};

const refetchFeeds = (state) => {
  const urls = getUrls(state);

  Promise.all(urls.map((url) => download(url)
    .then(({ data }) => {
      const feedData = parse({ data, url });
      save(feedData, state);
    })))
    .finally(() => {
      setTimeout(() => refetchFeeds(state), DELAY);
    });
};

export default () => {
  const initState = {
    error: null,
    status: STATUS.IDLE,
    rss: { feeds: [], posts: [] },
    visitedPostIds: [],
    postInModalWindow: null,
  };

  const ui = {
    feedbackLabel: document.querySelector('[aria-label="feedback"]'),
    urlInput: document.querySelector('[aria-label="url"]'),
    submitButton: document.querySelector('header [type="submit"]'),
    feedsContainer: document.querySelector('.feeds'),
    postContainer: document.querySelector('.posts'),
    closeModalButtons: document.querySelectorAll('[data-bs-dismiss="modal"]'),
  };

  function onChangeHandler(path, current) {
    i18n.then((t) => {
      render(path, current, ui, this, t);
    });
  }

  const state = onChange(initState, onChangeHandler);
  const form = document.querySelector('form');
  form.addEventListener('submit', (e) => submit(e, form, state));
  refetchFeeds(state);
  addPostsEventListener(ui.postContainer, state);
  ui.closeModalButtons.forEach((btn) => {
    btn.addEventListener('click', state.postInModalWindow = null);
  });
};
