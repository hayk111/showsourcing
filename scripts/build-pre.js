"use strict";
exports.__esModule = true;
var path = require("path");
var colors = require("colors/safe");
var fs = require("fs");
var packageJson = require("../package.json");
var appVersion = packageJson.version;
var date = new Date();
console.log(colors.cyan('\nRunning pre-build tasks'));
var versionFilePath = path.join(__dirname + '/../src/environments/global.const.ts');
var src = "// this file was updated on " + date + "\nexport const WEB_VERSION = '" + appVersion + "';\n";
// ensure version module pulls value from package.json
fs.writeFile(versionFilePath, src, {}, function (err) {
    if (err) {
        return console.log(colors.red(err.message));
    }
    console.log(colors.green("Updating application version " + colors.yellow(appVersion)));
    console.log("" + colors.green('Writing version module to ') + colors.yellow(versionFilePath) + "\n");
});
