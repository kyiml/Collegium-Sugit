/**
 * FILE:
 *      server/controllers/index.js
 * AUTHOR:
 *      Matt Tiffin | mdt6150@rit.edu
 * DESCRIPTION:
 *      This script provides access to the files in the controllers directory
 */

module.exports.account_admin = require('./account_admin.js');
module.exports.account_educator = require('./account_educator.js');
module.exports.account_student = require('./account_student.js');
module.exports.login_manager = require('./login_manager.js');
module.exports.pages = require('./pages.js');
