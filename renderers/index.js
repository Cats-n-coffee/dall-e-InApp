document.addEventListener('DOMContentLoaded', async () => {
    const profile = await window.electronApi.getProfile();

    document.querySelector('#picture').src = profile.picture;
    document.querySelector('#name').innerText = profile.name;

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

promptButton.addEventListener('click', async () => {
    const trimmedInput = promptInput.value.trim();

    if (trimmedInput.length && trimmedInput.includes(' ')) {
        const response = await window.electronApi.makeApiRequest(promptInput.value);
        console.log('response in renderer', response);
        promptImage.src = response;
        promptImage.alt = promptInput.value;
    }
})
