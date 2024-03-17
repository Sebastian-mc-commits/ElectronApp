const { useFetch, getJWTToken, useFetchWithAuthorizationToken, convertToUseFetchObject } = require("./useFetch.js");

module.exports = {
    useFetch,
    getJWTToken,
    useFetchWithAuthorizationToken,
    convertToUseFetchObject,
    isJson: (str) => {
        try {
            JSON.parse(str);
            return true;
        } catch {
            return false;
        }
    }
};