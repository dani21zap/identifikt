<template>
	<div class="app-content">
		<b-form @submit.prevent="updateUser">
			<h3>Account information</h3>
			<div class="box">
				<div class="row">
					<div class="col-lg">
						<div>
							<b-form-group label="Company">
								<PuSkeleton v-if="pageLoading" height="35px"></PuSkeleton>
								<b-input-group v-else prepend-html="<i class='fas fa-building'></i>">
									<b-form-input v-model="company"></b-form-input>
								</b-input-group>
							</b-form-group>
							<div class="form-row">
								<div class="col-lg-6">
									<b-form-group label="First Name">
										<PuSkeleton v-if="pageLoading" height="35px"></PuSkeleton>
										<b-input-group v-else prepend-html="<i class='fas fa-user'></i>">
											<b-form-input v-model="firstName" :state="inputState($v.firstName)"></b-form-input>
										</b-input-group>
										<forms-errors-feedback :field="$v.firstName"> </forms-errors-feedback>
									</b-form-group>
								</div>
								<div class="col-lg-6">
									<b-form-group label="Last Name">
										<PuSkeleton v-if="pageLoading" height="35px"></PuSkeleton>
										<b-input-group v-else prepend-html="<i class='fas fa-user'></i>">
											<b-form-input v-model="lastName" :state="inputState($v.lastName)"></b-form-input>
										</b-input-group>
										<forms-errors-feedback :field="$v.lastName"> </forms-errors-feedback>
									</b-form-group>
								</div>
								<!-- <div class="col-lg-4">
									<b-form-group label="Country">
										<PuSkeleton v-if="pageLoading" height="35px"></PuSkeleton>
										<b-input-group v-else prepend-html="<i class='fas fa-flag'></i>">
											<b-select
												v-model="country"
												:options="options"
												class="fs-15px"
												label="Country"
												name="country"
												type="select"
												:state="inputState($v.country)"
											/>
										</b-input-group>
										<forms-errors-feedback :field="$v.country"> </forms-errors-feedback>
									</b-form-group>
								</div> -->
								<div class="col-lg-4">
									<b-form-group label="Email">
										<PuSkeleton v-if="pageLoading" height="35px"></PuSkeleton>
										<b-input-group v-else prepend-html="<i class='fas fa-at'></i>">
											<b-form-input v-model="email" type="email" readonly :state="inputState($v.email)"></b-form-input>
										</b-input-group>
										<forms-errors-feedback :field="$v.email"> </forms-errors-feedback>
									</b-form-group>
								</div>
								<div class="col-lg-4">
									<b-form-group label="Phone">
										<PuSkeleton v-if="pageLoading" height="35px"></PuSkeleton>
										<b-input-group v-else prepend-html="<i class='fas fa-phone'></i>">
											<b-form-input v-model="phone" :state="inputState($v.phone)"></b-form-input>
										</b-input-group>
										<forms-errors-feedback :field="$v.phone"> </forms-errors-feedback>
									</b-form-group>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<h3>Billing address</h3>
			<div class="box">
				<div class="row">
					<div class="col-lg-6">
						<b-form-group label="Address">
							<PuSkeleton v-if="pageLoading" height="35px"></PuSkeleton>
							<b-input-group v-else prepend-html="<i class='fas fa-address-card'></i>">
								<b-form-input v-model="address1" :state="inputState($v.address1)" placeholder="Address line 1"></b-form-input>
							</b-input-group>
							<forms-errors-feedback :field="$v.address1"> </forms-errors-feedback>
						</b-form-group>
					</div>
					<div class="col-lg-6 align-self-end">
						<b-form-group label="">
							<PuSkeleton v-if="pageLoading" height="35px"></PuSkeleton>
							<b-input-group v-else>
								<b-form-input v-model="address2" :state="inputState($v.address2)" placeholder="Address line 2"></b-form-input>
							</b-input-group>
							<forms-errors-feedback :field="$v.address2"> </forms-errors-feedback>
						</b-form-group>
					</div>
					<!-- <div class="col-lg-4">
						<b-form-group label="Country">
							<PuSkeleton v-if="pageLoading" height="35px"></PuSkeleton>
							<b-input-group v-else prepend-html="<i class='fas fa-flag'></i>">
								<b-select
									v-model="addressCountry"
									:options="options"
									class="fs-15px"
									label="Country"
									name="country"
									type="select"
									:state="inputState($v.addressCountry)"
								/>
							</b-input-group>
							<forms-errors-feedback :field="$v.addressCountry"> </forms-errors-feedback>
						</b-form-group>
					</div> -->
					<div class="col-lg-4">
						<b-form-group label="State">
							<PuSkeleton v-if="pageLoading" height="35px"></PuSkeleton>
							<b-input-group v-else prepend-html="<i class='fas fa-map-marker-alt'></i>">
								<b-form-input v-model="state" :state="inputState($v.state)"></b-form-input>
							</b-input-group>
							<forms-errors-feedback :field="$v.state"> </forms-errors-feedback>
						</b-form-group>
					</div>
					<div class="col-lg-4">
						<b-form-group label="City">
							<PuSkeleton v-if="pageLoading" height="35px"></PuSkeleton>
							<b-input-group v-else prepend-html="<i class='fas fa-city'></i>">
								<b-form-input v-model="city" :state="inputState($v.city)"></b-form-input>
							</b-input-group>
							<forms-errors-feedback :field="$v.city"> </forms-errors-feedback>
						</b-form-group>
					</div>
					<div class="col-lg-3">
						<b-form-group label="Postal code">
							<PuSkeleton v-if="pageLoading" height="35px"></PuSkeleton>
							<b-input-group v-else prepend-html="<i class='fas fa-envelope'></i>">
								<b-form-input v-model="postalCode" :state="inputState($v.postalCode)"></b-form-input>
							</b-input-group>
							<forms-errors-feedback :field="$v.postalCode"> </forms-errors-feedback>
						</b-form-group>
					</div>
					<div class="col-lg-3">
						<b-form-group label="Email">
							<PuSkeleton v-if="pageLoading" height="35px"></PuSkeleton>
							<b-input-group v-else prepend-html="<i class='fas fa-at'></i>">
								<b-form-input v-model="addressEmail" type="email" :state="inputState($v.addressEmail)"></b-form-input>
							</b-input-group>
							<forms-errors-feedback :field="$v.addressEmail"> </forms-errors-feedback>
						</b-form-group>
					</div>
					<div class="col-lg-3">
						<b-form-group label="phone">
							<PuSkeleton v-if="pageLoading" height="35px"></PuSkeleton>
							<b-input-group v-else prepend-html="<i class='fas fa-phone'></i>">
								<b-form-input v-model="addressPhone" :state="inputState($v.addressPhone)"></b-form-input>
							</b-input-group>
							<forms-errors-feedback :field="$v.addressPhone"> </forms-errors-feedback>
						</b-form-group>
					</div>
					<div class="col-lg-3">
						<b-form-group label="P.O. Number">
							<PuSkeleton v-if="pageLoading" height="35px"></PuSkeleton>
							<b-input-group v-else prepend-html="<i class='fas fa-file-invoice'></i>">
								<b-form-input v-model="poNumber" :state="inputState($v.poNumber)"></b-form-input>
							</b-input-group>
						</b-form-group>
					</div>
				</div>
			</div>

			<h3>Client Id</h3>
			<div class="box">
				<b-form-group class="mb-0">
					<template #description>
						The client Id key is used as a secret key to encrypt our headers, you can generate a new one anytime you need it. <span class="text-primary">(Do not share!)</span>.
					</template>
					<PuSkeleton v-if="pageLoading" height="35px"></PuSkeleton>
					<b-input-group v-else>
						<template #append>
							<btn-clipboard :text="userData.client_id"></btn-clipboard>
							<b-button v-wave variant="success" v-b-tooltip.hover title="Create New Client Id" :disabled="isLoading || pageLoading" @click="updateClientId">
								<i class="fas fa-redo-alt"></i>
								<custom-spinner v-if="isLoading"></custom-spinner>
							</b-button>
						</template>
						<b-form-input v-model="userData.client_id" readonly></b-form-input>
					</b-input-group>
				</b-form-group>
			</div>

			<div class="text-right">
				<b-button v-wave variant="primary" type="submit" :disabled="isLoading || pageLoading" size="lg" @submit="updateUser">
					<i class="fas fa-save"></i>
					Save
					<custom-spinner v-if="isLoading"></custom-spinner>
				</b-button>
			</div>
		</b-form>
	</div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { required, email, maxLength, numeric, minLength, alpha } from 'vuelidate/lib/validators';
