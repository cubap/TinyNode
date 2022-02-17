require('dotenv').config()

// https://stackoverflow.com/a/69058154/1413302
const isTokenExpired = (token) => (Date.now() >= JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString()).exp * 1000)

function generateNewAccessToken() {
    const payload = {
        methdo: 'POST',
        body: JSON.stringify({ refresh_token: process.env.refresh_token })
    }
    fetch(process.env.RERUM_ACCESS_TOKEN_URL, payload)
        .then(response => {
            if (response.ok) {
                return response.json()
            }
            return Promise.reject(response)
        })
        .then(tokenObject => process.env.access_token = tokenObject.access_token)
        .catch(err => console.error("Token not updated: ", err))
    console.warn("Access Token expired. Consider updating your .env files")
}

// run once onload
if (isTokenExpired(process.env.access_token)) { generateNewAccessToken() }
