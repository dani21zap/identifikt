<template>
	<div class="container mt-20">
		<div class = "row">
			<!-- col-4 col-md-3 col-lg-2 col-my -->
			<div v-for="ecommerce in ecommerces" :key = "ecommerce._id" :id = "ecommerce.code" class ="ecommerceBlock d-flex justify-content-center text-center">
				<div class = "animate__animated animate__fadeIn" style="width: 20%">
					<nuxt-link class="tw-font-bold" :to="{ path: `/platforms/${ecommerce.name.toLowerCase()}` }">
						<img :src = "ecommerce.image"  :alt = "`Integrate ${ecommerce.name} using Ecart API`">
						<span class='text-gray-600 d-none d-sm-block'>{{ ecommerce.name }}</span>
					</nuxt-link>
				</div>
				<div class="text-left p-2">
					<div>
						Supported methods: {{ ecommerce.resourcesCount }}
					</div>
						Resources: 
					<div class="d-flex flex-wrap pl-4">
						<div v-for="resource in ecommerce.resources" class='resourceLbl d-flex justify-content-left align-items-center'>
					<!-- <div v-for="resource in ecommerce.resources.slice(0,5)" class='resourceLbl d-flex justify-content-center align-items-center'> -->

							{{ resource.complement.title.split(' ').length > 1 ? resource.complement.title.split(' ')[1] : resource.complement.title }} <span :class="`fa ${resource.complement.icon_b} pl-1`"></span>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
	data(){
		return { 
			ecommerces: {}
		}
	},
	methods: {
		async getEcommerces () {
			try {
				let res = await this.$axios.get(`/api/services/ecommerces/resources`);
				// res.resources
				this.ecommerces = res.data;
			} catch (error) {
				// this.showError(error);
				return [];
			} finally {
				// this.isBusy = false;
			}
		}
	},
	mounted() {
		this.getEcommerces();
	}
}
</script>
<style lang="css" scoped>
	.ecommerceBlock {
		flex: 0 0 48%;
		max-width: 48%;
		/*align-items: center;*/
		justify-content: space-evenly !important;
	    box-shadow: 0px 0px 1px grey;
	    margin: 1%;
	    padding: 1%;
	} 
	img {
		width: 100%;
	}
	.resourceLbl{
		flex: 0 0 33.3%;
		max-width: 33%;
	    text-transform: capitalize;
	}
	.resourceIcon .fa {
		font-size: 40px;
        color: #f6f6f6e3;
		text-shadow: 1px 1px 2px rgb(113 112 112 / 60%);
	}
</style>