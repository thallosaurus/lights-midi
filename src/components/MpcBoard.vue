<script setup>
import DialogComponent from './DialogComponent.vue';
import EndpointPicker from './EndpointPicker.vue';

</script>
<script>
const C1 = 36;
const labels = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
export default {
    props: ["width", "height", "offset"],
    methods: {
        assign(event) {
            let selected = event.target.selectedOptions[0];
            let note = event.target.dataset.noteId;
            console.log(selected.value, note);
            this.$store.commit("assign", { note, endpointId: selected.value });
        },
        editAssignment(event) {
            alert("click");
            console.log(event);
        }
    },
    components: { DialogComponent }
}
</script>

<template>
    <div class="parent">
        <!---<div class="col" v-for="w in Number(this.width)" :key="w">
                                <button class="fixed-width fixed-height" type="button">X</button>-->
        <div class="picker fixed-width fixed-height" v-for="i in 16" :key="i">
            <form @change="assign">
                <EndpointPicker :data-note-id="this.offset + (i - 1)" class="fixed-width fixed-height-half">
                </EndpointPicker>
                <button type="button" class="btn btn-primary fixed-height-half fixed-width"
                    data-bs-toggle="modal"
                    :data-bs-target="'#dialog-' + this.offset + (i - 1)">{{ labels[(i - 1) % 12] }} {{ i }}</button>

                <DialogComponent :id="'dialog-' + this.offset + (i - 1)" title="Edit" :submit="editAssignment">
                    <p>coming soon</p>
                </DialogComponent>
            </form>
        </div>
    </div>
</template>

<style scoped>
.fixed-width {
    width: 100px;
}

.fixed-height {
    height: 100px;
}

.fixed-height-half {
    height: 50px;
}

.center {
    text-align: center;
}

.parent {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(4, 1fr);
    grid-column-gap: 5px;
    grid-row-gap: 5px;
    max-width: fit-content;
    max-height: fit-content;
}

.picker {
    display: grid;
    /*grid-template-columns: repeat(4, 1fr);*/
    grid-template-rows: repeat(2, 1fr);
    grid-column-gap: 0px;
    grid-row-gap: 0px;

    border: 1px solid black;
    border-radius: 5px;
    padding: 3px;
    margin: 3px;
}
</style>