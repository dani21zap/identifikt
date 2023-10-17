<template>
	<b-form @submit.prevent="savePlateCard">
		<div class="justify-content-center app-content pt-3 pb-3">
			<!-- <h3 class="mb-4">{{ title }}</h3> -->
			<h3 class="mb-4">Tarjeta de conductor en línea</h3>
			<p>A continuación se lista la información del conductor para el cual se ingresaron los datos.</p>
		</div>
		<hr />
		<div class="box">
			<div class="container">
				<div class="col-md"><img
					:src="img_owner"
					class="rounded"
					width="300"
				/></div>
				<div class="row">
					<div class="col title-identifikt"><span>Engomado No.</span></div>
					<div class="col text-weight-normal"><span> {{ plate }}</span></div>
				</div>
				<div class="row">
					<div class="col title-identifikt"><span>Dueño.</span></div>
					<div class="col text-weight-normal"><span> {{ first_name }} {{ last_name }}</span></div>
				</div>
			</div>
			<div class="row">
				<span>Estado: {{ active }}</span>
			</div>
			<div class="row">
				<span>Expedición: {{ expedition_at }}</span>
			</div>
			<div class="row">
				<span>Vencimiento: {{ expires_at }}</span>
			</div>
			
			<div class="row">
				<span>Placa: {{ img_car }}</span>
			</div>
			<div class="row">
				<span>Marca: {{ car_brand }}</span>
			</div>
			<div class="row">
				<span>Modelo: {{ car_model }}</span>
			</div>
			<div class="row">
				<span>Tipo: {{ car_type }}</span>
			</div>
			<div class="row">
				<span>Linea: {{ car_line }}</span>
			</div>
			<div class="row">
				<span>No. Serie: {{ car_serial_number }}</span>
			</div>
		</div>
		<!-- <div class="card">
			<div class="row">
				<div class="col-md">
					<h4>Datos del conductor</h4>
					<b-form-group label="Nombre(s)">
						<PuSkeleton v-if="pageLoading" height="35px"></PuSkeleton>
						<b-input-group v-else>
							<b-form-input v-model="owner_name"></b-form-input>
						</b-input-group>
					</b-form-group>
					<b-form-group label="Apellidos">
						<PuSkeleton v-if="pageLoading" height="35px"></PuSkeleton>
						<b-input-group v-else>
							<b-form-input v-model="owner_lastname"></b-form-input>
						</b-input-group>
					</b-form-group>
					<b-form-group label="Placa">
						<PuSkeleton v-if="pageLoading" height="35px"></PuSkeleton>
						<b-input-group v-else>
							<b-form-input v-model="plate"></b-form-input>
						</b-input-group>
					</b-form-group>
					<b-form-group label="Telefono">
						<PuSkeleton v-if="pageLoading" height="35px"></PuSkeleton>
						<b-input-group v-else>
							<b-form-input v-model="phone"></b-form-input>
						</b-input-group>
					</b-form-group>
					<b-form-group label="Correo">
						<PuSkeleton v-if="pageLoading" height="35px"></PuSkeleton>
						<b-input-group v-else>
							<b-form-input v-model="email"></b-form-input>
						</b-input-group>
					</b-form-group>
					<div class="image-card">
						<div class="image-icon">
							<label for="app-icon" class="container-fa-image">
								<img
									v-if="appIconFile.length"
									onerror="javascript:this.src='image404.svg'"
									:src="appIconFile[0].url"
									class="rounded"
								/>

								<div v-else>
									<i class="fas fa-image"></i>
								</div>
							</label>
							<file-upload
								ref="upload"
								v-model="appIconFile"
								extensions="jpg,jpeg,png"
								accept="image/png,image/jpeg"
								name="app-icon"
								:drop="true"
								@input-filter="inputFilter"
							>
							</file-upload>
						</div>
						<div v-if="appIconFile.length" class="mt-2">
							<b>{{ appIconFile[0].name }}</b>
						</div>
						<div v-else>
							<div><b>App icon</b></div>
							<div class="text-muted">
								Must be .jpg or .png and have a minimum of 512 x 512 px
							</div>
						</div>
					</div>
				</div>

				<div class="col-md mb-3">
					<h4>Descripción del automovil</h4>
					<b-form-group label="Marca"> 
						<PuSkeleton v-if="pageLoading" height="35px"></PuSkeleton>
						<b-input-group v-else>
							<b-form-input v-model="car_brand"></b-form-input>
						</b-input-group>
					</b-form-group>
					<b-form-group label="Modelo">
						<PuSkeleton v-if="pageLoading" height="35px"></PuSkeleton>
						<b-input-group v-else>
							<b-form-input v-model="car_model"></b-form-input>
						</b-input-group>
					</b-form-group>
					<b-form-group label="Linea">
						<PuSkeleton v-if="pageLoading" height="35px"></PuSkeleton>
						<b-input-group v-else>
							<b-form-input v-model="car_line"></b-form-input>
						</b-input-group>
					</b-form-group>
					<b-form-group label="Tipo">
						<PuSkeleton v-if="pageLoading" height="35px"></PuSkeleton>
						<b-input-group v-else>
							<b-form-input v-model="car_type"></b-form-input>
						</b-input-group>
					</b-form-group>
					<b-form-group label="Numero de serie">
						<PuSkeleton v-if="pageLoading" height="35px"></PuSkeleton>
						<b-input-group v-else>
							<b-form-input v-model="car_serial_number"></b-form-input>
						</b-input-group>
					</b-form-group>
					<div class="image-card">
						<div class="image-icon">
							<label for="app-icon" class="container-fa-image">
								<img
									v-if="appIconFile.length"
									onerror="javascript:this.src='image404.svg'"
									:src="appIconFile[0].url"
									class="rounded"
								/>

								<div v-else>
									<i class="fas fa-image"></i>
								</div>
							</label>
							<file-upload
								ref="upload"
								v-model="appIconFile"
								extensions="jpg,jpeg,png"
								accept="image/png,image/jpeg"
								name="app-icon"
								:drop="true"
								@input-filter="inputFilter"
							>
							</file-upload>
						</div>
						<div v-if="appIconFile.length" class="mt-2">
							<b>{{ appIconFile[0].name }}</b>
						</div>
						<div v-else>
							<div><b>App icon</b></div>
							<div class="text-muted">
								Must be .jpg or .png and have a minimum of 512 x 512 px
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="d-flex align-baseline">
			<b-button v-wave class="w-32" size="lg" :disabled="isLoading" variant="primary" type="submit" @submit="savePlateCard()">
				<i class="fas fa-save"></i>
				Save
				<custom-spinner v-if="isLoading"></custom-spinner>
			</b-button>
		</div> -->
	</b-form>
