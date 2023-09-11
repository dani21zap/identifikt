<template>
	<div class="m-4 contact-us">
		<!-- <div class="box"> -->
			<div class="row d-flex flew-row justify-content-space-evenly">
				<div class="container">
				<h1 class="text-center text-xl md:text--3xl font-extrabold mb-5">Reach out to the API experts!</h1>
				<h2 class="text-center mb-4 md:text--2xl text-lg">We are always happy to help.</h2>
				</div>
			</div>
			<div class="row d-flex flew-row justify-content-space-evenly">
				<!-- <div class=""> -->
					<div class="col-12 col-md-6 p-2">
						<div class="box justify-content-space-evenly text-center">
							<span>
								<i class="fa-regular fa-envelope icons font-color-brand"></i>
							</span>
							<h3 class=" mb-2">Talk with an associate.</h3>
							<p class="justify-content-space-evenly">Start a conversation directly with our sales team ready to help you out and answer any questions you may have.</p>
							<b-button pill class="bg-black m-1 text--m font-semibold" href="mailto:ecartapi@envia.atlassian.net">Write us an Email!</b-button>
						</div>	
						<div class="box justify-content-space-evenly text-center">
							<span>
								<i class="fa-solid fa-signal icons font-color-brand"></i>
							</span>
							<h3 class=" mb-2">Watch our platform status</h3>
							<p class="justify-content-space-evenly">See all our system operationals</p>
							<b-button pill class="bg-black m-1 text--m font-semibold" href="https://ecartapi.statuspage.io/">Status</b-button>
						</div>		
					</div>
					
					<div class="col-12 col-md-6 p-2">
						<div class="box justify-content-space-evenly text-center">
							<i class="icons fa-solid fa-headset font-color-brand"></i>
							<h3 class=" mb-2">Schedule a demo meeting.</h3>
							<p class="justify-content-space-evenly">Schedule a meeting to review the API and walkthrough the process of using EcartAPI.</p>
							<div class="embed-responsive embed-responsive-1by1">
								<iframe class="embed-responsive-item" src="https://calendly.com/ecartapi"></iframe>
							</div>
						</div>
					</div>
				<!-- </div> -->
			</div>
			<!-- <b-row class="row text-center" align-h="center">
					<b-col l="12" class="col-my">
						<b-button pill class="bg-brand text--sm pr-3 pl-3 font-semibold md:text-xl sm:text--base sm:px-10 " href="mailto:admin@ecartapi.com"><i class="fas fa-envelope fa-x md:fa-2x"></i> Write us an Email!</b-button>
					</b-col>
			</b-row>
			<b-row class="row text-center" align-h="center">
					<b-col l="12" class="col-my">
						<p class="text-center md:text-xl text--base">You can also schedule a meeting to get a detailed explanation on how to start using Ecart API!</p>
						<div class="embed-responsive embed-responsive-1by1">
							<iframe class="embed-responsive-item" src="https://calendly.com/ecartapi"></iframe>
						</div>
					</b-col>
			</b-row> -->
		<!-- </div> -->
	</div>
</template>

<script>
export default {
	layout: 'landing',
	head() {
		return {
			title: "Schedule your meeting now!",
		};
	},
};
</script>

<style lang="scss" scoped>
	i {
		@media screen and (min-width: 768px) {
		    font-size: 2em;
		}
	}
    .col-dir {
        flex-direction: column;
    }
	.icons{
    	font-size: 4em;
    	margin-bottom: 1.5rem !important;
    }

    .font-color-brand{
    	color: #DC5526;
    }
	.btn-secondary {
		color: #FFFFFF;
	    border-color: #00000000 !important;;
	}
</style>
