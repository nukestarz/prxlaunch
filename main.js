// Modules to control application life and create native browser window
const { app, BrowserWindow } = require("electron");
const path = require("path");
const url = require("url");
const FiveM = require("fivem");
// const srv = new FiveM.Server('131.153.76.90:30120');

let win, splash;
let onlineStatusWindow;
var IMG_DIR = "/img/";

// srv.getPlayers().then(data => console.log(data))

function createWindow() {
    win = new BrowserWindow({
        width: 1314,
        height: 748,
        //titleBarStyle: "hidden",
        show: false,
        resizable: false,
        //frame: false,
         icon: path.join(__dirname, IMG_DIR, "logo.png"),
        // transparent: true,
         webPreferences: {
            preload: path.join(__dirname, "preload.js"),
            // nodeIntegration: true,
            // devTools: true,
         },
    });
    win.setMenu(null)
    
    splash = new BrowserWindow({ width: 810, height: 610, transparent: true, frame: false, alwaysOnTop: true });
    splash.loadURL(`file://${__dirname}/splash.html`);
    win.loadFile("index.html");
    win.webContents.openDevTools();
}

app.on("ready", () => {
    // Create the browser window.
    createWindow();
    // and load the index.html of the app.

    // Open the DevTools.
    //win.webContents.openDevTools()

    // Emitted when the window is closed.
    win.on("closed", () => {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        win = null;
    });

    win.once("ready-to-show", () => {
        setTimeout(() => {
            splash.destroy();
            win.show();
        }, 5000);
    });
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.

// Quit when all windows are closed.
app.on("window-all-closed", () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== "darwin") {
        app.quit();
    }
});

app.on("activate", () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
        createWindow();
    }
});
