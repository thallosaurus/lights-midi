<script>
import MpcBoard from '@/components/MpcBoard.vue';

export default {
    // eslint-disable-next-line
    name: "MidiPage",
    data() {
        return {
            test: "",
            noteOffset: 36
        };
    },
    mounted() {
        
    },
    components: { MpcBoard }
}
</script>

<template>
    <div>Here you can map the MIDI Notes to the Lights</div>
    <MpcBoard width="4" height="4" :offset="noteOffset"></MpcBoard>
</template>