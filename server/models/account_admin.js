/**
 * FILE:
 *      models/account_educator.js
 * AUTHOR:
 *      Matt Tiffin | mdt6150@rit.edu
 * DESCRIPTION:
 *      This script provides the model and schema for an educator account
 */

const MODULE_mongoose = require('mongoose');
const LMODULE_protocol = require('../protocol.js');
const LMODULE_login_statics = require('../login_statics.js');

const PROTOCOL_account_type = LMODULE_protocol.account_type;

MODULE_mongoose.Promise = global.Promise;

let MONGOOSE_model_account_admin = {};

const MONGOOSE_schema_account_admin = new MODULE_mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        match: /^[A-Za-z0-9_\-.]{1,32}$/,
    },

    salt: {
        type: Buffer,
        required: true,
    },

    password_hash: {
        type: String,
        required: true,
    },

    created_on: {
        type: Date,
        default: Date.now,
    },

    profile_picture: {
        type: String,
        required: false,
    },
});

MONGOOSE_schema_account_admin.statics.to_private_api = (MONGOOSE_doc_account_admin) => ({
    username: MONGOOSE_doc_account_admin.username,
    account_type: PROTOCOL_account_type.ADMIN,
    created_on: MONGOOSE_doc_account_admin.created_on,
    _id: MONGOOSE_doc_account_admin._id,
});

MONGOOSE_schema_account_admin.statics.to_public_api = (MONGOOSE_doc_account_admin) => ({
    username: MONGOOSE_doc_account_admin.username,
    account_type: PROTOCOL_account_type.ADMIN,
    created_on: MONGOOSE_doc_account_admin.created_on,
});

MONGOOSE_schema_account_admin.statics.generate_hash = LMODULE_login_statics.generate_hash;
MONGOOSE_schema_account_admin.statics.validate_password
    = LMODULE_login_statics.validate_password;

MONGOOSE_model_account_admin = MODULE_mongoose.model(
    'account_admin', MONGOOSE_schema_account_admin
);

module.exports.model = MONGOOSE_model_account_admin;
module.exports.schema = MONGOOSE_schema_account_admin;
