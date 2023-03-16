import { contextBridge, ipcRenderer } from "electron";

// console.log("are you loaded?");
// alert("Hello");

contextBridge.exposeInMainWorld('electronAPI', {
    openMsgBox: (msg) => {
        ipcRenderer.invoke('test-ipc', {
            msg
        });
    },
    commitConfig: (cfg) => {
        ipcRenderer.invoke('commit-config', cfg);
    },

    quit: () => {
        ipcRenderer.invoke('app-quit');
    },
    registerEndpoint: (endpoint) => {
        ipcRenderer.invoke('register-endpoint', endpoint);
    },
    removeEndpoint: (endpointId) => {
        ipcRenderer.invoke('delete-endpoint', endpointId);
    },
    setServer: (address) => {
        ipcRenderer.invoke('set-server-address', address);
    },
    assignToNote: (note) => {
        ipcRenderer.invoke('assign-note', note);
    }
})