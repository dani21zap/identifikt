<template>
	<div class="app-content">
		<forms-engomado-form title="Agrega un engomado"></forms-engomado-form>
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
			expires_at: ''
		};
	},


	validations() {
		return {
			first_name: { required, alpha },
			last_name: { required, alpha },
			phone: { required, numeric, maxLength: maxLength(10), minLength: minLength(7) },
			email: { required, email },
			plate: { required },
			car_model: { required },
			car_brand: { required },
			car_line: { required },
			car_type: { required },
			car_serial_number: { required },
		};
	},

	head() {
		return {
			title: 'Nuevo Engomado'
		};
	},

	computed: {
		...mapState('userInformation', ['userData'])
	},

	async mounted() {
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
