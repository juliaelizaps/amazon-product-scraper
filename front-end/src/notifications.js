/**
 * Displays a temporary message on the screen.
 * 
 * @param {string} message - The text message to display.
 * @param {string} [type='error'] - Type of message ('error' or 'success') which determines styling.
 *
 * The message is shown in the element with id 'message' and automatically hidden after 5 seconds.
 */

function showMessage(message, type = 'error') {
    const messageEl = document.getElementById('message');
    messageEl.textContent = message;
    messageEl.className = type === 'error' ? 'error' : 'success';
    messageEl.classList.remove('hidden');
    setTimeout(() => {
      messageEl.classList.add('hidden');
    }, 5000); 
  }
  