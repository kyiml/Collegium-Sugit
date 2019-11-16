const add_data = (DATA_obj_name, DATA_obj_data, EXPRESS_response) => {
    if (!EXPRESS_response.DATA_gathered_data) {
        EXPRESS_response.DATA_gathered_data = {};
    }
    EXPRESS_response.DATA_gathered_data[DATA_obj_name] = DATA_obj_data;
};

const gather_account_data = (EXPRESS_request, EXPRESS_response) => {
    add_data('user', {
        account_type: EXPRESS_request.body.account_type,
    }, EXPRESS_response);
};

module.exports.gather_account_data = gather_account_data;
