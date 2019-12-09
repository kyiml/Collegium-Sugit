const LMODULE_asset_manager = require('./asset_manager.js');
const LMODULE_models = require('../models');
const LMODULE_protocol = require('../protocol.js');
const LMODULE_debug = require('../debug.js');

const PROTOCOL_error = LMODULE_protocol.error;

const MONGOOSE_model_course = LMODULE_models.course.model;

const upload_course = (EXPRESS_request, EXPRESS_response) => {
    const EXPRESS_body_thumbnail = EXPRESS_request.body.thumbnail;
    const EXPRESS_body_description = EXPRESS_request.body.description;
    const EXPRESS_body_title = EXPRESS_request.body.title;
    const EXPRESS_session_author = EXPRESS_request.session.account._id;

    if(!EXPRESS_body_description || !EXPRESS_body_title) {
        EXPRESS_response.status(400).json({
            error: PROTOCOL_error.INCOMPLETE_FORM,
        });
        return;
    }
    const TMP_callback_1 = (TMP_error_1, MONGOOSE_doc_asset) => {
        if(TMP_error_1) {
            EXPRESS_response.status(TMP_error_1.status).json({
                error: TMP_error_1.error
            });
            return;
        }
        const MONGOOSE_new_course_data = {
            thumbnail: MONGOOSE_doc_asset ? EXPRESS_body_thumbnail : undefined,
            title: EXPRESS_body_title,
            description: EXPRESS_body_description,
            author: EXPRESS_session_author
        };
        const MONGOOSE_new_course = new MONGOOSE_model_course(
            MONGOOSE_new_course_data
        );
        const MONGOOSE_save_promise = MONGOOSE_new_course.save();
        MONGOOSE_save_promise.then(() => {
            const MONGOOSE_saved_course_data = MONGOOSE_model_course.to_private_api(
                MONGOOSE_new_course
            );
            EXPRESS_response.status(201).json({
                location: `/courses/${MONGOOSE_saved_course_data._id}`,
                //redirect: `/courses/view/${MONGOOSE_saved_course_data._id}`
                redirect: `/courses/`
            });
            return;
        });
        MONGOOSE_save_promise.catch((TMP_error_2) => {
            LMODULE_debug.print_message(TMP_error_2);
            EXPRESS_response.status(500).json({
                error: PROTOCOL_error.INTERNAL_SERVER_ERROR,
            });
            return;
        });
    }
    if(!EXPRESS_body_thumbnail) {
        TMP_callback_1(undefined, undefined);
        return;
    }
    LMODULE_asset_manager.validate_asset_link(
        EXPRESS_body_thumbnail, 
        EXPRESS_session_author,
        TMP_callback_1
    );
};

module.exports.upload_course = upload_course;