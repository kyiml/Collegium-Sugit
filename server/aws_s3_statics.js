const attach_aws_s3_statics = (AWS_S3) => {
    const s3_upload_file = (EXPRESS_body_file_data, S3_filename, TMP_callback_1) => {
        AWS_S3.client.upload({
            Bucket: AWS_S3.config.bucket,
            Key: S3_filename,
            Body: EXPRESS_body_file_data,
        }, (TMP_error_1, AWS_S3_response) => {
            if (TMP_error_1) {
                throw TMP_error_1;
            }
            TMP_callback_1(AWS_S3_response);
        });
    };

    const attach_to_response = (EXPRESS_request, EXPRESS_response, EXPRESS_next) => {
        EXPRESS_response.s3_upload_file = s3_upload_file;
        EXPRESS_next();
    };
    return attach_to_response;
};

module.exports = attach_aws_s3_statics;
