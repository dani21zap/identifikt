<template>
    <forms-ecommerces-table :app-information="appInformation"></forms-ecommerces-table>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
    name: 'AppSetup',
    data() {
        return {
            activeEcommerces: [],
            appName: '',
            appRedirectUrl: '',
            appUrl: '',
            appShortDescription: '',
            appDescription: '',
            publishAppChecked: true,
            appIconFile: [
                {
                    url: null
                }
            ],
            appId: this.$route.params.id,
            fields: ['e-commerce',  'status', 'options'],
            isBusy: false,
            perPage: 300,
            currentPage: 1,
        };
    },

    methods: {
        ecommerceStatus(){
            const ids = this.appInformation.ecommerces.reduce((acc,appEc) => {
                this.ecommerces.forEach(ec => {
                    if(ec._id === appEc._id) acc.push(ec._id)
                })
                return acc
            },[])
            this.activeEcommerces = ids
        },

        getEcommerceStatus(id){
            return this.activeEcommerces.filter(act => act === id)
        },
        ...mapActions('ecommerces', ['getEcommerces']),
    },

    computed: {

        rows() {
            return this.ecommerces.length;
        },
        ...mapState('ecommerces', ['ecommerces']),
    },

    props: {
        appInformation: {
            type: Object,
            required: true,
        },
    },

    async mounted() {
        this.ecommerceStatus();
    },
};
</script>

<style lang="scss" scoped>

</style>
