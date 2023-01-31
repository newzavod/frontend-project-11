const getFeedByUrl = (url, feeds) => feeds.find((feed) => feed.url === url);
const getPostsForFeed = (feedId, posts) => posts.filter((post) => post.feedId === feedId);
const getUrls = (state) => state.rss.feeds.map(({ url }) => url);

export { getFeedByUrl, getPostsForFeed, getUrls };
