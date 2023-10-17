<template>
	<div class="HowTo">
		<div class="HT-Title">
			<div class="container text-center">
				<h2 class="title text-black pb-4" style = 'text-shadow: 0px 1px 2px grey;'>Por un mexico seguro</h2>
			</div>
		</div>
		<img class="image" src="/images/saeiv.png" alt="Ecartapi demo" />

		<!-- <div class="container text-center pb-20">
			<div class="row justify-content-center">
				<div class="col-md-8">
					<h2 class="text-white md:text-5xl font-extrabold mb-12" style="text-shadow: 0px 0px 15px black;">
						Meet the <span class="text-brand">professionals</span></h2>
					<p class="text-white text-2xl md:text-3xl">
						If you need any extra information on how to develop your project, please get in contact with us.
					</p>
				</div>
			</div>
		</div> -->
	</div>
</template>
<style lang ="css">
.HT-Title {
	padding-top: 80px;
	padding-bottom: 200px;
	z-index: 99;
}
</style>
<style lang="scss">
.mb-12 {
	margin-bottom: 3rem!important;
}
.title {
	color: white;
	font-size: 1.875rem/* 30px */;
    line-height: 2.25rem/* 36px */;
	font-weight: bold;
	@include media-breakpoint-up(md) {
		font-size: 3rem/* 48px */;
        line-height: 1;
	}
}
.button {
	background: $black;
	border-radius: $border-radius-pill;
	padding: 0.5rem 3rem;
	position: relative;
	z-index: 99;
	color: white;
	display: inline-block;
	&:hover {
		text-decoration: none;
		color: white;
	}
}
.image {
	position: relative;
	display: block;
	margin-left: auto;
	margin-right: auto;
	pointer-events: none;
	width: 80%;
	max-width: 700px;
	margin-top: -180px;
	@include media-breakpoint-up(md) {
		margin-top: -200px;
	}
}
</style>
