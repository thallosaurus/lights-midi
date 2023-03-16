'use strict'

import { app, protocol, BrowserWindow, ipcMain, dialog } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import installExtension, { VUEJS3_DEVTOOLS } from 'electron-devtools-installer'
import path from 'path';
import input from './midi/input.js';
import { addEndpoint, sendToId, setServerAddress, removeEndpoint, assignEndpoint, send } from './midi/client.js';

const isDevelopment = process.env.NODE_ENV !== 'production'

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } }
])

async function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    // frame: false,
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      webSecurity: false,

      // Use pluginOptions.nodeIntegration, leave this alone
      // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
      nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
      contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION
    }
  });

  //bypassCors(win);

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    if (!process.env.IS_TEST) win.webContents.openDevTools()
  } else {
    createProtocol('app')
    // Load the index.html when not in development
    win.loadURL('app://./index.html')
  }
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {

  /*midiInput.on('message', (delta, msg) => {
    console.log("electron", delta, msg)
  })*/

  registerIPC(app);
  setupMidi();

  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      await installExtension(VUEJS3_DEVTOOLS)
    } catch (e) {
      console.error('Vue Devtools failed to install:', e.toString())
    }
  }
  createWindow()
})

// function quit() {

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}

function registerIPC(app) {
    //Setup IPCs here
    ipcMain.handle('test-ipc', (data, msg) => {
      console.log(msg);
      dialog.showMessageBox({
        message: msg.msg
      });
    });
  
    ipcMain.handle('commit-config', (data, cfg) => {
      console.log(cfg);
    });
  
    ipcMain.handle('app-quit', (data) => {
      console.log('quit');
      // quit();
      app.quit();
    });
  
    ipcMain.handle('set-server-address', (event, address) => {
      //write address to config here
      console.log('set-server-address', address);
      setServerAddress(address);
    })
    
    ipcMain.handle('register-endpoint', (event, payload) => {
      //add checked endpoint to endpoint register
      console.log('register-endpoint', payload);
      addEndpoint(payload);
    });

    ipcMain.handle('delete-endpoint', (event, endpointId) => {
      //add checked endpoint to endpoint register
      console.log('delete-endpoint', endpointId);
      removeEndpoint(endpointId);
    });

    ipcMain.handle('assign-note', (event, payload) => {
      //add checked endpoint to endpoint register
      const { note, endpointId } = payload;

      console.log('assign-note', note);
      assignEndpoint(note, endpointId);
      //removeEndpoint(endpointId);
    });
}

function setupMidi() {
  input.on('message', (delta, message) => {
    //sendToId()
    //decode message

    send(message);
  });
}