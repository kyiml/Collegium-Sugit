const LMODULE_debug = require('./debug.js');
const MODULE_fs = require('fs');
const MODULE_path = require('path');

const write_creds = () => {
    const GCP_vision_config = process.env.GCP_VISION_CONFIG;
    if (!GCP_vision_config) {
        return;
    }
    const GCP_vision_config_location = MODULE_path.resolve(
        `${__dirname}/../credentials/gcp_vision_auth.json`
    );
    MODULE_fs.mkdir(MODULE_path.dirname(GCP_vision_config_location), { recursive: true }, () => {
        LMODULE_debug.print_message(`writing gcp auth to ${GCP_vision_config_location}`);
        MODULE_fs.writeFile(
            GCP_vision_config_location, GCP_vision_config,
            (TMP_error_1) => {
                if (TMP_error_1) {
                    LMODULE_debug.print_message(TMP_error_1);
                    return;
                }
            }
        );
    });
};

write_creds();
