import jazzMidiElectron from 'jazz-midi-electron';
import JZZ from 'jzz';

JZZ.requestMIDIAccess();

console.log("AAAA")

JZZ().openMidiOut("iobroker");
JZZ().openMidiIn("iobroker");
export default JZZ();

/*const midiInput = new midi.input();
midiInput.openVirtualPort("ioBroker");
export default midiInput;*/
