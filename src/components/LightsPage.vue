<script>

export default {
    // eslint-disable-next-line
    name: "LightsPage",
    data() {
        return {
            newLightId: ""
        }
    },
    computed: {
        lights() {
            return this.$store.state.lights;
        }
    },
    methods: {
        async addLightId(ev) {
            ev.preventDefault();

            //query id here
            console.log(ev);

            let url = this.$store.state.address;
            alert(url);
            let q = await fetch(`${url}/get/${this.newLightId}`);
            q.json().then(d => {
                console.log(d);
                
                //on success, add id to light store
              this.$store.commit('addLightId', {
                    lightId: d._id,
                    role: d.common.role,
                    type: d.type,
                    nativeType: d.common.type,
                });
            })
        }
    }
}
</script>

<template>
    <div>Here you can add your Lights as ID</div>
    <form @submit="addLightId">
    <input type="text" v-model="newLightId">
    <input type="submit">
    </form>
    <ul>
        <li v-for="(light, index) in this.lights" :key="index">
            {{ light.lightId }} - {{ light.thingType }} - {{ light.role }}
        </li>
    </ul>
</template>