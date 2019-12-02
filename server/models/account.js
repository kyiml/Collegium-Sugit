/**
 * FILE:
 *      models/account.js
 * AUTHOR:
 *      Matt Tiffin | mdt6150@rit.edu
 * DESCRIPTION:
 *      This script provides the model and schema for an account
 */

const MODULE_mongoose = require('mongoose');
const LMODULE_login_statics = require('../login_statics.js');

MODULE_mongoose.Promise = global.Promise;

let MONGOOSE_model_account = {};

const MONGOOSE_schema_account = new MODULE_mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        match: /^[A-Za-z0-9_-]{1,32}$/,
    },

    account_type: {
        type: String,
        required: true,
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

    profile_bio: {
        type: String,
        required: false,
    },
});

MONGOOSE_schema_account.statics.to_private_api = (MONGOOSE_doc_account) => ({
    username: MONGOOSE_doc_account.username,
    account_type: MONGOOSE_doc_account.account_type,
    created_on: MONGOOSE_doc_account.created_on,
    profile_picture: MONGOOSE_doc_account.profile_picture,
    _id: MONGOOSE_doc_account._id,
});

MONGOOSE_schema_account.statics.to_public_api = (MONGOOSE_doc_account) => ({
    username: MONGOOSE_doc_account.username,
    account_type: MONGOOSE_doc_account.account_type,
    created_on: MONGOOSE_doc_account.created_on,
    profile_picture: MONGOOSE_doc_account.profile_picture,
});

MONGOOSE_schema_account.statics.generate_hash = LMODULE_login_statics.generate_hash;
MONGOOSE_schema_account.statics.validate_password
    = LMODULE_login_statics.validate_password;

MONGOOSE_model_account = MODULE_mongoose.model(
    'account', MONGOOSE_schema_account
);

module.exports.model = MONGOOSE_model_account;
module.exports.schema = MONGOOSE_schema_account;
