function login(form) {
	let obj = $(`#${form.id}`);
	obj.find('.alert-danger').addClass('hidden');
	$.ajax({
		method: obj.attr('method'),
		url: obj.attr('action'),
		data: obj.serializeArray(),
		success: (data) => {
			if (data.success) {
				window.location.href = '/dashboard';
			}
		},
		error: function(){
			obj.find('.alert-danger').removeClass('hidden');
		}
	});
}

function form(form, callback) {
	let obj = $(`#${form.id}`);
	obj.find('.error').removeClass('error');
	obj.find('.text-danger').text('');
	$.ajax({
		method: obj.attr('method'),
		url: obj.attr('action'),
		data: obj.serializeArray(),
		success: (data) => {
			callback(data);
		},
		error: (data) => {
			if (data.responseJSON.errors) {
				for (let attr in data.responseJSON.errors) {
					let message = data.responseJSON.errors[attr].charAt(0).toUpperCase() + data.responseJSON.errors[attr].slice(1);
					$(`[name="${attr}"]`).addClass('error').siblings('.text-danger').text(message);
				}
			}
		}
	});	
}

function register(form) {
	window.form(form, (data) => {
		if (data.success) {
			window.location.href = '/register/success';
		}
	});
}

jQuery(document).ready(function($) {
	$('#homepage').removeClass('d-none');
});