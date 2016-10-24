"use strict";

const davServer = require("jsDAV/lib/jsdav");
const davLockFs = require("jsDAV/lib/DAV/plugins/locks/fs");
const davAuthFl = require("jsDAV/lib/DAV/plugins/auth/file");

console.log(__dirname);
davServer.createServer({
    node: __dirname + "/assets",
    locksBackend: davLockFs.new(__dirname + "/data"),
    authBackend: davAuthFl.new(__dirname + "/myhtdigest"),
    realm: "SabreDAV"
}, 8000);

