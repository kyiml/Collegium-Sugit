/**
 * FILE:
 *      server/app.js
 * AUTHOR:
 *      Matt Tiffin | mdt6150@rit.edu
 * DESCRIPTION:
 *      This script sets up the tech stack and initializes the express server. It
 *      is the entry point of the program.
 */

const MODULE_path = require('path');
const MODULE_express = require('express');
const MODULE_compression = require('compression');
const MODULE_serve_favicon = require('serve-favicon');
const MODULE_cookie_parser = require('cookie-parser');
const MODULE_body_parser = require('body-parser');
const MODULE_mongoose = require('mongoose');
const MODULE_session = require('express-session');
const MODULE_redis_store = require('connect-redis');
const MODULE_url = require('url');
const MODULE_csrf = require('csurf');

const LMODULE_debug = require('./debug.js');
const LMODULE_router = require('./router.js');

const CNST_port = process.env.PORT || process.env.NODE_PORT || 3000;

const CNST_db_url = process.env.MONGODB_URI || 'mongodb://localhost/CollegiumSugit';
const CNST_session_id_secret = process.env.SESSION_ID_SECRET || 'testenvdonotuse';

MODULE_mongoose.connect(CNST_db_url, (TMP_error_1) => {
    if (TMP_error_1) {
        LMODULE_debug.print_message('Could not connect to database');
        throw TMP_error_1;
    }
});

const REDIS_store = MODULE_redis_store(MODULE_session);
const REDIS_config_gen = () => {
    const REDIS_config_url = process.env.REDISCLOUD_URL;
    if (!REDIS_config_url) {
        return {
            url: {
                hostname: 'localhost',
                port: 6379,
            },
            pass: '',
        };
    }
    const REDIS_config_parsed_url = MODULE_url.parse(REDIS_config_url);
    const REDIS_config_parsed_pass = REDIS_config_url.auth.split(':')[1];
    return {
        url: REDIS_config_parsed_url,
        pass: REDIS_config_parsed_pass,
    };
};

const REDIS_config = REDIS_config_gen();
const REDIS_url = REDIS_config.url;
const REDIS_pass = REDIS_config.pass;

const EXPRESS_app = MODULE_express();

EXPRESS_app.use(
    '/generated', MODULE_express.static(MODULE_path.resolve(`${__dirname}/../hosted/generated`))
);
EXPRESS_app.use(
    '/fonts', MODULE_express.static(MODULE_path.resolve(`${__dirname}/../hosted/generated/fonts`))
);
EXPRESS_app.use(
    '/static/img', MODULE_express.static(MODULE_path.resolve(`${__dirname}/../hosted/static/img`))
);
EXPRESS_app.use(
    '/static/libraries', MODULE_express.static(
        MODULE_path.resolve(`${__dirname}/../hosted/static/libraries`)
    )
);
EXPRESS_app.use(MODULE_serve_favicon(`${__dirname}/../hosted/static/img/favicon.png`));
EXPRESS_app.disable('x-powered-by');
EXPRESS_app.use(MODULE_compression());
EXPRESS_app.use(MODULE_body_parser.urlencoded({
    extended: true,
}));
EXPRESS_app.use(MODULE_session({
    key: 'sessionid',
    store: new REDIS_store({
        host: REDIS_url.hostname,
        port: REDIS_url.port,
        pass: REDIS_pass,
    }),
    secret: CNST_session_id_secret,
    resave: true,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
    },
}));

EXPRESS_app.set('view engine', 'ejs');
EXPRESS_app.set('views', `${__dirname}/../views`);
EXPRESS_app.use(MODULE_cookie_parser());

EXPRESS_app.use(MODULE_csrf());
EXPRESS_app.use((TMP_error_1, EXPRESS_request, EXPRESS_response, EXPRESS_next) => {
    if (TMP_error_1.code !== 'EBADCSRFTOKEN') {
        EXPRESS_next(TMP_error_1);
        return;
    }
    LMODULE_debug.print_message('Missing CSRF token');
    return;
});

LMODULE_router(EXPRESS_app);

EXPRESS_app.listen(CNST_port, (TMP_error_1) => {
    if (TMP_error_1) {
        throw TMP_error_1;
    }
    LMODULE_debug.print_message(`Listening on port ${CNST_port}`);
});
