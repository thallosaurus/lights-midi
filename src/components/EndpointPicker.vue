<template>
    <select class="form-select" aria-label="Default select example">
        <option disabled selected>Select Endpoint</option>
        <!--<option value="1">One</option>
        <option value="2">Two</option>
        <option value="3">Three</option> -->
        <option v-for="p of this.endpoints" :key="p.lightId"> {{ p.lightId }}
        </option>
    </select>
</template>

<script>
export default {
    computed: {
        endpoints() {
            return this.$store.state.lights;
        },
    },
    props: [
        'note'
    ]
}
</script>