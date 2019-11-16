/**
 * FILE:
 *      server/debug.js
 * AUTHOR:
 *      Matt Tiffin | mdt6150@rit.edu
 * DESCRIPTION:
 *      This script is used to print out all console messages, and is used to
 *      easily silence debugging messages in production mode
 */

/* eslint no-console: off */

const enabled = (process.env.NODE_ENV !== 'production');

const print_message = (...args) => {
    if (!enabled) {
        return;
    }
    console.log(...args);
};

module.exports.print_message = print_message;
