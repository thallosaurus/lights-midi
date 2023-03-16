<script>
export default {
    props: ['id', 'title', 'submit']
}
</script>

<template>
    <!-- Modal -->
    <form @submit="submit">
        <div class="modal fade" v-bind:id="id" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">{{ title }}</h1>
                        <button type="button" class="btn-close" v-bind:data-bs-dismiss="id" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <slot>Modalcontent</slot>
                    </div>
                    <div class="modal-footer">
                        <button type="reset" class="btn btn-secondary" v-bind:data-bs-dismiss="id">Close</button>
                        <button type="submit" class="btn btn-primary" >Save</button>
                    </div>
                </div>
            </div>
        </div>
    </form>
</template>