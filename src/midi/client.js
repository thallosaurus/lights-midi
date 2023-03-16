import rest from 'rest';


let address = "http://localhost:8087";

const endpointMap = new Map();
const noteAssignments = new Map();

const NOTE_ON = 9;
const NOTE_OFF = 8;

export function send(msg) {
    //console.log(msg);
    //decode message
    const cmd = (msg[0] & 0b11110000) >> 4;
    const port = (msg[0] & 0b00001111);
    let note = String(msg[1]);

    switch (cmd) {
        case NOTE_ON:
            if (noteAssignments.has(note)) {
                let id = noteAssignments.get(note)
                console.log(cmd, port, note, id);
                sendToId(id, "set", true);
            }
            break;

        case NOTE_OFF:
            console.log(cmd, port);
            if (noteAssignments.has(note)) {
                let id = noteAssignments.get(note)
                console.log(cmd, port, note, id);
                sendToId(id, "set", false);
            }
            break;

        default:
            break;
    }
}

export function sendToId(id, method, value) {
    //console.log("Sending request", method, address, endpoint, value);

    let link = `${address}/${method}/${id}?val=${value}&type=boolean`;
    console.log(link);

    rest(link).then(function (response) {
        //http://172.16.0.8:8087/set/deconz.0.Lights.1.on?val=false&type=boolean
        // parsed response body as js object
        // raw response
        console.log(response);
    });
}

export function setServerAddress(addr) {
    address = addr;
}

export function addEndpoint(endpoint) {
    console.log("add endpoint", endpoint);
    endpointMap.set(endpoint.lightId, endpoint);
    console.log(endpointMap)
}

export function removeEndpoint(endpointId) {
    endpointMap.delete(endpointId);
    console.log(endpointMap)
}

export function assignEndpoint(note, id) {
    if (endpointMap.has(id)) {
        noteAssignments.set(note, id);
    } else {
        throw new Error("Endpoint with id " + id + " doesnt exist");
    }
}