import formMixin from '@/mixins/form.mixin';

export default {
	mixins: [formMixin],

	data() {
		return {
			company: '',
			firstName: '',
			lastName: '',
			phone: '',
			email: '',
			// country: '',
			address1: '',
			address2: '',
			// addressCountry: '',
			state: '',
			city: '',
			postalCode: '',
			addressPhone: '',
			addressEmail:'',
			poNumber: '',
			isLoading: false,
			pageLoading: true,
		};
	},


	validations() {
		return {
			firstName: { required, alpha },
			lastName: { required, alpha },
			phone: { required, numeric, maxLength: maxLength(10), minLength: minLength(10) },
			// country: { required, alpha },
			email: { required, email },
			address1: { required },
			address2: { required },
			// addressCountry: { required },
			state: { required },
			city: { required },
			postalCode: { required },
			addressPhone: { required, numeric, maxLength: maxLength(10), minLength: minLength(10) },
			addressEmail: { required, email }	
		};
	},

	head() {
		return {
			title: 'Settings'
		};
	},

	computed: {
		// ...mapState('countries', ['countries']),
		// ...mapState('countries', ['options']),
		...mapState('userInformation', ['userData'])
	},

	async mounted() {
	},

	watch: {
		firstName() {
			this.$v.$touch();
			if (this.$v.$invalid) return;
		},

		lastName() {
			this.$v.$touch();
			if (this.$v.$invalid) return;
		},

		phone() {
			this.$v.$touch();
			if (this.$v.$invalid) return;
		},

		// country() {
		// 	this.$v.$touch();
		// 	if (this.$v.$invalid) return;
		// },

		email() {
			this.$v.$touch();
			if (this.$v.$invalid) return;
		},

		address1() {
			this.$v.$touch();
			if (this.$v.$invalid) return;
		},

		address2() {
			this.$v.$touch();
			if (this.$v.$invalid) return;
		},

		// addressCountry() {
		// 	this.$v.$touch();
		// 	if (this.$v.$invalid) return;
		// },

		state() {
			this.$v.$touch();
			if (this.$v.$invalid) return;
		},

		city() {
			this.$v.$touch();
			if (this.$v.$invalid) return;
		},

		postalCode() {
			this.$v.$touch();
			if (this.$v.$invalid) return;
		},

		addressPhone() {
			this.$v.$touch();
			if (this.$v.$invalid) return;
		},

		addressEmail() {
			this.$v.$touch();
			if (this.$v.$invalid) return;
		}

	},


	methods: {
		async updateUser() {
			// PUT update user
			try {
				this.$v.$touch();
				if (this.$v.$invalid) return;

				this.isLoading = true;
				const payload = {
					first_name: this.firstName,
					last_name: this.lastName,
					company: this.company,
					// country: this.country,
					phone: this.phone,
					poNumber: this.poNumber || null,
					address: { 
						address1: this.address1,
						address2: this.address2,
						// country: this.addressCountry,
						state: this.state,
						city: this.city,
						postalCode: this.postalCode,
						email: this.addressEmail,
						phone: this.addressPhone
					}
				};
				await this.$axios.put('/api/user', payload);
				this.$toast.success('Saved successfully');
			} catch (error) {
				this.showError(error);
			} finally {
				this.isLoading = false;
			}
		},

		async updateClientId() {
			try {
				this.$v.$touch();
				if (this.$v.$invalid) return;

				this.isLoading = true;
				await this.$axios.put('/api/user/client');
				this.$toast.success('New Client Id generated');
				await this.getUserInformation();
				// this.fillingAccountInformation();
			} catch (error) {
				this.showError(error);
			} finally {
				this.isLoading = false;
			}
		},

		fillingAccountInformation() {
			if (this.userData === null) {
				return;
			}
			this.company = this.userData.company || '';
			this.firstName = this.userData.first_name || '';
			this.lastName = this.userData.last_name || '';
			this.phone = this.userData.phone || '';
			this.email = this.userData.email || '';
			// this.country = this.userData.country || '';
			this.address1 = this.userData.address ? this.userData.address.address1 : '';
			this.address2 = this.userData.address ? this.userData.address.address2 : '';
			// this.addressCountry = this.userData.address ? this.userData.address.country : '';
			this.state = this.userData.address ? this.userData.address.state : '';
			this.city = this.userData.address ? this.userData.address.city : '';
			this.postalCode = this.userData.address ? this.userData.address.postalCode : '';
			this.addressEmail = this.userData.address ? this.userData.address.email : '';
			this.addressPhone = this.userData.address ? this.userData.address.phone : '';
			this.poNumber = this.userData.poNumber || '';
			this.pageLoading = false;
		},

		// ...mapActions('countries', ['getCountries']),
		...mapActions('userInformation', ['getUserInformation'])
	},
};
</script>
