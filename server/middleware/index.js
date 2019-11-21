/**
 * FILE:
 *      server/middleware/index.js
 * AUTHOR:
 *      Matt Tiffin | mdt6150@rit.edu
 * DESCRIPTION:
 *      This script supplies a series of helper functions which can reroute the
 *      user in common scenarios.
 */

const requires_login = (EXPRESS_request, EXPRESS_response, EXPRESS_next) => {
    const SESSION_account = EXPRESS_request.session.account;

    if (!SESSION_account) {
        EXPRESS_response.redirect('/login');
        return;
    }
    EXPRESS_next();
    return;
};

const requires_logout = (EXPRESS_request, EXPRESS_response, EXPRESS_next) => {
    const SESSION_account = EXPRESS_request.session.account;

    if (SESSION_account) {
        EXPRESS_response.redirect('/');
        return;
    }
    EXPRESS_next();
    return;
};

const requires_secure = (EXPRESS_request, EXPRESS_response, EXPRESS_next) => {
    const EXPRESS_host = EXPRESS_request.hostname;
    const EXPRESS_request_url = EXPRESS_request.url;
    const EXPRESS_request_protocol = EXPRESS_request.headers['x-forwarded-proto'];

    if (EXPRESS_request_protocol !== 'https') {
        EXPRESS_response.redirect(`https://${EXPRESS_host}${EXPRESS_request_url}`);
        return;
    }
    EXPRESS_next();
    return;
};

const bypass_secure = (EXPRESS_request, EXPRESS_response, EXPRESS_next) => {
    EXPRESS_next();
};

const determine_secure_gen = () => {
    if (process.env.NODE_ENV === 'production') {
        return requires_secure;
    }

    return bypass_secure;
};

module.exports.requires_login = requires_login;
module.exports.requires_logout = requires_logout;
module.exports.requires_secure = determine_secure_gen();
module.exports.data_gatherer = require('./data_gatherer.js');
