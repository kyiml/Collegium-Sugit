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
    INVALID_QUERY: 'ERROR_INVALID_QUERY',
    USERNAME_UNAVAILABLE: 'ERROR_USERNAME_UNAVAILABLE',
    INTERNAL_SERVER_ERROR: 'ERROR_INTERNAL_SERVER_ERROR',
    REJECTED_CONTENT: 'ERROR_REJECTED_CONTENT',
    NOT_FOUND: 'ERROR_NOT_FOUND',
    PERMISSION_DENIED: 'ERROR_PERMISSION_DENIED',
};

const PROTOCOL_account_types = {
    EDUCATOR: 'ACCOUNT_EDUCATOR',
    STUDENT: 'ACCOUNT_STUDENT',
    ADMIN: 'ACCOUNT_ADMIN',
};

module.exports.error = PROTOCOL_errors;
module.exports.account_type = PROTOCOL_account_types;
