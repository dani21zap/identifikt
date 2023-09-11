<template>
    <div class="inline-block">
        <span
        :class="[$style.badge, classes]"
        >
        {{ value ? activeStatus : inactiveStatus}}
        </span>
    </div>
</template>

<script>
export default {
    props: {
        value: {
            type: Boolean,
            required: true,
        },
        activeStatus: {
            type: String,
            default: 'Active',
        },
        inactiveStatus: {
            type: String,
            default: 'Inactive',
        }
    },
    data(){
        return {
            classes: {
                'badge badge-pill badge-success': this.value,
                'badge badge-pill badge-danger': !this.value,
            }
        }
    }
}
</script>

<style lang="scss" module>
    .badge{
		padding: 0.25rem 0.5rem;
		border-radius: $border-radius-pill;
    }
</style>
