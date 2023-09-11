<template>
	<div>
		<platforms-platform-information :ecommerce="ecommerce"></platforms-platform-information>
		<div  class="container-fluid animate__fadeIn">
			<div class ="row m-sm-5 m-4">
				<div v-for = "resource in ecommerce.resources" :id = "resource.name" class=" col-md-offset-2 col-my col-md-3 ">
					<div class ="itemCard d-flex flex-column justify-content-between">
						<div class="resourceContent position-relative">
								<a href="#top" data-toggle="tooltip" title = 'To start' class='text-decoration-none fa fa-caret-up sticky-top position-absolute right-0 p-2 return' style="color:white; cursor: pointer; font-size: 18px"></a>
								<!-- <a :href="ecommerce.url_reference" data-toggle="tooltip" :title = '`Go to ${resource.name} doc`' class='text-decoration-none fa fa-book sticky-top position-absolute p-2 return' style="color:white; cursor: pointer; font-size:18px; right:45px;"></a> -->
							<div class="resourceIcon justify-content-center">
								<span :class="`fa ${resource.complement.icon_b}`"></span>
								<div class="resourceName"> 
									{{resource.complement.title}} 
								</div>
							<div class= "resourceDescription" v-if="resource.complement.description">
								<p>{{resource.complement.description.origin}}</p>
							</div>
							</div>
							<div class='resourceList'>
								<div v-for= "available in resource.available">
									<span> <i class = "fa fa-circle"></i> {{` ${ available[0].toUpperCase() + available.substring(1) } ${resource.complement.title.toLowerCase()}`}}</span>
									<p>
										{{`${resource.complement[`${available}`].description} type ${resource.complement.title.toLowerCase()}`}}
										<!-- Ea molestiae dolor et unde delectus 33 dolores cumque et galisum expedita.  -->
									</p>
								</div>
							</div>
						</div>
						<div class='docs d-flex align-items-center justify-content-center'>
								<a class = '' data-toggle="tooltip" target='_blank'  :title = '`Go to ${resource.complement.title.toLowerCase()} doc`' :href="ecommerce.url_reference">
									Go to {{ecommerce.name.toLowerCase()}} API Doc
								</a>
							</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
	layout: 'landing',
	head() {
		return {
			title: `${ this.$route.params.id[0].toUpperCase() + this.$route.params.id.substring(1) } integration methods`,
			meta: [
				{
					hid: 'description',
					name: 'description',
					content:
						`${this.$route.params.id} API methods available, connect multiple ecommerce solutions in one unified API for developers. Work with products, inventory, orders, shippings, webhooks and more. Connect to shopping carts and marketplaces with a single Web Service. Shopify, Woocommerce, Wix, Magento, Amazon, Ecwid, Mercado Libre, Walmart, Etsy, Magento, Squarespace and more.`
				},
				{
					hid: 'keywords',
					name: 'keywords',
					content: `shopping cart integration, marketplace integration, ecommerce integration, web service for multistore, ${this.$route.params.id} ecommerce API, ${this.$route.params.id} API products, ${this.$route.params.id} orders, ${this.$route.params.id} shippings`
				}
			],
		};
	},
	data(){
		return { 
			ecommerce: {}
		}
	},
	created() {
		this.getEcommerce()
	},
	methods: {
		async getEcommerce () {
			try {
				let res = await this.$axios.get(`/api/services/ecommerces/resources?name=${this.$route.params.id}`);
				this.ecommerce = res.data[0];
			} catch (error) {
				// this.showError(error);
				return [];
			} finally {
				// this.isBusy = false;
			}
		}
	}
}
</script>
<style lang="css" scoped>

	.itemCard {
	    background: linear-gradient(90deg, rgb(149 149 149 / 51%), rgb(210 210 210 / 60%) 70%, rgb(108 107 107 / 87%));
	    /*background:  linear-gradient(90deg, rgb(62 60 60 / 51%), rgba(210, 210, 210, 0.6) 70%, rgb(150 149 149 / 95%), rgb(109 108 108 / 87%) 100%);*/
    	box-shadow: 5px 5px 10px 0px rgb(181 181 181 / 80%);
    	height: 100%;
	}
		.resourceIcon {
			width: 100%;
			text-align: center;
			clip-path: polygon(0 0 ,100% 0%, 100% 90%,0 100%);
			background:  linear-gradient(90deg, rgb(244 109 44), rgb(246 141 104) 70%, rgb(222 98 28), rgb(244 92 6) 100%);
			/*background: #ff671e;*/
			justify-content:center;
			padding: 8%;
			height: 210px;
		}
			.resourceIcon .fa {
				font-size: 40px;
	            color: #f6f6f6e3;
        		text-shadow: 1px 1px 2px rgb(113 112 112 / 60%);
			}
			.resourceName {
			    color: rgb(255 255 255 / 73%);
			    text-shadow: 1px 1px 2px rgb(113 112 112 / 60%);
			    font-size: 15px;
			    padding: 3px;
			    margin: 1%;
			    border-radius: 4px;
			}
			.resourceDescription > p{
				padding: 2%;
				font-size: 0.875rem;
			    color: rgba(246,246,246,0.8902);
    			text-shadow: 1px 1px 1px rgb(126 125 125 / 60%);
    			text-align: justify;
			}
		.resourceContent {

		}	
			.resourceList {
				padding: 10px ;
			}
				.resourceList div{
					padding: 1%;
				}
				.resourceList > div > span{
					font-size: 15px;
					color: black;
				}
					.resourceList > div > span i {
						font-size: 9px;
						color: black;
					}
				.resourceList > div > p {
					padding-left: 20px;
				}

.return:hover {
	text-shadow: 0px 0px 4px rgb(0 0 0 / 51%), 0px 0px 12px #faf8f8;
	color: white;
    cursor: pointer;
    font-size: 18px;
    border: solid #6160601c;
    border-radius: 5px;
    padding: 5px !important;
}
.docs {
    height: 50px;
    background: #0000001a;
    width: 100%;
    text-shadow: 1px 1px 1px rgb(126 125 125);
    font-size: 0.875rem;
    padding: 1%;
    clip-path: polygon(0% 28% ,100% 0%, 100% 100%,0 100%);
    font-weight: 600;
}
	.docs > a { 
	    color: rgb(0 0 0 / 89%);
	}

</style>