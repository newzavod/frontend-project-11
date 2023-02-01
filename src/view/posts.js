import { sortBy } from 'lodash/collection';

const styles = {
  visited: ['link-secondary', 'fw-normal'],
  unvisited: ['fw-bold'],
};

const buildButton = (post, t) => {
  const button = document.createElement('button');
  button.classList.add('btn', 'btn-sm', 'btn-outline-primary');
  button.dataset.bsToggle = 'modal';
  button.dataset.bsTarget = '#viewPostDetails';
  button.textContent = t('viewPostButton');
  button.dataset.postId = post.id;

  return button;
};

const buildLink = (post, isVisited) => {
  const linkStyles = isVisited ? styles.visited : styles.unvisited;

  const link = document.createElement('a');
  link.setAttribute('href', post.link);
  link.setAttribute('target', '_blank');

  link.classList.add(...linkStyles);
  link.textContent = post.title;
  link.dataset.postId = post.id;

  return link;
};

const renderPost = (post, isVisited, t) => {
  const postListItem = document.createElement('li');
  postListItem.classList.add(
    'd-flex',
    'justify-content-between',
    'border-0',
    'rounded-0',
    'list-group-item-action',
    'list-group-item',
    'align-items-center',
  );

  postListItem.append(buildLink(post, isVisited, t), buildButton(post, t));
  return postListItem;
};

export default (rss, visitedPostIds, ui, t) => {
  const { postContainer } = ui;
  const { posts } = rss;
  postContainer.innerHTML = '';

  if (!posts.length) {
    return;
  }

  const header = document.createElement('h3');

  header.textContent = t('postsHeader');
  header.classList.add('h3');
  postContainer.appendChild(header);

  const postList = document.createElement('ul');
  postList.classList.add('list-group');

  const postsListItems = sortBy(posts, 'pubDate')
    .reverse()
    .map((post) => {
      const isVisited = visitedPostIds.includes(post.id);
      return renderPost(post, isVisited, t);
    });

  postList.append(...postsListItems);
  postContainer.append(postList);
};
