/**
 * FILE:
 *      server/controllers/pages.js
 * AUTHOR:
 *      Matt Tiffin | mdt6150@rit.edu
 * DESCRIPTION:
 *      This script supplies all of the handlers for serving rendered pages
 */

const LMODULE_debug = require('../debug.js');

const get_login_page = (EXPRESS_request, EXPRESS_response) => {
    EXPRESS_response.render('pages/login', { data: EXPRESS_response.DATA_gathered_data });
};

const get_index_page = (EXPRESS_request, EXPRESS_response) => {
    EXPRESS_response.render('pages/index', { data: EXPRESS_response.DATA_gathered_data });
};

const get_profile_page = (EXPRESS_request, EXPRESS_response) => {
    const REGEX_url_profile_name = /^\/profile\/([A-Za-z0-9_\-.]{1,32})$/;
    const EXPRESS_url_profile_name = EXPRESS_request.url.match(REGEX_url_profile_name)[1];
    LMODULE_debug.print_message(`Profile requested: ${EXPRESS_url_profile_name}`);
    EXPRESS_response.render('pages/profile', { data: EXPRESS_response.DATA_gathered_data });
}

module.exports.get_login_page = get_login_page;
module.exports.get_index_page = get_index_page;
module.exports.get_profile_page = get_profile_page;
