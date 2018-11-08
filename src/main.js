const electron = require('electron');
const path = require('path');
const url = require('url');

const { app, BrowserWindow } = electron;

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;
let loading;

const createWindow = () => {
    loading = new BrowserWindow({
        center: true,
        closable: false,
        frame: false,
        frame: false,
        fullscreenable: false,
        height: 300,
        maximizable: false,
        minimizable: false,
        movable: false,
        resizable: false,
        title: 'Teller Wallet Loading...',
        width: 240,
    });
    // Create the browser window.
    mainWindow = new BrowserWindow({
        autoHideMenuBar: true,
        frame: true,
        height: 800,
        minHeight: 800,
        minWidth: 1280,
        show: false,
        title: 'Teller Wallet',
        width: 1280,        
    });

    const startUrl = process.env.ELECTRON_START_URL || url.format({
      pathname: path.join(__dirname, '/../build/index.html'),
      protocol: 'file:',
      slashes: true
    });

    const loadingUrl = process.env.ELECTRON_LOADING_URL || url.format({
        pathname: path.join(__dirname, '/../build/loading.html'),
        protocol: 'file:',
        slashes: true
    });

    loading.loadURL(loadingUrl);
    mainWindow.loadURL(startUrl);
    mainWindow.once('ready-to-show', () => {
        mainWindow.show();
        loading.hide();
        loading.close();
    });
    // Open the DevTools.
    // mainWindow.webContents.openDevTools();

    mainWindow.webContents.on('new-window', (event, windowUrl) => {
        event.preventDefault();
        shell.openExternal(windowUrl);
    });
    // Emitted when the window is closed.
    mainWindow.on('closed', () => {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null
    })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
});

app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow();
    }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.