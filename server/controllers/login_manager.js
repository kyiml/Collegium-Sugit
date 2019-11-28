/**
 * FILE:
 *      server/controllers/login_manager.js
 * AUTHOR:
 *      Matt Tiffin | mdt6150@rit.edu
 * DESCRIPTION:
 *      This script supplies generic login-related functions for each of the available
 *      account types
 */

const LMODULE_models = require('../models');
const LMODULE_protocol = require('../protocol.js');
const LMODULE_debug = require('../debug.js');
const LMODULE_login_statics = require('../login_statics.js');

const PROTOCOL_error = LMODULE_protocol.error;
const PROTOCOL_account_type = LMODULE_protocol.account_type;

const MONGOOSE_model_account_educator = LMODULE_models.account_educator.model;
const MONGOOSE_model_account_student = LMODULE_models.account_student.model;
const MONGOOSE_model_account_admin = LMODULE_models.account_admin.model;

const account_type_model_gen = (EXPRESS_body_account_type) => {
    switch (EXPRESS_body_account_type) {
    case PROTOCOL_account_type.ADMIN:
        return MONGOOSE_model_account_admin;
    case PROTOCOL_account_type.EDUCATOR:
        return MONGOOSE_model_account_educator;
    case PROTOCOL_account_type.STUDENT:
        return MONGOOSE_model_account_student;
    default:
        return undefined;
    }
};

const logout = (EXPRESS_request, EXPRESS_response) => {
    EXPRESS_request.session.destroy();
    EXPRESS_response.redirect('/login');
};

const login = (EXPRESS_request, EXPRESS_response) => {
    const EXPRESS_body_username = EXPRESS_request.body.username;
    const EXPRESS_body_password = EXPRESS_request.body.password;

    if (!EXPRESS_body_username || !EXPRESS_body_password) {
        EXPRESS_response.status(400).json({
            error: PROTOCOL_error.INCOMPLETE_FORM,
        });
        return;
    }

    if (typeof EXPRESS_body_username !== 'string' ||
        typeof EXPRESS_body_password !== 'string') {
        EXPRESS_response.status(400).json({
            error: PROTOCOL_error.INVALID_FORM,
        });
        return;
    }

    const TMP_try_auth = (MONGOOSE_model_account, TMP_callback) => {
        LMODULE_login_statics.authenticate(
            MONGOOSE_model_account, EXPRESS_body_username, EXPRESS_body_password,
            (TMP_error_1, MONGOOSE_account_doc) => {
                if (TMP_error_1 || !MONGOOSE_account_doc) {
                    TMP_callback(false); // account not found (yet)
                    return;
                }

                EXPRESS_request.session.account = MONGOOSE_model_account.to_private_api(
                    MONGOOSE_account_doc
                );

                EXPRESS_response.json({
                    redirect: '/',
                });
                TMP_callback(true); // found account
                return;
            }
        );
    };

    TMP_try_auth(account_type_model_gen(PROTOCOL_account_type.STUDENT), (TMP_result_1) => {
        if (TMP_result_1) {
            return;
        }
        TMP_try_auth(account_type_model_gen(PROTOCOL_account_type.EDUCATOR), (TMP_result_2) => {
            if (TMP_result_2) {
                return;
            }
            TMP_try_auth(account_type_model_gen(PROTOCOL_account_type.ADMIN), (TMP_result_3) => {
                if (TMP_result_3) {
                    return;
                }
                EXPRESS_response.status(401).json({
                    error: PROTOCOL_error.INVALID_LOGIN,
                });
                return;
            });
        });
    });
};

const signup = (EXPRESS_request, EXPRESS_response) => {
    const EXPRESS_body_username = EXPRESS_request.body.username;
    const EXPRESS_body_password = EXPRESS_request.body.password;
    const EXPRESS_body_password_confirmation = EXPRESS_request.body.password_confirmation;
    const EXPRESS_body_account_type = EXPRESS_request.body.account_type;

    if (!EXPRESS_body_username ||
        !EXPRESS_body_password ||
        !EXPRESS_body_password_confirmation ||
        !EXPRESS_body_account_type) {
        EXPRESS_response.status(400).json({
            error: PROTOCOL_error.INCOMPLETE_FORM,
        });
        return;
    }

    if (typeof EXPRESS_body_username !== 'string' ||
        typeof EXPRESS_body_password !== 'string' ||
        typeof EXPRESS_body_password_confirmation !== 'string' ||
        typeof EXPRESS_body_account_type !== 'string') {
        EXPRESS_response.status(400).json({
            error: PROTOCOL_error.INVALID_FORM,
        });
        return;
    }

    const MONGOOSE_model_account = account_type_model_gen(EXPRESS_body_account_type);
    if (!MONGOOSE_model_account) {
        EXPRESS_response.status(400).json({
            error: PROTOCOL_error.INVALID_FORM,
        });
        return;
    }

    if (EXPRESS_body_password !== EXPRESS_body_password_confirmation) {
        EXPRESS_response.status(400).json({
            error: PROTOCOL_error.INVALID_FORM,
        });
        return;
    }

    LMODULE_login_statics.generate_hash(
        EXPRESS_request.body.password,
        (CRYPTO_salt, CRYPTO_hash_result) => {
            const MONGOOSE_new_account_data = {
                username: EXPRESS_body_username,
                salt: CRYPTO_salt,
                password_hash: CRYPTO_hash_result,
            };

            const MONGOOSE_new_account = new MONGOOSE_model_account(
                MONGOOSE_new_account_data
            );
            const MONGOOSE_save_promise = MONGOOSE_new_account.save();
            MONGOOSE_save_promise.then(() => {
                EXPRESS_request.session.account = MONGOOSE_model_account.to_private_api(
                    MONGOOSE_new_account
                );
                EXPRESS_response.json({
                    redirect: '/',
                });
                return;
            });
            MONGOOSE_save_promise.catch((TMP_error_1) => {
                LMODULE_debug.print_message(TMP_error_1);

                if (TMP_error_1.code === 11000) {
                    EXPRESS_response.status(400).json({
                        error: PROTOCOL_error.USERNAME_UNAVAILABLE,
                    });
                    return;
                }
            });
        }
    );
    return;
};

module.exports.login = login;
module.exports.logout = logout;
module.exports.signup = signup;
