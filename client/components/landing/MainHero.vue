<template>
	
	<!-- <div class="bg-blue-royal hero py-16"> -->
		<div class="bg hero py-16"
			style="background-image: url('/images/main_background.jpeg'); 
			background-size: cover; 
			background-position: center;"
		>
		<div class="container text-center overlay">
			<h2 class="text-white text-3xl md:text-3xl mb-12">
				Somos una asociación civil enfocada a defender el patrimonio de las familias mexicas, especializadas en la regularización e importación de vehiculos.
			</h2>
			<div class="adjustSm">
				<nuxt-link 
					class="d-inline-block ml-2 text-white rounded-pill pr-5 pl-5 pt-2 pb-2 bg-secondary text-lg font-semibold"
						:to="{ name: 'login', query: { plate_auth: true } }"
				>
					Identifica tu engomado.
					</nuxt-link>
			</div>
		</div>
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
	.py-16 {
        padding-top: 4rem!important;
        padding-bottom: 4rem!important;
    }
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
	.text-center {
  		text-align: center;
	}
	.bg-blue-royal {
 		 background-color: royalblue; /* Cambia a tu color azul rey preferido */
	}
	.overlay {
		padding: 2rem;
		border-radius: 10px;
		background: rgba(47, 47, 47, 0.6);
	}
	@media screen and (max-width: 768px) {
		.adjustSm {
			display:flex;
			flex-direction: column;
			width: 60%;
    		margin: auto;
		}
	}
	.bg-red {
  		background-color: red; /* Cambia a tu color rojo preferido */
  		color: white; /* Cambia el color del texto a blanco para que sea legible */
	}


</style>
