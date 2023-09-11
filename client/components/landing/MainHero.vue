<template>
	<div class="">
		<div :class="$style.hero" class="bg-secondary">
			<div class="container">
				<h2 class="text-white text-3xl md:text-3xl mb-12">
					Somos una asociación civil enfocada a defender el patrimonio de las familias mexicas, especializadas en la regularización e importación de vehiculos.
				</h2>
				<div class="adjustSm">
					<nuxt-link 
					class="d-inline-block ml-2 text-white rounded-pill pr-5 pl-5 pt-2 pb-2 bg-brand text-lg font-semibold"
					:to="{ name: 'login', query: { plate_auth: true } }">
						Identifica tu engomado.
					</nuxt-link>
					<!-- <a href="https://rapidapi.com/ecartapi-ecartapi-default/api/ecartapi1" target="_blank" class="mt-3 d-inline-block ml-2 text-white rounded-pill pr-5 pl-5 pt-2 pb-2 bg-brand text-lg font-semibold">Test our API</a> -->
				</div>
			</div>
		</div>
		<!-- <div class="container pointer-events-none">
			<img data-not-lazy src="/images/celulares-integraciones.png" alt="Integrations ecartapi" class="w-100" :class="$style.image" />
		</div> -->
	</div>
</template>


<style lang="scss" module>
.hero {
	text-align: center;
	padding: 80px 0;
	@include media-breakpoint-up(md) {
		padding: 100px 0;
	}
}
.image {
	display: block;
	margin-top: -100px;
	@include media-breakpoint-up(md) {
		margin-top: -150px;
	}
}

</style>
<style lang="css">
	.text-3xl {
	    font-size: 1.875rem!important;
	    line-height: 2.25rem!important;
	}
	.text-5xl {
	    font-size: 3rem!important;
	    line-height: 1!important;
	}
	.pointer-events-none{
	    pointer-events: none;
	}
	.bg-gradient {
		/*background: linear-gradient(0deg, rgb(255 95 0 / 98%), rgba(255, 130, 0, 0.6) 70%, rgb(225 91 0));*/
		background: linear-gradient(180deg, black, #0b0b0b, #737373 80%, #fafafa);
    	padding-top: 80px;
    	padding-bottom: 200px;
	}

	@media screen and (max-width: 768px) {
		.adjustSm {
			display:flex;
			flex-direction: column;
			width: 60%;
    		margin: auto;
		}
	}
	
</style>
