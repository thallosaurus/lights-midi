<script setup>
import DialogComponent from '@/components/DialogComponent.vue';
// import { Modal } from 'bootstrap';
</script>
<script>

export default {
    // eslint-disable-next-line
    name: "LightsPage",
    data() {
        return {
            ok: false,
            error: false,
            newLightId: ""
        };
    },
    computed: {
        lights() {
            return this.$store.state.lights;
        }
    },
    methods: {
        async addDatapoint(ev) {
            ev.preventDefault();
            //query id here
            console.log(ev);
            let url = this.$store.state.address;
            // alert(url);
            let q = await fetch(`${url}/get/${this.newLightId}`);
            q.json().then(d => {
                console.log(d);
                //tell main thread about Datapoint

                //on success, add id to light store
                this.$store.commit("addLightId", {
                    lightId: d._id,
                    role: d.common.role,
                    type: d.type,
                    nativeType: d.common.type,
                });
            })
        },
        deleteLight(ev) {
            this.$store.commit("deleteLightId", ev.target.dataset.index);
        }
    },
    components: { DialogComponent }
}

function validateEndpointQuery(d) {
    return true;
}
</script>

<template>
    <!-- <div>Here you can add your Endpoints as ID</div> -->
    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
    </button>

    <DialogComponent id="exampleModal" title="Testmodal" @submit="addDatapoint">
        <form class="row g-3">
            <div class="col-md-4">
                <label for="newLightId" class="form-label">New Datapoint Id</label>
                <input type="text" class="form-control" :class="{ 'is-valid': ok, 'is-invalid': error }" id="newLightId"
                    v-model="newLightId">
                <div class="valid-feedback">
                    Valid Endpoint Id
                </div>
                <div class="invalid-feedback">
                    Invalid Endpoint Id
                </div>
            </div>
            <div class="col-12">
                <input class="btn btn-primary" type="submit">
            </div>
        </form>
    </DialogComponent>
    <ul>
        <li v-for="(light, index) in this.lights" :key="index">
            {{ light.lightId }} - {{ light.nativeType }} - {{ light.role }}
            <button type="button" @click="this.deleteLight" :data-index="index">Löschen</button>
        </li>
    </ul>

    <!-- Button trigger modal -->
</template>