document.addEventListener('load', async () => {
    const profile = await window.electronApi.getProfile();

    document.getElementById('picture').src = profile.picture;
    document.getElementById('name').innerText = profile.name;
    document.getElementById('success').innerText = 'You successfully used OpenID Connect and OAuth 2.0 to authenticate.';
});

document.getElementById('logout').onclick = () => {
    window.electronApi.logout();
}

const promptInput = document.querySelector('#image-prompt-input');
const promptButton = document.querySelector('#send-prompt-button');
const promptImage = document.querySelector('#prompt-result');

promptButton.addEventListener('click', async () => {
    console.log('value', promptInput.value);
    // const response = await window.electronApi.makeApiRequest(promptInput.value);
    // console.log('response in renderer', response);
    // promptImage.src = response;
    // promptImage.alt = promptInput.value;
})

// document.getElementById('secured-request').onclick = async () => {
//     try {
//         const response = await window.electronApi.getPrivateData();
//         const messageDiv = document.getElementById('message');
//         messageDiv.innerText = response;
//         messageDiv.style.display = 'block';
//     } catch (error) {
//         console.error('Error connecting to the API: ' + error);
//     }
// }