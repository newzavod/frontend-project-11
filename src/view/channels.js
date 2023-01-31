import i18n from '../initializers/i18n.js';

export default (rss, ui) => {
  const { feedsContainer } = ui;
  const { feeds } = rss;
  feedsContainer.innerHTML = '';
  if (!feeds.length) {
    return;
  }

  const header = document.createElement('h3');
  i18n.then((t) => {
    header.textContent = t('feedsHeader');
  });
  header.classList.add('h3');

  const feedListItems = feeds.map((feed) => {
    const newFeed = document.createElement('div');
    const newFeedTitle = document.createElement('h5');
    const newFeedDescription = document.createElement('p');
    newFeedTitle.textContent = feed.title;
    newFeedDescription.classList.add('text-muted');
    newFeedDescription.textContent = feed.description;
    newFeed.append(newFeedTitle, newFeedDescription);
    return newFeed;
  });
  feedsContainer.append(header, ...feedListItems);
};
