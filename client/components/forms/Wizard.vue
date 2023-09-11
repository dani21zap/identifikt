<template>
    <div class="nav-wizards-container">
        <b-nav class="nav-wizards-1" :class="navClass">
            <b-nav-item 
            @click="$emit('change', index)"
            class="col-3 step" v-for="(step, index) in steps" :key="index" :link-classes="classes(index)">
                <div class="nav-no">{{index + 1}}</div>
                <div class="nav-text">{{step}}</div>
            </b-nav-item>
        </b-nav>
    </div>
</template>

<script>
export default {
    props: {
        currentStep: {
            type: Number,
            required: true,
        },
        steps: {
            type: Array,
            required: true,
        },
        navClass: {
            default: 'justify-content-center'
        }
    },
    methods: {
        classes(index){
            return {
                completed: index < this.currentStep,
                active: index === this.currentStep,
                disabled: index > this.currentStep,
            };
        }
    }
}
</script>

<style lang="scss" scoped>
.nav-wizards-container{
    .nav-wizards-1 .step:last-child{
        a::after{
            left: -50%;
        }
    }
}
</style>