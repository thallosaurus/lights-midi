import { contextBridge, ipcRenderer } from "electron";

// console.log("are you loaded?");

// alert("Hello");

contextBridge.exposeInMainWorld('electronAPI', {
    openMsgBox: (msg) => {
        ipcRenderer.send('test-ipc', {
            msg: msg
        });
    }
})