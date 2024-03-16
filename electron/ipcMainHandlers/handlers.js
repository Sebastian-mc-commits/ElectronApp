const { BrowserWindow } = require("electron")
const { convertToUseFetchObject } = require("../utils/functions")
const { USD_to_COP, USD_to_EURO } = require("../utils/constants/currency.converter")

module.exports = (ipcMain) => {
    ipcMain.on("open-new-window:args", (event, args) => {

        const { join, resolve } = require("path")
        const newWidow = new BrowserWindow({
            width: 800,
            height: 600,
            webPreferences: {
                nodeIntegration: true,
                contextIsolation: false
            }
        })

        const path = join(resolve(__dirname, "..", ".."), "/dist/electron-app/browser/index.html")
        newWidow.loadURL(path)

        const hasError = !(Object.keys(args).length > 0 && Object.values(args).every(val => !!val))

        const dataToSend = convertToUseFetchObject({
            response: args,
            hasError,
            customErrorMessage: hasError ? "" : "Parameters missing in route path"
        })

        newWidow.on("ready-to-show", () => {
            newWidow.webContents.send("on-open-window", dataToSend)
        })
    })

    ipcMain.on("USD-converter", (event, value) => {

        value = parseFloat(value)
        event.reply("USD-converter", convertToUseFetchObject({
            response: {
                COP: USD_to_COP(value),
                EURO: USD_to_EURO(value)
            }
        }))
    })
}