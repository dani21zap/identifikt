<template>
	<div class="justify-content-center">
		<div class="d-flex card">
			<div class="container m-3">
				<div class="row justify-content-center">
					<div class="col-sm-auto title-identifikt"><span>Engomado No.</span></div>
					<div class="col-sm-auto text-identifikt"><span> {{ plate }}</span></div>
				</div>
				<div class="row justify-content-center">
					<div class="col-sm-auto"><img
						:src="img_owner"
						class="rounded"
						width="100"
					/></div>
					<div class="col-sm-auto"><img
						:src="img_car"
						class="rounded"
						width="100"
					/></div>
				</div>
				<div class="row justify-content-start">
					<div class="col-lg">
						<div class="row">
							<div class="col-sm-auto title-identifikt"><span>Dueño:</span></div>
							<div class="col-sm-auto text-identifikt"><span> {{ first_name }} {{ last_name }}</span></div>
						</div>
						<div class="row">
							<div class="col-sm-auto title-identifikt"><span>No. Serie:</span></div>
							<div class="col-sm-auto text-identifikt"><span>{{ car_serial_number }}</span></div>
						</div>
						<div class="row">
							<div class="col-sm-auto title-identifikt"><span>Marca:</span></div>
							<div class="col-sm-auto text-identifikt"><span>{{ car_brand }}</span></div>
						</div>
						<div class="row">
							<div class="col-sm-auto title-identifikt"><span>Modelo:</span></div>
							<div class="col-sm-auto text-identifikt"><span>{{ car_model }}</span></div>
						</div>
						<div class="row">
							<div class="col-sm-auto title-identifikt"><span>Linea:</span></div>
							<div class="col-sm-auto text-identifikt"><span>{{ car_line }}</span></div>
						</div>
						<div class="row">
							<div class="col-sm-auto title-identifikt"><span>Expedición:</span></div>
							<div class="col-sm-auto text-identifikt"><span>{{ expedition_at }}</span></div>
						</div>
						<div class="row">
							<div class="col-sm-auto title-identifikt"><span>Vencimiento:</span></div>
							<div class="col-sm-auto text-identifikt"><span>{{ expires_at }}</span></div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import { required, email, maxLength, numeric, minLength, alpha } from 'vuelidate/lib/validators';


export default {
	data() {
		return {
			active: 1,
			first_name: '',
			last_name: '',
			// phone: '',
			// email: '',
			plate: this.$route.params.id,
			img_owner: '/images/saeiv.png',
			img_car: '/images/saeiv.png',
			img_card: '',
			car_model: '',
			car_brand: '',
			car_line: '',
			car_type: '',
			car_serial_number: '',
			expedition_at: '',
			expires_at: '',
			appIconFile: [],
			isLoading: false,
			pageLoading: true,
		};
	},

	computed: {
		...mapState('userInformation', ['userData']),
	},

	// validations() {
	// 	return {
	// 		first_name: { required, alpha },
	// 		last_name: { required, alpha },
	// 		phone: { required, numeric, maxLength: maxLength(10), minLength: minLength(7) },
	// 		email: { required, email },
	// 		plate: { required },
	// 		car_model: { required },
	// 		car_brand: { required },
	// 		car_line: { required },
	// 		car_type: { required },
	// 		car_serial_number: { required },
	// 	};
	// },

	mounted() {
		if (localStorage?.user?.data?.plate) {
			this.setData(localStorage.user.data);
		} else {
			this.fillPlateCard();
		}
		this.pageLoading = false;
	},

	methods: {
		showModal() {
			this.$refs.deleteModal.show();
		},
		setDefaultImage(e) {
			e.target.src = `${process.env.HOSTNAME}/images/image404.svg`;
		},

		inputFilter(newFile, oldFile, prevent) {
			if (newFile && !oldFile) {
				if (!/\.(jpg|jpeg|png)$/i.test(newFile.name)) {
					return prevent();
				}
			}
			if (newFile && (!oldFile || newFile.file !== oldFile.file)) {
				newFile.url = '';
				const URL = window.URL || window.webkitURL;
				if (URL && URL.createObjectURL) {
					newFile.url = URL.createObjectURL(newFile.file);
				}
			}
		},

		setData(local){
			this.active = local.active || false;
			this.first_name = local.owner_name || '';
			this.last_name = local.owner_lastname || '';
			this.phone = local.phone || '';
			this.email = local.email || '';
			this.plate = local.plate || '';
			// this.img_owner = local.img_owner || '';
			// this.img_card = local. || '';
			this.car_model = local.car_model || '';
			this.car_brand = local.car_brand|| '';
			this.car_line = local.car_line || '';
			this.car_type = local.car_type || '';
			this.car_serial_number = local.car_serial_number || '';
			this.expedition_at = local.expedition_at || '';
			this.expires_at = local.expires_at || '';
		},

		async fillPlateCard() {
			try {
				this.isLoading = true;
				let response;
				response = await this.$axios.get(`/api/engomados/${this.plate}`);
				this.setData(response.data);
				// this.$nuxt.$emit('app-created');
				// this.$toast.success('Saved successfully');

				// this.$v.$reset();
				// this.$emit('submit', response.data);

			} catch (error) {
				this.showError(error);
			} finally {
				this.isLoading = false;
			}
		},

		...mapActions('userInformation', ['getUserInformation']),
		// ...mapActions('ecommerces', ['getEcommerces']),
	},
};
</script>

<style lang="scss" scoped>
.card {
	max-width: 30rem;
	small {
		color: $gray-500;
		display: block;
		margin-top: 0.25rem;
	}

	input::placeholder {
		font-size: 12px;
		color: $gray-300;
	}

	.image-card {
		padding: 1rem;
		border: 1px solid $gray-300;
		border-radius: 6px;
		text-align: center;
		vertical-align: middle;
		transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;

		.image-icon {
			max-width: 100%;
			display: inline-block;
			cursor: pointer;

			label,
			span {
				cursor: pointer;
			}

			.fa-image,
			img {
				width: 100%;
				font-size: max(100px, min(150px, 150px));
				color: $blue-400;
			}
		}
	}
}

.title-identifikt{
	font-weight: bold;
}
.text-identifikt{
	font-weight: 400;
}
.ec-checkbox-button-content .ecommerce-image {
	width: 80px;
	background-size: contain;
	background-repeat: no-repeat;
	height: 80px;
	background-position: center;
}

.ec-shop-title {
	font-weight: bold;
	align-self: center;
	display: none;

	@media screen and (min-width: 768px) {
		display: block !important;
	}
}

.ec-checkbox-button-content {
	padding-bottom: 30px;
}

.ec-checkbox-div {
	cursor: pointer !important;
	padding: 0;
	display: flex;
	flex-direction: column;
	align-items: center;
}

input[type='checkbox']:checked + .ec-checkbox-div {
	box-shadow: inset 0px 0px 50px $primary;
}

@media (max-width: 768px) {
	.ec-checkbox-button-content .ec-checkbox-div .ecommerce-image {
		background-position: center;
		margin: 0 auto;
	}
	h1 {
		font-size: 25px;
	}
	h2 {
		font-size: 22px !important;
	}
	.continue-text {
		font-size: 20px !important;
	}
	.search-mobile {
		font-size: 1em !important;
		border-radius: 0px 2px 2px 0px !important;
	}
}

.container-fa-image {
	max-width: 12rem;
	display: flex;
	flex-direction: column;
	align-content: center;
	margin-bottom: 0;
}

.box .image-card .image-icon .fa-image {
	font-size: 5rem;
}
</style>
