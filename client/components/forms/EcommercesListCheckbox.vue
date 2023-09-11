<template>
    <div class="wrapper">
        <div class="text-center mb-4">
            <h3>Ecommerce Platforms</h3>
            <p>
                Select which e-commerces you want to enable in the oauth so customers can
                integrate their stores.
            </p>
        </div>
        <div class="bg-white">
            <div class="row no-gutters">
                <div 
                @click="toggleEcommerce(e._id, e.required_app_keys)"
                class="col-md-6 col-xl-4 col-item cursor-pointer hover:bg-gray-100" 
                v-wave 
                v-for="e in ecommerces" 
                :key="e._id">
                    <div class="item h-100">
                        <b-form-checkbox 
                        class="pointer-events-none"
                        size="lg"
                        v-model="selected"
                        :disabled="e.required_app_keys || false"
                        :value="e._id"
                        >
                                <img width="50" :src="e.image">
                                <strong>{{e.name}}</strong>
                        </b-form-checkbox>
                        
                    </div>
                </div>
            </div>
        </div>

        <div class="text-right mt-3">
            <b-button
            @click="updateApp"
            :disabled="loading" size="lg" variant="primary" v-wave>
                <i class="fas fa-save"></i>
                Save
                <custom-spinner v-if="loading"></custom-spinner>
            </b-button>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            selected: [],
            loading: false,
        };
    },
    head(){
        return {
            title: 'Select E-commerces'
        }
    },
    props: {
        ecommerces: {
            type: Array,
            required: true,
        },
        app: {
            type: Object,
            required: true,
        }
    },
    mounted(){
        this.ecommerces.map(i => {
            if(!i.required_app_keys) {
                this.selected.push(i._id);
            }
        });
    }, 
    methods: {
        toggleEcommerce(id, disabled){
            if (!disabled) {
                if(this.selected.includes(id)){
                    this.selected = this.selected.filter(item => item !== id);
                }else{
                    this.selected.push(id);
                }
                this.changeStatus(id);
            }
        },
        async changeStatus(id){
            try {
                let payload = {
                    ecommerce: id,
                    active: this.selected.includes(id),
                };
                let {data} = await this.$axios.put(`/api/apps/${this.app.app_id}/ecommerce`, payload);
            } catch (error) {
                this.showError(error);
            }
        },
        async updateApp(){
            this.$router.push(`/dashboard/apps/${this.app.app_id}`)
        }
    }
}
</script>

<style lang="scss" scoped>
    .pointer-events-none {
        cursor: none;
    }
    .cursor-pointer{
        cursor: pointer;
    }
    .item{
        display: flex;
        align-items: center;
        padding: 1rem 2rem;
        img{
            display: inline-block;
            margin-left: 1rem;
            margin-right: 2rem;
        }
        border: $gray-200 1px solid;
    }
    .wrapper{
        border-radius: 7px;
    }

    .checkEcommerce{
        cursor: pointer;
        user-select: none;
    }
</style>