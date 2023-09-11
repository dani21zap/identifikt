<template>
	<div class="contact-us app-content">
		<!-- <div class="box"> -->
			<div class="pt-3 pb-3">
				<h2 class="text-center text-xl md:text-3xl font-extrabold mb-5">Contact us</h2>
				<p class="text-center md:text-xl list-outside text-sm">
					<ul class="row list-none mt-3">
						<li class="col-md-12 mb-2" v-for="item in items" :key="item.text">{{item.text}}</li>
					</ul>
				</p>
			</div>
			<hr />
			<div class="row d-flex flew-row justify-content-space-evenly">
				<div class="col-12 col-md-6 mb-2 p-2">
					<div class="box justify-content-space-evenly text-center">
						<i class="fa-regular fa-envelope icons font-color-brand"></i>
						<h3 class="mb-2">Reach out to us.</h3>
						<p class="m-1 justify-content-space-evenly">We want to make sure you have all the information you need! If there's anything the FAQ doesn't cover, just let us know, and we'll be happy to assist you.</p>
						<b-button pill class="bg-black m-1 text-m font-semibold" href="mailto:ecartapi@envia.atlassian.net">Write us an Email!</b-button>
					</div>		
				</div>
				<div class="col-12 col-md-6 mb-2 p-2">
					<div class="box justify-content-space-evenly text-center">
						<i class="icons fa-solid fa-headset font-color-brand"></i>
						<h3 class=" mb-2">Talk with our Experts.</h3>
						<p class="justify-content-space-evenly">If you'd like to see our product in action or have any questions about how it works, we can set up a meeting for you to get a personalized demonstration and clarify any doubts.</p>
						<div class="embed-responsive embed-responsive-1by1">
							<iframe class="embed-responsive-item" src="https://calendly.com/ecartapi"></iframe>
						</div>
					</div>
				</div>
			</div>
			
		<!-- </div> -->
	</div>
</template>

<script>
export default {
	data() {
		return {
			items:[
			{text: 'Need help to start setting up? We\'d love to hear from you'},
			]
		}
	},
	head() {
		return {
			title: "Schedule your meeting now!",
		};
	},
};
</script>

<style lang="scss" scoped>
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
