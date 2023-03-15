<script>
export default {
    // eslint-disable-next-line
    name: "HomePage",
    data() {
        return {
            ok: false,
            error: false,
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
            this.ok = false;
            this.error = false;

            try {
                let q = await fetch(`${this.inputUrl}/get/simple-api`)
                let data = await q.json();

                if (checkResponseForVersion(data)) {
                    this.ok = true;
                    this.error = false;
                    this.$store.commit('setServerAddress', this.inputUrl);
                } else {
                    this.ok = false;
                    this.error = true;
                }

            } catch (e) {
                this.error = true;
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
    <form @submit="setServerAddress" class="row g-3">
        <div class="col-md-4">
            <label for="serveraddress" class="form-label">Server-Address</label>
            <input type="text" class="form-control" :class="{ 'is-valid': ok, 'is-invalid': error }" id="serveraddress"
                v-model="this.inputUrl">
            <div class="valid-feedback">
                Found SimpleREST Server on specified address
            </div>
            <div class="invalid-feedback">
                Error while fetching SimpleREST Version Number
            </div>
        </div>
        <div class="col-12">
            <input class="btn btn-primary" type="submit">
        </div>
    </form>
</template>