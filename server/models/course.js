/**
 * FILE:
 *      models/course.js
 * AUTHOR:
 *      Matt Tiffin | mdt6150@rit.edu
 * DESCRIPTION:
 *      This script provides the model and schema for a course
 */

const MODULE_mongoose = require('mongoose');

MODULE_mongoose.Promise = global.Promise;

let MONGOOSE_model_course = {};

const MONGOOSE_schema_course = new MODULE_mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        match: /^[ A-Za-z0-9_-]{1,32}$/,
    },

    description: {
        type: String,
        required: false,
    },

    thumbnail: {
        type: String,
        required: false,
    },

    author: {
        type: MODULE_mongoose.Schema.ObjectId,
        required: true,
    },

    created_on: {
        type: Date,
        default: Date.now,
    },

    is_listed: {
        type: Boolean,
        default: true,
    },
});

MONGOOSE_schema_course.statics.find_by_id = (MONGOOSE_course_id, TMP_callback_1) => {
    const MONGOOSE_search = {
        _id: MONGOOSE_convert_id(MONGOOSE_course_id),
    };
    MONGOOSE_model_asset.findOne(MONGOOSE_search, TMP_callback_1);
    return;
};

MONGOOSE_schema_course.statics.get_by_new = (MONGOOSE_num_courses, TMP_callback_1) => {
    const MONGOOSE_search = {
        is_listed: true,
    };
    const MONGOOSE_sort = {
        _id: -1,
    };
    MONGOOSE_model_course.find(MONGOOSE_search)
        .sort(MONGOOSE_sort)
        .limit(MONGOOSE_num_courses)
        .exec(TMP_callback_1);
}

MONGOOSE_schema_course.statics.to_private_api = (MONGOOSE_doc_course) => ({
    title: MONGOOSE_doc_course.title,
    description: MONGOOSE_doc_course.description,
    thumbnail: MONGOOSE_doc_course.thumbnail,
    author: MONGOOSE_doc_course.author,
    is_listed: MONGOOSE_doc_course.is_listed,
    created_on: MONGOOSE_doc_course.created_on,
    _id: MONGOOSE_doc_course._id,
});

MONGOOSE_schema_course.statics.to_public_api = (MONGOOSE_doc_course) => ({
    title: MONGOOSE_doc_course.title,
    description: MONGOOSE_doc_course.description,
    thumbnail: MONGOOSE_doc_course.thumbnail,
    author: MONGOOSE_doc_course.author,
    created_on: MONGOOSE_doc_course.created_on,
});

MONGOOSE_model_course = MODULE_mongoose.model(
    'course', MONGOOSE_schema_course
);

module.exports.model = MONGOOSE_model_course;
module.exports.schema = MONGOOSE_schema_course;
