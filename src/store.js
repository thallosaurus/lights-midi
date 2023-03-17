import { createStore } from 'vuex';


/*ipcMain.on("config", function (event, data) {
    console.log("received data", data)
    alert("received data")
});*/


export let store = createStore({
    state() {
        return {
            address: "",
            lights: [

            ],
            assignments: {}
        }
    },
    mutations: {
        addLightId(state, payload) {
            window.electronAPI.registerEndpoint(payload);
            state.lights.push(payload);
            console.log(payload);
        },
        deleteLightId(state, payload) {
            //let index = state.lights.indexOf(payload);
            let light = state.lights[payload];
            //debugger;
            window.electronAPI.removeEndpoint(light.lightId);
            state.lights.splice(payload);
        },
        setServerAddress(state, address) {
            window.electronAPI.setServer(address);
            state.address = address;
        },
        assign(state, payload) {
            state.assignments[payload.note] = payload.address;
            window.electronAPI.assignToNote(payload);
        }
    }
})

export function getAsJson() {
    return JSON.parse({
        count: store.count
    });
}

export async function commitConfig() {
    await window.electronAPI.commitConfig({
        address: store.address,
        lights: lights
    });
}