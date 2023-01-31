export default (post) => {
  const postInfoModal = document.querySelector('#viewPostDetails');
  postInfoModal.querySelector('.modal-title').textContent = post.title;
  postInfoModal.querySelector('.modal-body').textContent = post.description;
  const readButton = postInfoModal.querySelector('#readPostButton');
  readButton.setAttribute('href', post.link);
  readButton.setAttribute('target', '_blank');
};
