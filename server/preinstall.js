const LMODULE_debug = require('./debug.js');
const MODULE_fs = require('fs');

const write_creds = () => {
    const GCP_vision_config = process.env.GCP_VISION_CONFIG;
    if (!GCP_vision_config) {
        return;
    }
    MODULE_fs.writeFile(
        '/app/credentials/gcp_vision_auth.json', GCP_vision_config,
        (TMP_error_1) => {
            if (TMP_error_1) {
                LMODULE_debug.print_message('fatal error!');
                return;
            }
        }
    );
};

write_creds();
