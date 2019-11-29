const LMODULE_debug = require('./debug.js');

const attach_statics = (AWS_S3) => {
    const upload_file = (EXPRESS_body_file_data, AWS_S3_filename, TMP_callback_1) => {
        LMODULE_debug.print_message(`Uploading file to AWS S3: ${AWS_S3_filename}`);
        AWS_S3.client.upload({
            Bucket: AWS_S3.config.bucket,
            Key: AWS_S3_filename,
            Body: EXPRESS_body_file_data,
        }, TMP_callback_1);
    };

    const download_file = (AWS_S3_filename, TMP_callback_1) => {
        LMODULE_debug.print_message(`Retrieving file from AWS S3: ${AWS_S3_filename}`);
        AWS_S3.client.getObject({
            Bucket: AWS_S3.config.bucket,
            Key: AWS_S3_filename,
        }, TMP_callback_1);
    };

    const attach_to_response = (EXPRESS_request, EXPRESS_response, EXPRESS_next) => {
        EXPRESS_response.aws_s3_upload_file = upload_file;
        EXPRESS_response.aws_s3_download_file = download_file;
        EXPRESS_next();
    };
    return attach_to_response;
};

module.exports = attach_statics;
