export const showMessage = (message: string, type: string = 'info') => {
    const messageBox = document.getElementById('messageBox');
    if (!(messageBox instanceof HTMLElement))
        return;

    messageBox.textContent = message;
    messageBox.classList.remove('show', 'message-box-error', 'message-box-success', 'message-box-info');

    if (type === 'error') {
        messageBox.classList.add('message-box-error');
    } else if (type === 'success') {
        messageBox.classList.add('message-box-success');
    } else { // info
        messageBox.classList.add('message-box-info');
    }
    messageBox.classList.add('show');

    // Hide message after 5 seconds
    const id = setTimeout(() => {
        messageBox.classList.remove('show');
        clearTimeout(id);
    }, 5000);
}