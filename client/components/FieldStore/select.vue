<template>
    <b-form-select @input="$emit('change', mutableModel)" v-model="mutableModel" :options="options">

    </b-form-select>
</template>

<script>
export default {
    model: {
        prop: 'model',
        event: 'change',
    },
    data(){
        return {
            mutableModel: this.model,
        }
    },

    props: ['model', 'options'],
}
</script>