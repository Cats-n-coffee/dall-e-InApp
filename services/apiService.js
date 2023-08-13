const envVariables = require('../env-variables.json');
const { Configuration, OpenAIApi } = require('openai');

async function makeApiRequest(promptString = '') {
    // HANDLE THE EMPTY STRING
    if (!promptString) return;

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
    
        return response.data.data[0]['url'];
    } catch (err) {
        throw err;
    } 
}

module.exports = {
    makeApiRequest,
}
