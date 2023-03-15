import { createStore } from 'vuex';

export let store = createStore({
    state() {
        return {
            address: "",
            lights: [

            ]
        }
    },
    mutations: {
        addLightId(state, payload) {
            state.lights.push({
                lightId: payload.lightId,
                type: payload.type,
                nativeType: payload.thingType,
                role: payload.role
            });
            console.log(payload);
        },
        setServerAddress(state, address) {
            state.address = address;
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