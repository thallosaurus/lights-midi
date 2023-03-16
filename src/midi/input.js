import midi from '@julusian/midi';

const input = new midi.Input();

//IT FUCKING WORKed... :(
input.openVirtualPort("iobroker");
input.ignoreTypes(false, false, false);

input.on('message', (deltaTime, message) => {
    console.log(`m: ${message} d: ${deltaTime}`);
});


/*JZZ.requestMIDIAccess().then((data) => {
    console.log(data);
});/*, (err) => {
    console.error(err);

console.log("AAAA")

JZZ().openMidiOut("iobroker");
JZZ().openMidiIn("iobroker");*/
export default input;

/*const midiInput = new midi.input();
midiInput.openVirtualPort("ioBroker");
export default midiInput;*/