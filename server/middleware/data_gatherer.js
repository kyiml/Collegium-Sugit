const add_data = (DATA_obj_name, DATA_obj_data, EXPRESS_response) => {
    if (!EXPRESS_response.DATA_gathered_data) {
        EXPRESS_response.DATA_gathered_data = {};
    }
    EXPRESS_response.DATA_gathered_data[DATA_obj_name] = DATA_obj_data;
};

const gather_account_data = (EXPRESS_request, EXPRESS_response, EXPRESS_next) => {
    add_data('user', EXPRESS_request.session.account, EXPRESS_response);
    EXPRESS_next();
};

const gather_csrf_data = (EXPRESS_request, EXPRESS_response, EXPRESS_next) => {
    add_data('csrf', EXPRESS_request.csrfToken(), EXPRESS_response);
    EXPRESS_next();
};

module.exports.gather_account_data = gather_account_data;
module.exports.gather_csrf_data = gather_csrf_data;
