require('dotenv').config()
import fetch from 'node-fetch'

// https://stackoverflow.com/a/69058154/1413302
const isTokenExpired = (token) => (Date.now() >= JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString()).exp * 1000)

/**
 * Use the privately stored refresh token to generate a new access token for
 * your RERUM-connected application. There is no way to authenticate this 
 * process, so protect your refresh token and replace it if it is exposed. 
 */
function generateNewAccessToken() {
    const payload = {
        method: 'POST',
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

/**
 * This will conduct a simple check against the expiry date in your token.
 * This does not validate your access token, so you may still be rejected by 
 * your RERUM instance as unauthorized.
 */
if (isTokenExpired(process.env.access_token)) { generateNewAccessToken() }
