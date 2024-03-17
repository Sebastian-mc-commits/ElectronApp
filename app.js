const { app, BrowserWindow, ipcMain } = require('electron')
const url = require("url");
const path = require("path");
const ipcServices = require("./electron/ipcMainHandlers/services.js")
const ipcHandlers = require("./electron/ipcMainHandlers/handlers.js")

let mainWindow

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    })

    mainWindow.loadURL(
        url.format({
            pathname: path.join(__dirname, `/dist/electron-app/browser/index.html`),
            protocol: "file:",
            slashes: true
        })
    );
    // Open the DevTools.
    mainWindow.webContents.openDevTools()

    mainWindow.on('closed', function () {
        mainWindow = null
    })

    ipcServices(ipcMain)
    ipcHandlers(ipcMain)
}

app.on('ready', createWindow)

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
    if (mainWindow === null) createWindow()
})
