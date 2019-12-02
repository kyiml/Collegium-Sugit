/**
 * FILE:
 *      server/controllers/pages.js
 * AUTHOR:
 *      Matt Tiffin | mdt6150@rit.edu
 * DESCRIPTION:
 *      This script supplies all of the handlers for serving rendered pages
 */

const LMODULE_models = require('../models');
const LMODULE_debug = require('../debug.js');
const LMODULE_protocol = require('../protocol.js');
const LMODULE_login_statics = require('../login_statics.js');

const PROTOCOL_error = LMODULE_protocol.error;

const MONGOOSE_model_account = LMODULE_models.account.model;

const get_login_page = (EXPRESS_request, EXPRESS_response) => {
    EXPRESS_response.render('pages/login', { data: EXPRESS_response.DATA_gathered_data });
};

const get_index_page = (EXPRESS_request, EXPRESS_response) => {
    EXPRESS_response.render('pages/index', { data: EXPRESS_response.DATA_gathered_data });
};

const get_courses_page = (EXPRESS_request, EXPRESS_response) => {
    EXPRESS_response.render('pages/courses', {data: EXPRESS_response.DATA_gathered_data});
};

const get_settings_page = (EXPRESS_request, EXPRESS_response) => {
    EXPRESS_response.render('pages/settings', {data: EXPRESS_response.DATA_gathered_data});
};

const get_profile_page = (EXPRESS_request, EXPRESS_response) => {
    const REGEX_url_profile_name = /^\/profile\/([A-Za-z0-9_-]{1,32})\/?$/;
    const REGEX_url_profile_name_match = EXPRESS_request.url.match(REGEX_url_profile_name);
    if(!REGEX_url_profile_name_match) {
        EXPRESS_response.status(400).json({
            error: PROTOCOL_error.INVALID_QUERY
        });
        return;
    }
    const EXPRESS_url_profile_name = REGEX_url_profile_name_match[1];
    LMODULE_debug.print_message(`Profile requested: ${EXPRESS_url_profile_name}`);
    
    LMODULE_login_statics.find_by_username(
        MONGOOSE_model_account, EXPRESS_url_profile_name, 
        (TMP_error_1, MONGOOSE_doc_account) => {
            if (TMP_error_1) {
                LMODULE_debug.print_message(TMP_error_1);
                EXPRESS_response.status(500).json({
                    error: PROTOCOL_error.INTERNAL_SERVER_ERROR,
                });
                return;
            }
            if (!MONGOOSE_doc_account) {
                EXPRESS_response.status(404).json({
                    error: PROTOCOL_error.NOT_FOUND,
                });
                return;
            }
            EXPRESS_response.DATA_gathered_data.profile = MONGOOSE_model_account.to_public_api(
                MONGOOSE_doc_account
            );
            EXPRESS_response.render('pages/profile', { data: EXPRESS_response.DATA_gathered_data });
        }
    );
};

module.exports.get_login_page = get_login_page;
module.exports.get_index_page = get_index_page;
module.exports.get_profile_page = get_profile_page;
module.exports.get_courses_page = get_courses_page;
module.exports.get_settings_page = get_settings_page;