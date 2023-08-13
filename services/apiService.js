// const axios = require('axios');
const envVariables = require('../env-variables.json');
const { Configuration, OpenAIApi } = require('openai');

async function makeApiRequest(promptString = '') {
    // HANDLE THE EMPTY STRING
    const configuration = new Configuration({
        apiKey: envVariables.openAIKey,
    });
    const openai = new OpenAIApi(configuration);

    try {
        const response = await openai.createImage({
            prompt: promptString,
            n: 1,
            size: '1024x1024',
        });
    
        console.log('response in apiService', response);
        console.log('TRYING TO GET', response.data.data[0]['url']);
        return response.data.data[0]['url'];
    } catch (err) {
        console.log('ERROR PRINTING', err);
        throw err;
    } 
}

module.exports = {
    makeApiRequest,
}
