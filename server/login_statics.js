/**
 * FILE:
 *      server/index.js
 * AUTHOR:
 *      Matt Tiffin | mdt6150@rit.edu
 * DESCRIPTION:
 *      This script supplies a series of static methods which aid in account security and
 *      authentication for the login manager.
 */

const MODULE_crypto = require('crypto');

const CRYPTO_config = {
    iterations: 60000,
    salt_length: 64,
    key_length: 64,
};

const generate_hash = (EXPRESS_body_password, TMP_callback_1) => {
    const CRYPTO_salt = MODULE_crypto.randomBytes(CRYPTO_config.salt_length);

    MODULE_crypto.pbkdf2(EXPRESS_body_password, CRYPTO_salt, CRYPTO_config.iterations,
        CRYPTO_config.key_length, 'RSA-SHA512',
        (TMP_error_1, CRYPTO_hash_result) => {
            TMP_callback_1(CRYPTO_salt, CRYPTO_hash_result.toString('hex'));
            return;
        }
    );
};

const validate_password = (MONGOOSE_doc_account, EXPRESS_body_password, TMP_callback_1) => {
    const MONGOOSE_doc_account_password_hash = MONGOOSE_doc_account.password_hash;

    MODULE_crypto.pbkdf2(EXPRESS_body_password, MONGOOSE_doc_account.salt,
        CRYPTO_config.iterations, CRYPTO_config.key_length, 'RSA-SHA512',
        (TMP_error_1, CRYPTO_hash_result) => {
            if (CRYPTO_hash_result.toString('hex') !== MONGOOSE_doc_account_password_hash) {
                TMP_callback_1(false);
                return;
            }
            TMP_callback_1(true);
            return;
        });
};

const find_by_username = (MONGOOSE_model_account, EXPRESS_body_username, TMP_callback_1) => {
    const MONGOOSE_search_params = {
        username: EXPRESS_body_username,
    };

    MONGOOSE_model_account.findOne(MONGOOSE_search_params, TMP_callback_1);
    return;
};

const authenticate = (MONGOOSE_model_account, EXPRESS_body_username, EXPRESS_body_password,
    TMP_callback_1) => {
    find_by_username(MONGOOSE_model_account, EXPRESS_body_username,
        (TMP_error_1, MONGOOSE_doc_account) => {
            if (TMP_error_1) {
                TMP_callback_1(TMP_error_1, null);
                return;
            }

            if (!MONGOOSE_doc_account) {
                TMP_callback_1(null, null);
                return;
            }

            validate_password(MONGOOSE_doc_account, EXPRESS_body_password,
                (MONGOOSE_validation_result) => {
                    if (MONGOOSE_validation_result === true) {
                        TMP_callback_1(null, MONGOOSE_doc_account);
                        return;
                    }

                    TMP_callback_1(null, null);
                    return;
                }
            );
            return;
        });
    return;
};

module.exports.generate_hash = generate_hash;
module.exports.authenticate = authenticate;
module.exports.find_by_username = find_by_username;
