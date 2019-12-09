const send_ajax = (type, action, form, success, error) => {
    const data = `_csrf=${document.querySelector("#csrf").dataset.token}&${$(form).serialize()}`;
	$.ajax({
		cache: false,
		type: type,
		url: action,
		data: data,
		dataType: "json",
		success: success,
		error: error
	});
};

const send_ajax_multipart = (type, action, form, success, error) => {
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
		error: error
	});
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

const Func = {LEMON, send_ajax, send_ajax_multipart};

export {Func};