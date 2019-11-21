/**
 * FILE:
 *      server/controllers/pages.js
 * AUTHOR:
 *      Matt Tiffin | mdt6150@rit.edu
 * DESCRIPTION:
 *      This script supplies all of the handlers for serving rendered pages
 */

const get_login_page = (EXPRESS_request, EXPRESS_response) => {
    EXPRESS_response.render('pages/login', { data: EXPRESS_response.DATA_gathered_data });
};

const get_index_page = (EXPRESS_request, EXPRESS_response) => {
    EXPRESS_response.render('pages/index', { data: EXPRESS_response.DATA_gathered_data });
};

module.exports.get_login_page = get_login_page;
module.exports.get_index_page = get_index_page;
