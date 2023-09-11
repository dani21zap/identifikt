<template>
	<div class='main-content' id="top" v-if= "ecommerce.name">
		<div class= 'contentTitle row d-flex justify-content-center align-items-center m-0 pt-3 pl-3 pr-3'> 
			<div class = "d-flex flex-wrap" style="width: 180px;"> 
					<a class="d-sm-block d-none ecImg" :href='`/platforms/${ ecommerce.name == "Woocommerce" ? "prestashop" : "woocommerce" }`'><img class="col-md-offset-2 lazyLoad isLoaded" :src='`https://ecartapi.s3.amazonaws.com/images/integrations/${ ecommerce.name == "Woocommerce" ? "prestashop" : "woocommerce" }.svg`' style="width: 100%;" target='_blank'>
					</a>
					<a v-if="ecommerce && ecommerce.name" class="d-sm-block d-none ecImg" :href='`/platforms/${ecommerce.name.toLowerCase()}`'><img class="col-md-offset-2 lazyLoad isLoaded" :src="`https://ecartapi.s3.amazonaws.com/images/integrations/${ ecommerce.name.toLowerCase() }.svg`" style="width: 100%;" target='_blank'>
					</a>
					<a class="d-sm-block d-none ecImg" :href='`/platforms/${ ecommerce.name == "SquareSpace" ? "magento2" : "squarespace" }`'><img class="col-md-offset-2 lazyLoad isLoaded" :src='`https://ecartapi.s3.amazonaws.com/images/integrations/${ ecommerce.name == "SquareSpace" ? "magento2" : "squarespace" }.svg`' style="width: 100%;" target='_blank'>
					</a>
					<a class="d-sm-block d-none ecImg" :href='`/platforms/${ ecommerce.name == "Shopify" ? "bigcommerce": "shopify" }`'><img class="col-md-offset-2 lazyLoad isLoaded" :src='`https://ecartapi.s3.amazonaws.com/images/integrations/${ ecommerce.name == "Shopify" ? "bigcommerce": "shopify" }.svg`' style="width: 100%;" target='_blank'>
					</a>
			</div>
			<div class='pb-0 pt-4 pl-4 pr-4'>
				<div class="row d-flex justify-content-center align-items-center p-2 m-0">
					<!-- <img class="col-md-1 col-md-offset-2" :src="ecommerce.image"> -->
					<h1 v-if= "ecommerce">{{ecommerce.name}} API Integration in EcartApi.</h1>
				</div>
				<div class="container d-flex flex-column justify-content-center align-items-center p-2 text-justify">
					<p v-if="!ecommerce.description" class='m-1'>Discover all {{ecommerce.name}} API methods available, connect multiple ecommerce solutions in just one place</p>
					<p class='m-1'>{{ecommerce.description}}</p>
					<a class='d-inline-block ml-2 text-white rounded-pill pr-5 pl-5 pt-2 pb-2 bg-brand text-lg font-semibold m-3' href='/register' target='_blank'>Try Now</a>
					<p> Click and explore the content of <img src="/images/logo-blanco.svg" height="22px" class="d-inline" alt=' Ecart Api, unified solution for shopping cart and marketplaces'></p>
				</div>
			</div>
		</div>
		<div class="p-2 contentLinks">
			<div class="row d-flex justify-content-center m-0">
				<a v-for = "resource in ecommerce.resources" :href="`#${resource.name}`" class="d-flex flex-column align-items-center m-3 tagResource text-decoration-none col-auto optionLink">
					<i :class = "`fa ${resource.complement.icon_b}`"></i>
					<span>{{resource.complement.title}}</span>
				</a>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	props: {
	    ecommerce: Object
	}
}
</script>
<style lang="css" scoped>
	.main-content {
		color: white;
	}
	.contentTitle {
		background: #000000;
    	/*box-shadow: 0px 4px 5px 2px #000000;*/
    	text-align: center;
	}
		.ecImg {
			flex: 0 0 50%;
			padding: 4px;
		}
		.contentTitle p {
			font-size: 18px;
			color: white !important;
		}
	.contentLinks {
		background:black;
		/*background: linear-gradient(360deg, rgba(255, 113, 0, 0.73), rgba(255, 130, 0, 0.6) 70%, rgba(225, 91, 0, 0.87));*/
		text-align:center;
	}
		.contentLinks p {
			padding: 5px;
		    font-size: 18px;
		    color: rgba(246,246,246,0.8902);
		    text-shadow: 1px 1px 1px rgb(126 125 125 / 60%);
		}
	.fa {
		font-size: 30px;
		padding: 2px;
		/*color: #ef7107;*/
        /*color: #000000b3;*/
        color: #f6f6f6e3;
	}
	.tagResource {
		font-size: 12px;
		text-align: center;
		color: white;
		cursor: pointer;
	}
	.tagResource:hover i {
		/*text-shadow: 1px 1px 2px rgb(255 255 255 / 60%), 0px 0px 7px black;*/
		text-shadow: 0px 0px 4px rgb(0 0 0 / 51%), 0px 0px 12px #faf8f8;
	}
	.tagResource:hover span {
		/*text-shadow: 1px 1px 2px rgb(255 255 255 / 60%), 0px 0px 7px black;*/
		text-shadow: 0px 0px 4px rgb(0 0 0 / 51%), 0px 0px 12px #faf8f8;
	}
	.ecImg:hover {
       	box-shadow: inset 0px 0px 8px white;
	    border-radius: 20px;

	}
	@media(max-width: 768px) {
		.optionLink { 
			width: 20%;
		}
	}
</style>