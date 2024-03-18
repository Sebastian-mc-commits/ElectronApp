const { app, BrowserWindow, ipcMain, screen } = require('electron')
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

    const { width, height } = screen.getPrimaryDisplay().workAreaSize

    const windowWidth = Math.floor(width * 0.4);

    mainWindow.setBounds({
        x: width - windowWidth,
        y: 0,
        width: windowWidth,
        height
    })

    mainWindow.loadFile(path.join(__dirname, "dist", "electron-app", "browser", "index.html"))
    // mainWindow.loadFile(
    //     url.format({
    //         pathname: path.join(__dirname, `/dist/electron-app/browser/index.html`),
    //         protocol: "file:",
    //         slashes: true
    //     })
    // );

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

