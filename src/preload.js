import { contextBridge, ipcRenderer } from "electron";

// console.log("are you loaded?");

// alert("Hello");

contextBridge.exposeInMainWorld('electronAPI', {
    openMsgBox: (msg) => {
        ipcRenderer.invoke('test-ipc', {
            msg
        });
    }
})