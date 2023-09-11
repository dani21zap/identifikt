function form(el, callback) {
	let obj = $(el);
	obj.find('.has-error').removeClass('has-error');
	obj.find('.text-danger').text('');
	$.ajax({
		method: obj.attr('method'),
		url: obj.attr('action'),
		data: obj.serializeArray(),
		beforeSend: () => {
			$.fn.ectoast.hide();
			obj.find('.fa-spinner').parent().prop('disabled', true);
			obj.find('.fa-spinner').show();
		},
		complete: () => {
			obj.find('.fa-spinner').hide();
			obj.find('.fa-spinner').parent().prop('disabled', false);
			obj.find('.fa-spinner').hide();
		},
		success: (data) => {
			if (typeof callback === 'function') {
				callback(data);
			}
		},
		error: (data) => {
			if (data.responseJSON.errors) {
				for (let attr in data.responseJSON.errors) {
					let message = data.responseJSON.errors[attr].charAt(0).toUpperCase() + data.responseJSON.errors[attr].slice(1);
					$(`[name="${attr}"]`).siblings('.text-danger').text(message);
					$(`[name="${attr}"]`).parent().addClass('has-error');
				}
			} else {
				if (typeof callback === 'function') {
					callback(data);
				}
			}
		}
	});	
}

function accessForm(el) {
	let obj = $(el);
	let option = obj.children(`option[value="${obj.val()}"]`);
	$('#en-access').html('');
	option.data('pattern').split(',').forEach(attr => {
		if (attr !== 'sandbox') {
			let label = attr.charAt(0).toUpperCase() + attr.replace(/([a-z])([A-Z])/g, '$1 $2').slice(1);
			$('#en-access').append(`
				<div class="form-group">
	                <label for="ecommerce-${attr.toLowerCase()}">${label}</label>
		            <input type="text" class="form-control" id="ecommerce-${attr.toLowerCase()}" name="${attr}" value=""> 
	                <p class="text-danger"></p>
	            </div>
	        `);
		}
	});
}

function getModal(el) {
	let obj = $(el);
	let modal = $(`#${obj.data('modal')}`);
	$.ajax({
		method:'GET',
		url: obj.data('url'),
		success: (data) => { 
			$('#modal-content').html(data);
			modal.modal();
		}
	});
	return false;
}

function deleteRow(el, csrf, callback) {
	let obj = $(el);
	swal({
		title: 'Are you sure?',
		text: 'Once deleted, you will not be able recover this store access',
		icon: 'warning',
		buttons: true,
		dangerMode: true
	})
	.then(accept => {
		if (accept) {
			return axios.delete(obj.data('url'), {
				headers: {
					'CSRF-Token': csrf
				}
			});
		} else {
			return false;
		}
	})
	.then(response => {
		if (response) {
			callback(response.data || response);
		} else {
			swal.close();
		}
	})
	.catch(err => {
		swal('Sorry', 'We have problems to do this action', 'error');
	});
}

function toast(options) {
	options = Object.assign({
		type: 'info',
		message: null,
		icon: null
	}, options);
	$(`#ec-alert-${options.type}`).fadeToggle(350);
}

$(function(){
	$('#ecommerce-type').val('');
	$('#ecommerce-type').select2({
        placeholder: 'Select an option',
        theme: 'bootstrap',
        width: null,
        templateResult: function(state) {
        	if (!state.id) {
			    return state.text;
			}
			return $(`<span><img src="${state.element.dataset.image}" width="25"/> ${state.text}</span>`);
        }
    });
	$('.ec-select2').select2({
		placeholder: 'Select an option',
		theme: 'bootstrap',
		width: null
	});
});