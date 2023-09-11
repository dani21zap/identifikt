<template>
	<div class="pt-12 pb-12 sm:pt-26 sm:pb-26 lg:pt-32 lg:pb-32">
		<div class="container faq">
			<h2 class="mb-5">Frequently Asked Questions (FAQ)</h2>
			<div class="accordion" role="tablist">
				<b-card no-body v-for="(item, index) in faqs" :key="index">
					<b-card-header header-tag="header" class="p-1 bg-white" role="tab">
						<b-button class="text-left text-black" block v-b-toggle="'accordion-' + index" variant="none">
							{{ item.question }}
							<div class="float-right text-gray-300">
								<i class="fas fa-plus"></i>
								<i class="fas fa-minus"></i>
							</div>
						</b-button>
					</b-card-header>
					<b-collapse class="bg-gray-50" :id="'accordion-' + index" accordion="faqs" role="tabpanel">
						<b-card-body>
							<b-card-text v-html="item.answer"></b-card-text>
						</b-card-body>
					</b-collapse>
				</b-card>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	layout: 'landing',

	data() {
		return {
			faqs: [
				{
					question: 'What is EcartAPI?',
					answer:
						'EcartAPI is a tool for developers that offers a unified payload across all the ecommerce plataforms and integrations all in one place.',
				},
				{
					question: 'What does EcartAPI offer?',
					answer:
						"It's a tool to shorten developing times for any app that uses ecommerce integrations. We support webhooks, checkout rates on realtime and we are constantly updating api resources.",
				},
				{
					question: 'How do I start?',
					answer: `First. Create your account. <br>
                    Second. Create an app in your dashboard. <br>
                    Third. Add a store. <br>
                    If you need help with a testing store please reach out to us. <a href="https://www.youtube.com/watch?v=D63hRYCDsdQ" target="_blank">Follow our video tutorial</a>`,
				},
				{
					question: 'What does the redirect url work for?',
					answer:
						'This is the most important part of your app because you will receive all your the stores information in this URL. This URL is where all of the information that you need to make api calls will be send. Find out more in our documentation.',
				},
				{
					question: 'What is my Integration Page?',
					answer:
						'Your integration page is the page that loads when you add a store to your app, you can embed this page in any application, modal, view. When you send the nobar=true parameter you will get the page without header and footer to make your integration look smoother. As well we support the back button for mobile devices when you send the parameter back_device=true.',
				},
				{
					question: 'How do I connect my app to EcartAPI?',
					answer: `This is quite simple have to follow just 2 steps.
                            <br>
                            First. You have to add the integration page into your app view, it can be a button or embed on a modal.
                            <br>
                            Second. Have a url where you will receive the integration information. <br>
                            Find out more about this in our documentation. <a href="https://www.youtube.com/watch?v=DHEBlCfe5gc" target="_blank">Follow our video tutorial</a>`,
				},
				{
					question: 'What is my Client Id?',
					answer:
						'Unique identifier for your account you have to keep this value safe, you can use this as a token on certain calls that require it. Find out more in our documentation.',
				},
				{
					question: 'What is an access token?',
					answer:
						'An access token is and identifier for any store that integrates with your app this token is the one that you will be using for all of the request related to the stores (Orders, Products, Customers, etc) check out more ways to use it in our docs.',
				},
				{
					question: 'Do you have webhooks?',
					answer: 'Yes, we offer webhooks for the ecommerce that have the resource and more. More information in our Docs.',
				},
			],
		};
	},

	head() {
		return {
			title: "FAQ's",
		};
	},
};
</script>

<style lang="scss" scoped>
h2 {
	text-align: center;
}
h2 button:after {
	content: '\002B';
	font-size: 20px;
	color: #777;
	float: right;
	margin-left: 5px;
}

.active:after {
	content: '\2212';
	font-size: 20px;
}

.card-header:hover {
	background-color: #eee;
}

.accordion {
	.not-collapsed {
		.fa-plus {
			display: none;
		}
	}
	.collapsed {
		.fa-minus {
			display: none;
		}
	}
}
</style>
