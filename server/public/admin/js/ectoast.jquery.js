(function($) {
    let hide = function (type, callback) {
        if (typeof callback !== 'function') {
            callback = function(){};
        }
        if (type) {
            $(`#ec-alert-${type}`).fadeOut(350, callback);
        } else {
            $('.myadmin-alert-top').fadeOut(350, callback);
        }
    }
    $.fn.ectoast = {
        success: function(options){
            options = Object.assign({ message: 'Everything perfect you can continue.', icon: 'fa fa-check-circle', event: null }, options);
            let close = $('<a href="javascript(0)" class="closed">&times;</a>');
            close.click(function(){
                hide('success', options.event);
                return false;
            });
            let toast = $(`<div id="ec-alert-success" class="myadmin-alert myadmin-alert-icon myadmin-alert-click alert-success myadmin-alert-top"> <span class="${options.icon}"></span> ${options.message}</div>`);
            if ($('#ec-alert-success').length > 0) {
                toast = $('#ec-alert-success');
                toast.html(`<span class="${options.icon}"></span> ${options.message}`);
                toast.append(close);
                toast.fadeIn(350);
            } else {
                $('body').append(toast);
                toast.append(close);
                toast.fadeIn(350);
            }
        },
        info: function(options){
            let close = $('<a href="javascript(0)" class="closed">&times;</a>');
            close.click(function(){
                hide('info', options.event);
                return false;
            });
            options = Object.assign({ message: 'You have a new message.', icon: 'fa fa-info-circle', event: null }, options);
            let toast = $(`<div id="ec-alert-info" class="myadmin-alert myadmin-alert-icon myadmin-alert-click alert-info myadmin-alert-top"> <span class="${options.icon}"></span> ${options.message}</div>`);
            if ($('#ec-alert-info').length > 0) {
                toast = $('#ec-alert-info');
                toast.html(`<span class="${options.icon}"></span> ${options.message}`);
                toast.append(close);
                toast.fadeIn(350);
            } else {
                $('body').append(toast);
                toast.append(close);
                toast.fadeIn(350);
            }
        },
        warning: function(options) {
            let close = $('<a href="javascript(0)" class="closed">&times;</a>');
            close.click(function(){
                hide('warning', options.event);
                return false;
            });
            options = Object.assign({ message: 'Please verify the information', icon: 'fa fa-exclamation-triangle', event: null }, options);
            let toast = $(`<div id="ec-alert-warning" class="myadmin-alert myadmin-alert-icon myadmin-alert-click alert-warning myadmin-alert-top"> <span class="${options.icon}"></span> ${options.message}</div>`);
            if ($('#ec-alert-warning').length > 0) {
                toast = $('#ec-alert-warning');
                toast.html(`<span class="${options.icon}"></span> ${options.message}`);
                toast.append(close);
                toast.fadeIn(350);
            } else {
                $('body').append(toast);
                toast.append(close);
                toast.fadeIn(350);
            }
        },
        danger: function(options) {
            let close = $('<a href="javascript(0)" class="closed">&times;</a>');
            close.click(function(){
                hide('danger', options.event);
                return false;
            });
            options = Object.assign({ message: 'An error occurred in the process, please try again later', icon: 'fa fa-times-circle', event: null }, options);
            let toast = $(`<div id="ec-alert-danger" class="myadmin-alert myadmin-alert-icon myadmin-alert-click alert-danger myadmin-alert-top"> <span class="${options.icon}"></span> ${options.message}</div>`);
            if ($('#ec-alert-danger').length > 0) {
                toast = $('#ec-alert-danger');
                toast.html(`<span class="${options.icon}"></span> ${options.message}`);
                toast.append(close);
                toast.fadeIn(350);
            } else {
                $('body').append(toast);
                toast.append(close);
                toast.fadeIn(350);
            }
        },
        hide: function(type, callback) {
            hide(type, callback);
        }
    };
})(jQuery);