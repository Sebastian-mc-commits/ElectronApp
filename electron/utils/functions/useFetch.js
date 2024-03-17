let token = ""
const useFetch = async (url, config) => {

    let hasError = false
    let errorMessage = ""
    let request = {}
    let response = {}

    try {
        request = await fetch(url, config)
        response = await request.json()
    }
    catch (err) {
        hasError = true
        errorMessage = err.message
    }

    return {
        hasError,
        errorMessage,
        request,
        response
    }
}

const convertToUseFetchObject = ({
    request = {},
    response = {},
    hasError = false,
    errorMessage = "",
    customErrorMessage = "",
}) => {

    return {
        hasError,
        errorMessage,
        request,
        response,
        customErrorMessage
    }
}

const getJWTToken = (path, requestMethod = "GET") => {
    const { sign } = require('jsonwebtoken');
    const crypto = require('crypto');
    const { SERVICE_NAME, KEY_NAME, KEY_SECRET, URL, ALGORITHM } = require("../../config/index.js")
    const uri = requestMethod + ' ' + URL + path;
    return sign(
        {
            aud: [SERVICE_NAME],
            iss: 'coinbase-cloud',
            nbf: Math.floor(Date.now() / 1000),
            exp: Math.floor(Date.now() / 1000) + 120,
            sub: KEY_NAME,
            uri,
        },
        KEY_SECRET,
        {
            algorithm: ALGORITHM,
            header: {
                kid: KEY_NAME,
                nonce: crypto.randomBytes(16).toString('hex'),
            },
        }
    )
}

const useFetchWithAuthorizationToken = async ({
    url,
    tokenUrl
}, config = {}) => {

    if (token === "") {
        token = getJWTToken(tokenUrl)
    }

    let data = await useFetch(url, {
        url,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        ...config
    })

    if (data.hasError) {
        token = getJWTToken(tokenUrl)
        data = await useFetch(url, {
            url,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            ...config
        })
    }

    return data
}

module.exports = {
    getJWTToken,
    useFetch,
    useFetchWithAuthorizationToken,
    convertToUseFetchObject
}