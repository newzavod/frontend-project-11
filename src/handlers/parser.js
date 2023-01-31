import { ERRORS } from '../constants.js';

const parser = new DOMParser();

export default ({ data, url }) => {
  const { contents } = data;
  const xmlDoc = parser.parseFromString(contents, 'text/xml');
  if (!xmlDoc.querySelector('rss')) {
    throw new Error(ERRORS.INVALID_RSS);
  }

  const feed = xmlDoc.querySelector('channel');

  const feedPosts = Array.from(feed.childNodes)
    .filter((child) => child.nodeName === 'item')
    .map((post) => ({
      title: post.querySelector('title').innerHTML,
      description: post.querySelector('description').innerHTML,
      link: post.querySelector('link').innerHTML,
      pubDate: post.querySelector('pubDate').innerHTML,
      guid: post.querySelector('guid').innerHTML,
    }));

  const feedInfo = {
    url,
    description: feed.querySelector('description').firstChild?.nodeValue,
    title: feed.querySelector('title').firstChild?.nodeValue,
  };

  return { feedInfo, feedPosts };
};
