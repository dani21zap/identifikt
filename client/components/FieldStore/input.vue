<template>
    <b-form-input @input="$emit('change', mutableModel)" v-model="mutableModel"></b-form-input>
</template>

<script>
export default {
    model: {
        prop: 'model',
        event: 'change'
    },
    data(){
        return {
            mutableModel: this.model,
        }
    },
    props: ['model'],
}
</script>