const { dialog } = require("electron")

const ERROR_MESSAGES = {
    NO_CONNECTION: "You are not connected",
    COULD_NOT_SAVE: "There was an error saving data"
}


const infoDialog = (message) => dialog.showMessageBox({
    type: 'info',
    title: 'Information',
    message
});

const errorDialog = (message) => dialog.showMessageBox({
    type: 'error',
    title: 'Error',
    message
});

module.exports = {
    ERROR_MESSAGES,
    infoDialog,
    errorDialog
}