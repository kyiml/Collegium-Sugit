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
const MODULE_multer = require('multer');
const MULTER = MODULE_multer();

const CNST_require_login = LMODULE_middleware.requires_login;
const CNST_require_logout = LMODULE_middleware.requires_logout;
const CNST_require_secure = LMODULE_middleware.requires_secure;
const CNST_gather_account_data = LMODULE_middleware.data_gatherer.gather_account_data;
const CNST_gather_csrf_data = LMODULE_middleware.data_gatherer.gather_csrf_data;

const CNST_get_login_page = LMODULE_controllers.pages.get_login_page;
const CNST_get_index_page = LMODULE_controllers.pages.get_index_page;
const CNST_get_profile_page = LMODULE_controllers.pages.get_profile_page;

const CNST_login = LMODULE_controllers.login_manager.login;
const CNST_signup = LMODULE_controllers.login_manager.signup;
const CNST_logout = LMODULE_controllers.login_manager.logout;

const CNST_upload_image = LMODULE_controllers.asset_manager.upload_image;

const router = (EXPRESS_app) => {
    EXPRESS_app.use(CNST_gather_csrf_data);
    EXPRESS_app.get('/login', CNST_require_secure, CNST_require_logout, CNST_get_login_page);
    EXPRESS_app.post('/login', CNST_require_secure, CNST_require_logout, CNST_login);
    EXPRESS_app.post('/signup', CNST_require_secure, CNST_require_logout, CNST_signup);
    EXPRESS_app.get('/', CNST_require_login, CNST_gather_account_data, CNST_get_index_page);
    EXPRESS_app.get('/logout', CNST_require_secure, CNST_require_login, CNST_logout);
    EXPRESS_app.get('/profile*', CNST_require_secure,
        CNST_gather_account_data, CNST_get_profile_page);

    EXPRESS_app.post('/upload/image', CNST_require_login, CNST_gather_account_data,
        MULTER.single('image'), CNST_upload_image);
};

module.exports = router;
