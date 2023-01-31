import { STATUS } from '../constants';

const isFormDisabled = (status) => status === STATUS.PENDING;

export default (path, current, ui, t) => {
  const { submitButton, urlInput, feedbackLabel } = ui;
  switch (path) {
    case 'status': {
      urlInput.disabled = isFormDisabled(current);
      submitButton.disabled = isFormDisabled(current);
      if (current === STATUS.SUCCESS) {
        urlInput.value = '';
        feedbackLabel.textContent = t('success');
        feedbackLabel.classList.remove('text-danger', 'text-info');
        feedbackLabel.classList.add('text-success');
      }
      if (current === STATUS.PENDING) {
        feedbackLabel.textContent = t('downloading');
        feedbackLabel.classList.remove('text-success', 'text-danger');
        feedbackLabel.classList.add('text-info');
      }
      break;
    }
    case 'error': {
      if (!current) {
        return;
      }
      feedbackLabel.classList.remove('text-success');
      feedbackLabel.classList.add('text-danger');
      feedbackLabel.textContent = t(['errors', current.message].join('.'));
      break;
    }
    default: {
      break;
    }
  }
};
