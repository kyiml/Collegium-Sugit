const LMODULE_protocol = require('../protocol.js');
const LMODULE_util_statics = require('../util_statics.js');
const LMODULE_models = require('../models');

const PROTOCOL_error = LMODULE_protocol.error;
const LMODULE_debug = require('../debug.js');

const MONGOOSE_model_asset = LMODULE_models.asset.model;

const upload_image = (EXPRESS_request, EXPRESS_response) => {
    const EXPRESS_body_image = EXPRESS_request.file;
    if (!EXPRESS_body_image) {
        EXPRESS_response.status(400).json({
            error: PROTOCOL_error.INCOMPLETE_FORM,
        });
        return;
    }

    const EXPRESS_body_image_base64 = EXPRESS_body_image.buffer.toString('base64');
    EXPRESS_response.gcp_vision.safeSearchDetection({
        image: {
            content: EXPRESS_body_image_base64,
        },
    })
        .then((results) => {
            const GCP_vision_image_result = results[0].safeSearchAnnotation;
            const GCP_vision_safe_search_likelihoods = {
                UNKNOWN: 3,
                VERY_UNLIKELY: 0,
                UNLIKELY: 1,
                POSSIBLE: 5,
                LIKELY: 8,
                VERY_LIKELY: 10,
            };
            const GCP_vision_safe_search_results = {
                adult: GCP_vision_safe_search_likelihoods[GCP_vision_image_result.adult],
                medical: GCP_vision_safe_search_likelihoods[GCP_vision_image_result.medical],
                racy: GCP_vision_safe_search_likelihoods[GCP_vision_image_result.racy],
            };
            let GCP_vision_safe_search_pass = true;
            if (GCP_vision_safe_search_results.adult + GCP_vision_safe_search_results.racy > 7) {
                GCP_vision_safe_search_pass = false;
            }
            if (GCP_vision_safe_search_results.medical > 5) {
                GCP_vision_safe_search_pass = false;
            }
            if (!GCP_vision_safe_search_pass) {
                EXPRESS_response.status(403).json({
                    error: PROTOCOL_error.REJECTED_CONTENT,
                });
                return;
            }

            const AWS_S3_image_filename = `profile-pictures/${LMODULE_util_statics.LEMON()}.png`;
            EXPRESS_response.aws_s3_upload_file(
                EXPRESS_body_image.buffer, AWS_S3_image_filename,
                (TMP_error_1) => {
                    if (TMP_error_1) {
                        LMODULE_debug.print_message(TMP_error_1);
                        EXPRESS_response.status(500).json({
                            error: PROTOCOL_error.INTERNAL_SERVER_ERROR,
                        });
                        return;
                    }

                    const MONGOOSE_new_asset_data = {
                        resource_type: 'image',
                        resource_link: AWS_S3_image_filename,
                        owner: EXPRESS_request.session.account._id,
                    };
                    const MONGOOSE_new_asset = new MONGOOSE_model_asset(
                        MONGOOSE_new_asset_data
                    );
                    const MONGOOSE_save_promise = MONGOOSE_new_asset.save();
                    MONGOOSE_save_promise.then(() => {
                        const MONGOOSE_saved_asset_data = MONGOOSE_model_asset.to_private_api(
                            MONGOOSE_new_asset
                        );
                        EXPRESS_response.status(201).json({
                            location: `/assets/${MONGOOSE_saved_asset_data._id}`,
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
            );
            return;
        }).catch((TMP_error_1) => {
            LMODULE_debug.print_message(TMP_error_1);
            EXPRESS_response.status(500).json({
                error: PROTOCOL_error.INTERNAL_SERVER_ERROR,
            });
            return;
        });
};

const download_asset = (EXPRESS_request, EXPRESS_response) => {
    const REGEX_url_asset_id = /^\/assets\/([0-9a-f]*?)\/?$/;
    const EXPRESS_url_asset_id = EXPRESS_request.url.match(REGEX_url_asset_id)[1];
    MONGOOSE_model_asset.find_by_id(EXPRESS_url_asset_id, (TMP_error_1, MONGOOSE_doc_asset) => {
        if (TMP_error_1) {
            EXPRESS_response.status(404).json({
                error: PROTOCOL_error.NOT_FOUND,
            });
            return;
        }
        const MONGOOSE_asset_read_permission = MONGOOSE_model_asset.read_permission(
            MONGOOSE_doc_asset, EXPRESS_request.session.account
        );
        if (!MONGOOSE_asset_read_permission) {
            EXPRESS_response.status(403).json({
                error: PROTOCOL_error.PERMISSION_DENIED,
            });
            return;
        }
        const MONGOOSE_asset_resource_link = MONGOOSE_model_asset.to_private_api(
            MONGOOSE_doc_asset
        ).resource_link;
        EXPRESS_response.aws_s3_download_file(
            MONGOOSE_asset_resource_link,
            (TMP_error_2, AWS_S3_response) => {
                if (TMP_error_2) {
                    LMODULE_debug.print_message(TMP_error_2);
                    EXPRESS_response.status(500).json({
                        error: PROTOCOL_error.INTERNAL_SERVER_ERROR,
                    });
                    return;
                }
                EXPRESS_response.status(200).send(AWS_S3_response.Body.data);
                return;
            }
        );
    });
};

module.exports.upload_image = upload_image;
module.exports.download_asset = download_asset;
