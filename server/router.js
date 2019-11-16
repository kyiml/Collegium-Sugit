/**
 * FILE:
 *      server/router.js
 * AUTHOR:
 *      Matt Tiffin | mdt6150@rit.edu
 * DESCRIPTION:
 *      This script is the hub of all functional app requests.
 */

const LMODULE_controllers = require('./controllers');
const LMODULE_middleware = require('./middleware');

const CNST_require_login = LMODULE_middleware.requires_login;
const CNST_require_logout = LMODULE_middleware.requires_logout;
const CNST_require_secure = LMODULE_middleware.requires_secure;
const CNST_gather_account_data = LMODULE_middleware.data_gatherer.gather_account_data;

const CNST_get_login_page = LMODULE_controllers.pages.get_login_page;
const CNST_get_index_page = LMODULE_controllers.pages.get_index_page;

const router = (EXPRESS_app) => {
    EXPRESS_app.get('/login', CNST_require_secure, CNST_require_logout, CNST_get_login_page);
    EXPRESS_app.get('/', CNST_require_login, CNST_gather_account_data, CNST_get_index_page);
};

module.exports = router;
