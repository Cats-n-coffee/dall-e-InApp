document.addEventListener('DOMContentLoaded', async () => {
    const profile = await window.electronApi.getProfile();

    document.querySelector('#picture').src = profile.picture;

    const successBanner = document.querySelector('#success');
    successBanner.innerText = 'You successfully used OpenID Connect and OAuth 2.0 to authenticate.';
    setTimeout(() => {
        successBanner.style.height = '0px';
        successBanner.style.padding = '0px';
    }, 3000);
})

const logoutButton = document.querySelector('#logout');

logoutButton.addEventListener('click', () => {
    window.electronApi.logout();
});

const promptInput = document.querySelector('#image-prompt-input');
const promptButton = document.querySelector('#send-prompt-button');
const promptImage = document.querySelector('#prompt-result');
const promptError = document.querySelector('#prompt-error');

promptButton.addEventListener('click', async () => {
    const trimmedInput = promptInput.value.trim();

    if (trimmedInput.length && trimmedInput.includes(' ')) {
        const response = await window.electronApi.makeApiRequest(promptInput.value);
        promptImage.src = response;
        promptImage.alt = promptInput.value;
    }
    // Basic erorr handling, OpenAI prompts need to have more than 1 word
    if (trimmedInput.length && !trimmedInput.includes(' ')) {
        promptError.classList.add('alert');
        promptError.style.height = 'auto';
        promptError.style.padding = '6px';

        setTimeout(() => {
            promptError.classList.remove('alert');
            promptError.style.height = '0px';
            promptError.style.padding = '0px';
            promptError.style.transition = '400ms ease-in-out';
        }, 3000);
    }
})
