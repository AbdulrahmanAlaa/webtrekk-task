const os = require("os");

const baseUrl = `http://${os.hostname()}:${process.env.PORT || 8080}`
module.exports = {
    JWT: {
        SECRETE: 'fab09a09-7de5-4675-8ba6-f402965eec86'
    },
    FACEBOOK: {
        APP_ID: 307774006437737,
        SECRET: '32ed2585b40535e7bbf1c57b2668802d',
        CALLBACKURL: `${baseUrl}/api/auth/facebook/callback`
    },
    GOOGLE: {
        CLIENT: '412651205299-avr83n5f78ia6jrvjf10kibck56slbam.apps.googleusercontent.com',
        SECRET: 'vDW_MP6c6CCUNTdX0LSdzZb6',
        CALLBACKURL: `${baseUrl}/api/auth/google/callback`
    },
    LINKEDIN: {
        KEY: '77qudy29y2tim4',
        SECRET: 'onNwBiKCBiFtdSe6',
        CALLBACKURL: `${baseUrl}/api/auth/linkedin/callback`
    }
}