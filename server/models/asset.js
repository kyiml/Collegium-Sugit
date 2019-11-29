const MODULE_mongoose = require('mongoose');
const LMODULE_protocol = require('../protocol.js');

MODULE_mongoose.Promise = global.Promise;

let MONGOOSE_model_asset = {};

const MONGOOSE_convert_id = MODULE_mongoose.Types.ObjectId;
const MONGOOSE_schema_asset = new MODULE_mongoose.Schema({
    resource_type: {
        type: String,
        required: true,
    },

    resource_link: {
        type: String,
        required: true,
        unique: true,
    },

    owner: {
        type: MODULE_mongoose.Schema.ObjectId,
        required: true,
    },

    created_on: {
        type: Date,
        default: Date.now,
    },

    references: {
        type: Number,
        default: 0,
    },
});

MONGOOSE_schema_asset.statics.to_private_api = (MONGOOSE_doc_asset) => ({
    resource_type: MONGOOSE_doc_asset.resource_type,
    resource_link: MONGOOSE_doc_asset.resource_link,
    owner: MONGOOSE_doc_asset.owner,
    references: MONGOOSE_doc_asset.references,
    created_on: MONGOOSE_doc_asset.created_on,
    _id: MONGOOSE_doc_asset._id,
});

MONGOOSE_schema_asset.statics.delete_permission = (/*MONGOOSE_doc_asset MONGOOSE_doc_account*/) => {
    return false;
};

MONGOOSE_schema_asset.statics.read_permission = (/*MONGOOSE_doc_asset, MONGOOSE_doc_account*/) => {
    return true;
};

MONGOOSE_schema_asset.statics.find_by_id = (MONGOOSE_asset_id, TMP_callback_1) => {
    const MONGOOSE_search = {
        _id: MONGOOSE_convert_id(MONGOOSE_asset_id),
    };
    MONGOOSE_model_asset.findOne(MONGOOSE_search, TMP_callback_1);
    return;
  };

MONGOOSE_model_asset = MODULE_mongoose.model(
    'asset', MONGOOSE_schema_asset
);

module.exports.model = MONGOOSE_model_asset;
module.exports.schema = MONGOOSE_schema_asset;