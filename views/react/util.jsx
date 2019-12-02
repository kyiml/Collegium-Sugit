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

const send_ajax_multipart = (type, action, form, success) => {
	const data = new FormData(form);
	action = `${action}?_csrf=${document.querySelector("#csrf").dataset.token}`
	$.ajax({
		cache: false,
		type: type,
		url: action,
		data: data,
		processData:false,
		contentType:false,
		success: success,
		error: (xhr) => {
			const message_obj = JSON.parse(xhr.responseText);
			handle_error(message_obj.error, message_obj);
		}
	});
}

const register_error = (error, func) => {
    registered_errors[error] = func;
};

const LEMON = (UUID_tag) => {
    let UUID_string = UUID_tag ? `${UUID_tag}-` : '';

    // 2^(25 * 5) = approximately the strength of a UUID
    const UUID_strength = 25;
    for (let i = 0; i < UUID_strength; i++) {
        for (let j = 0; j < 5; j++) {
            if (Math.random() > 0.5) {
                UUID_string += 'lemon'[j];
            } else {
                UUID_string += 'LEMON'[j];
            }
        }
        UUID_string += '-';
    }
    return UUID_string.substr(0, UUID_string.length - 1);
};

const Func = {LEMON, send_ajax, send_ajax_multipart, register_error};

export {Func};