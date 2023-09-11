(function($){
	$.fn.extend({
		ectable: function(options) {
			return this.each(() => {
				let processing = $('<div class="text-center"><span class="fa fa-spinner fa-spin"></span> Processing</div>');
				options = $.extend({}, {
					object: $(this),
					columns:[],
					success: (data) => {},
					error: (err) => {
						processing.addClass('text-danger').html('<span class="fa fa-exclamation-triangle"></span> We have problems getting the data</div>');
					}
				} ,options);
				options.object.after(processing);
				let body = options.object.children('tbody');
				axios.get(options.object.data('url'))
				.then(response => {
					if (!Array.isArray(response.data)) {
						processing.removeClass('text-danger').text('No records found');
					} else {
						processing.remove();
						if (Array.isArray(options.columns)) {
							response.data.forEach(item => {
								let row = $('<tr></tr>');
								let value = '<i class="text-danger"><small>empty<small></i>';
								options.columns.forEach(column => {
									let content = $(`<td class="${column.class || 'text-left'}"></td>`);
									if (typeof column.value === 'function') {
										value = column.value(item);
									} else {
										value = item[column.attribute];
									}
									if (typeof column.link === 'function') {
										content.append(`<a class="text-link" href="${column.link(item)}">${value}</a>`);
									} else {
										content.html(value);
									}
									row.append(content);
								});
								body.append(row);
							});
						}
						options.success(response.data);
					}
				})
				.catch(err => {
					options.error(err.response ? err.response.data : err);
				});
			});
		}
	});
})(jQuery);