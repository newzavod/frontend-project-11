import { nanoid } from 'nanoid';
import { getFeedByUrl, getPostsForFeed } from '../helpers.js';

export default ({ feedInfo, feedPosts }, state) => {
  const { rss } = state;
  const urls = state.rss.feeds.map(({ url }) => url);
  const { url } = feedInfo;
  const feedId = getFeedByUrl(url, rss.feeds)?.id || nanoid(6);
  const existedPosts = getPostsForFeed(feedId, rss.posts);

  if (!urls.includes(url)) {
    rss.feeds = [...rss.feeds, { id: feedId, ...feedInfo }];
  }

  const preparedPosts = feedPosts
    .filter(({ guid }) => !existedPosts.map((post) => post.guid).includes(guid))
    .map((post) => ({
      feedId, ...post, id: nanoid(6), pubDate: Date.parse(post.pubDate),
    }));

  rss.posts = [...rss.posts, ...preparedPosts];
};