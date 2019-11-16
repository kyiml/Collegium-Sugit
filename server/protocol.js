/**
 * FILE:
 *      server/protocol.js
 * AUTHOR:
 *      Matt Tiffin | mdt6150@rit.edu
 * DESCRIPTION:
 *      This script supplies a set of constants to help with server-client consistency
 *      and communication.
 */

const PROTOCOL_errors = {
    INCOMPLETE_FORM: 'ERROR_INCOMPLETE_FORM',
    INVALID_FORM: 'ERROR_INVALID_FORM',
    INVALID_LOGIN: 'ERROR_INVALID_LOGIN',
    USERNAME_UNAVAILABLE: 'ERROR_USERNAME_UNAVAILABLE',
};

const PROTOCOL_account_types = {
    EDUCATOR: 'ACCOUNT_EDUCATOR',
    STUDENT: 'ACCOUNT_STUDENT',
    ADMIN: 'ACCOUNT_ADMIN',
};

module.exports.error = PROTOCOL_errors;
module.exports.account_type = PROTOCOL_account_types;
