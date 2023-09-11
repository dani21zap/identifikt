<template>
    <b-button
        :variant="variant"
        @click="copyToClipboard"
        v-b-tooltip.hover title="Copy to clipboard"
        v-wave
    >   
        <i class="fas fa-clipboard" v-if="message == ''"></i>
        <span v-else>
            <i class="fas fa-clipboard-check"></i>
        </span>
    </b-button>
</template>

<script>
export default {
    data(){
        return {
            message: '',
        };
    },
    props: {
        text: {
            type: String,
            required: true,
        },
        variant: {
            type: String,
            default: 'primary',
        }
    },
    methods: {        
        copyToClipboard() {
            this.$copyText(this.text).then((e) => {
                this.message = 'Copied'
                setTimeout(() => {
                    this.message = ''
                }, 1000)
            });
        },
    }
}
</script>