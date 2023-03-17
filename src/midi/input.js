import midi from '@julusian/midi';

const input = new midi.Input();

input.openVirtualPort("iobroker");
input.ignoreTypes(false, false, false);

input.on('message', (deltaTime, message) => {
    console.log(`m: ${message} d: ${deltaTime}`);
});

export default input;