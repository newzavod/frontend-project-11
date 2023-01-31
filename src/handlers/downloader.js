import axios from 'axios';

export default (url) => {
  const wrappedUrl = new URL('https://allorigins.hexlet.app/get');
  wrappedUrl.searchParams.append('disableCache', 'true');
  wrappedUrl.searchParams.append('url', url);

  return axios.get(wrappedUrl.toString()).then(({ data }) => ({ data, url }));
};
