const LMODULE_protocol = require('../protocol.js');
const LMODULE_util_statics = require('../util_statics.js');

const PROTOCOL_error = LMODULE_protocol.error;
const LMODULE_debug = require('../debug.js');

const upload_image = (EXPRESS_request, EXPRESS_response) => {
    const EXPRESS_body_image = EXPRESS_request.file;
    if(!EXPRESS_body_image) {
        EXPRESS_response.status(400).json({
            error: PROTOCOL_error.INCOMPLETE_FORM,
        });
        return;
    }

    const EXPRESS_body_image_base64 = EXPRESS_body_image.buffer.toString('base64');
    const EXPRESS_body_image_base64_url = `data:image/png;base64,${EXPRESS_body_image_base64}`;
    EXPRESS_response.gcp_vision.safeSearchDetection({
        image: {
            content: EXPRESS_body_image_base64,
        },
    })
    .then((results) => {
        const GCP_vision_image_result = results[0].safeSearchAnnotation;
        const GCP_vision_safe_search_likelihoods = {
            'UNKNOWN': 3,
            'VERY_UNLIKELY': 0,
            'UNLIKELY': 1,
            'POSSIBLE': 5,
            'LIKELY':8,
            'VERY_LIKELY':10
        };
        const GCP_vision_safe_search_results = {
            adult: GCP_vision_safe_search_likelihoods[GCP_vision_image_result.adult],
            medical: GCP_vision_safe_search_likelihoods[GCP_vision_image_result.medical],
            racy: GCP_vision_safe_search_likelihoods[GCP_vision_image_result.racy],
        };
        let GCP_vision_safe_search_pass = true;
        if(GCP_vision_safe_search_results.adult + GCP_vision_safe_search_results.racy > 7) {
            GCP_vision_safe_search_pass = false;
        }
        if(GCP_vision_safe_search_results.medical > 5) {
            GCP_vision_safe_search_pass = false;
        }
        if(!GCP_vision_safe_search_pass) {
            EXPRESS_response.status(403).json({
                error: PROTOCOL_error.REJECTED_CONTENT,
            });
            return;
        }

        const S3_image_filename = `${LMODULE_util_statics.LEMON('profile-picture')}.png`;
        EXPRESS_response.s3_upload_file(
            EXPRESS_body_image_base64_url, S3_image_filename, 
            (S3_response) => {
                LMODULE_debug.print_message(S3_response);
                EXPRESS_response.status(201).json({
                    location: S3_response.Location,
                });
                return;
            }
        );

    }).catch((TMP_error_1) => {
        LMODULE_debug.print_message(TMP_error_1);
        EXPRESS_response.status(500).json({
            error: PROTOCOL_error.INTERNAL_SERVER_ERROR,
        });
        return;
    });
};

module.exports.upload_image = upload_image;