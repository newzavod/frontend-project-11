import renderPosts from '../view/posts.js';
import renderChannels from '../view/channels.js';
import renderHeader from '../view/header.js';
import renderModal from '../view/modal.js';

export default function render(path, current, ui, state, t) {
  const { rss } = state;

  switch (path) {
    case 'error':
    case 'status': {
      renderHeader(path, current, ui, t);
      break;
    }
    case 'rss.feeds': {
      renderChannels(rss, ui, t);
      break;
    }
    case 'visitedPostIds':
    case 'rss.posts': {
      const { visitedPostIds } = state;
      renderPosts(rss, visitedPostIds, ui, t);
      break;
    }
    case 'postInModalWindow':
      if (!current) {
        return;
      }
      renderModal(current);
      break;
    default:
  }
}
