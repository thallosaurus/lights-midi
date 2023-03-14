<script>
export default {
    // eslint-disable-next-line
    name: "HomePage",
    data() {
        return {
            ok: true,
            inputUrl: "http://"
        }
    },
    computed: {
        url() {
            return this.$store.state.address;
        }
    },
    mounted() {
        this.inputUrl = this.$store.state.address;

    },
    methods: {
        async setServerAddress(event) {
            event.preventDefault();
            let q = await fetch(`${this.inputUrl}/get/simple-api`);

            let data = await q.json();

            if (checkResponseForVersion(data)) {
                this.ok = data.ok;
                this.$store.commit('setServerAddress', this.inputUrl);
                alert("ok");
            } else {
                alert("Not a valid iobroker address");
            }

        }
    }
}

function checkResponseForVersion(data) {
    return data?.common.installedVersion ?? "0.0.0";
}
</script>

<template>
    <div>Here you can setup the connection to ioBroker as well manage the midi connection used to control the software</div>
    <form @submit="setServerAddress">
        <input type="text" v-model="this.inputUrl">
        <input type="submit">
    </form>
</template>