export default {
	methods: {
		inputState(model){
			if(model == undefined) return null;
			if(model.$error) return false;
			if(!model.$invalid) return true;
            return null;
		},
		inputError(model, field){
            if(field == undefined){
                if(model.$error) return true;
            }
			if(model.$error && !model[field]) return true;
			return false;
		},
		scrollToError(vuelidate, refs){
			setTimeout(() => {
				let input = document.querySelector('.form-control.is-invalid').getBoundingClientRect();
				window.scroll({
					top: input.top + document.documentElement.scrollTop - 150,
					left: 0,
					behavior: 'smooth'
				});
			}, 200);

        },

		scrollToTop(){
			let to = document.querySelector('body')
			window.scroll({
				top: to.top + document.documentElement.scrollTop - 60,
				left: 0,
				behavior: 'smooth'
			});

			this.moveToDown = !this.moveToDown
		}
	}
}
