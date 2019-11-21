const registered_errors = {};

const handle_error = (error, data) => {
    if(registered_errors[error]) {
        registered_errors[error](data);
    }
};

const send_ajax = (type, action, data, success) => {
    data = `_csrf=${document.querySelector("#csrf").dataset.token}&${data}`;
	$.ajax({
		cache: false,
		type: type,
		url: action,
		data: data,
		dataType: "json",
		success: success,
		error: (xhr) => {
			const message_obj = JSON.parse(xhr.responseText);
			handle_error(message_obj.error, message_obj);
		}
	});
};

const register_error = (error, func) => {
    registered_errors[error] = func;
};

const Func = {send_ajax, register_error};

export {Func};