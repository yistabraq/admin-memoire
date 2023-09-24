<template>
    <button class="btn btn-primary" v-on:click.prevent="closePanel">
        Close Panel
    </button>
</template>
<script>
export default {
    name:'MyModal',
    data() {
    return {};
    },
    methods: {
        closePanel() {
        this.$emit("closePanel", {});
        }
    }
}
</script>
