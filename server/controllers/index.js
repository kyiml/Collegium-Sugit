/**
 * FILE:
 *      server/controllers/index.js
 * AUTHOR:
 *      Matt Tiffin | mdt6150@rit.edu
 * DESCRIPTION:
 *      This script provides access to the files in the controllers directory
 */

module.exports.login_manager = require('./login_manager.js');
module.exports.asset_manager = require('./asset_manager');
module.exports.pages = require('./pages.js');
