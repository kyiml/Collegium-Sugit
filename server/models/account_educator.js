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

let MONGOOSE_model_account_educator = {};

const MONGOOSE_schema_account_educator = new MODULE_mongoose.Schema({
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
});

MONGOOSE_schema_account_educator.statics.to_api = (MONGOOSE_doc_account_educator) => ({
    username: MONGOOSE_doc_account_educator.username,
    account_type: PROTOCOL_account_type.EDUCATOR,
    _id: MONGOOSE_doc_account_educator._id,
});

MONGOOSE_schema_account_educator.statics.generate_hash = LMODULE_login_statics.generate_hash;
MONGOOSE_schema_account_educator.statics.validate_password
    = LMODULE_login_statics.validate_password;

MONGOOSE_model_account_educator = MODULE_mongoose.model(
    'account_educator', MONGOOSE_schema_account_educator
);

module.exports.model = MONGOOSE_model_account_educator;
module.exports.schema = MONGOOSE_schema_account_educator;