</template>

<script>
import { mapActions, mapState } from 'vuex';
// import { required, helpers } from 'vuelidate/lib/validators';
import { required, email, maxLength, numeric, minLength, alpha } from 'vuelidate/lib/validators';
import formMixin from '@/mixins/form.mixin';

// const initialData = () => {
// 	return {
// 		first_name: '',
// 		last_name: '',
// 		phone: '',
// 		email: '',
// 		plate: '',
// 		img_owner: '',
// 		img_card: '',
// 		car_model: '',
// 		car_brand: '',
// 		car_line: '',
// 		car_type: '',
// 		car_serial_number: '',
// 		expedition_at: '',
// 		expires_at: '',
// 	};
// };

// const mustBeUrl = helpers.regex('mustBeUrl', /^((http|https):\/\/).+$/);
// const notMustBeUrl = helpers.regex('notMustBeUrl', /^(?!(http|https):\/\/).+$/);

export default {
	mixins: [formMixin],
	props: {
		title: {
			type: String,
			required: true,
		},
	},
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
			pageLoading: true
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
		if (localStorage?.user?.data?.plate_id) {
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
			this.plate = local.plate_id || '';
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
				console.log(this.plate);
				this.isLoading = true;
				let response;
				response = await this.$axios.get(`/api/engomados/${this.plate}`);
				console.log(response.data);
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
.box {
	border: none;

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

.title{
	font-weight: bold;
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
