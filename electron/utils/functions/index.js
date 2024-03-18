const { useFetch, getJWTToken, useFetchWithAuthorizationToken, convertToUseFetchObject } = require("./useFetch.js");
const { ERROR_MESSAGES, errorDialog, infoDialog } = require("./dialog.js")

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
    },
    errorDialog,
    infoDialog,
    ERROR_MESSAGES
};