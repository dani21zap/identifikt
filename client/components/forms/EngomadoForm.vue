<template>
	<b-form @submit.prevent="savePlateCard">
		<div class="justify-content-center app-content pt-3 pb-3">
			<h3 class="mb-4">{{ title }}</h3>
			<p>En esta página podrás agregar engomados de uno por uno o cargando un archivo de tipo .csv con la información.</p>
		</div>
		<hr />
		<div class="box">
			<div class="row">
				<div class="col-md">
					<h4>Carga masiva</h4>
					<p>Para poder subir todos los datos de manera correcta favor de descagar el .csv de referencia.</p>
				</div>
			</div>
			<div class="row pb-3">
				<div class="col-md">
					<span>Descarga el archivo de ejemplo.</span>
					<br><input type="file" @change="handleFileUpload" accept=".csv" />
				</div>
				<div class="col-md">
					<span>Sube tu archivo .csv con la información.</span>
					<br><input type="file" @change="handleFileUpload" accept=".csv" />
				</div>
			</div>
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
					<!-- <b-form-group label="Engomado Owner" description="Nombre de la persona a la que se le esta dando de alta la placa.">
						<b-input-group prepend-html="<i class='fas fa-mobile-alt'></i>">
							<b-form-input ref="owner_name" v-model="owner_name" :state="inputState($v.owner_name)"></b-form-input>
						</b-input-group>
						<forms-errors-feedback :field="$v.owner_name"> </forms-errors-feedback>
					</b-form-group> -->
					<!--<b-form-group
						label="Short Description"
						description="Describe what your app does in 10 words or
                                less."
					>
						<b-input-group prepend-html="<i class='fas fa-sticky-note'></i>">
							<b-form-input v-model="appShortDescription"></b-form-input>
						</b-input-group>
					</b-form-group>

					<b-form-group label="Description" description="Long description of your app (optional).">
						<b-input-group prepend-html="<i class='far fa-sticky-note'></i>">
						<b-form-textarea v-model="appDescription" rows="2"></b-form-textarea>
						</b-input-group>
					</b-form-group> -->
				</div>

				<div class="col-md mb-3">
					<h4>Descripción del automovil</h4>
					<b-form-group label="Marca"> <!--VOLVER ESTO UN SELECT-->
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
		</div>
	</b-form>
</template>

<script>
import { mapActions, mapState } from 'vuex';
// import { required, helpers } from 'vuelidate/lib/validators';
import { required, email, maxLength, numeric, minLength, alpha } from 'vuelidate/lib/validators';
import formMixin from '@/mixins/form.mixin';

const initialData = () => {
	return {
		owner_name: '',
		owner_lastname: '',
		appRedirectUrl: '',
		appDomain:'',
		appUrl: '',
		appShortDescription: '',
		appDescription: '',
		publishAppChecked: true,
		appIconFile: [],
		selected: [],
		isLoading: false,
	};
};

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
			first_name: '',
			last_name: '',
			phone: '',
			email: '',
			plate: '',
			img_owner: '',
			img_card: '',
			car_model: '',
			car_brand: '',
			car_line: '',
			car_type: '',
			car_serial_number: '',
			expedition_at: '',
			expires_at: '',
			appIconFile: [],
		};
	},

	computed: {
		// ...mapState('ecommerces', ['ecommerces']),
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
	},

	watch: {
		first_name(){
			this.$v.$touch();
			if (this.$v.$invalid) return;
		},

		last_name(){
			this.$v.$touch();
			if (this.$v.$invalid) return;
		},

		phone(){
			this.$v.$touch();
			if (this.$v.$invalid) return;
		},

		email(){
			this.$v.$touch();
			if (this.$v.$invalid) return;
		},

		plate(){
			this.$v.$touch();
			if (this.$v.$invalid) return;
		},

		car_model(){
			this.$v.$touch();
			if (this.$v.$invalid) return;
		},

		car_brand(){
			this.$v.$touch();
			if (this.$v.$invalid) return;
		},

		car_line(){
			this.$v.$touch();
			if (this.$v.$invalid) return;
		},

		car_type(){
			this.$v.$touch();
			if (this.$v.$invalid) return;
		},

		car_serial_number(){
			this.$v.$touch();
			if (this.$v.$invalid) return;
		},
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

		handleFileUpload(event) {
	      const file = event.target.files[0];
	      if (!file) return;

	      const formData = new FormData();
	      formData.append('csvFile', file);

	      // Replace 'YOUR_API_ENDPOINT' with your actual API endpoint
	      axios.post('YOUR_API_ENDPOINT', formData)
	        .then((response) => {
	          console.log('CSV data uploaded successfully');
	        })
	        .catch((error) => {
	          console.error('Error:', error);
	        });
	    },

		async savePlateCard() {
			// if (this.appDomain) {
			// 	this.$refs.domainModal.show();
			// } else {
			try {
				this.$v.$touch();
				if (this.$v.$invalid) {
					this.scrollToError(this.$v);
					return;
				}
				const payload = {
					name: this.appName,
					description: this.appDescription,
					short_description: this.appShortDescription,
				};
				let formData;
				let params = {};

					// POST Upload image
					// if (this.appIconFile.length && this.appIconFile[0].file) {
					// 	formData = new FormData();
					// 	formData.append('file', this.appIconFile[0].file);
					// 	const { data: image } = await this.$axios.post(`/api/apps/img/upload/${this.appId}`, formData).catch(() => {
					// 		this.$toast.error('Image upload failed');
					// 		return {
					// 			path: '',
					// 		};
					// 	});

					// 	payload.settings.image = image;
					// }
				
					payload.ecommerces = this.selected;
					payload.redirect = this.appRedirectUrl;
					payload.url = this.appUrl;
					if (this.appIconFile.length) {
						formData = new FormData();
						formData.append('file', this.appIconFile[0].file);
						// POST upload app image
						const { data: image } = await this.$axios.post(`/api/apps/img/upload`, formData);

						payload.file = image;
					}
				
				this.isLoading = true;
				// PUT update app
				let response;
				response = await this.$axios.post(`/api/apps`, payload);
				this.$nuxt.$emit('app-created');
				this.$toast.success('Saved successfully');

				this.$v.$reset();
				this.$emit('submit', response.data);
			} catch (error) {
				this.showError(error);
			} finally {
				this.isLoading = false;
			}
		},

		// ...mapActions('userInformation', ['getUserInformation']),
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
