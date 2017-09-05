"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path = require("path");
var Fs = require("fs");
var parse_1 = require("./parse");
var Properties = /** @class */ (function () {
    /**
     *
     * @param file
     */
    function Properties(file) {
        this._properties = {};
        this.read(this._properties, file);
    }
    /**
     *
     * @param node
     * @param file
     */
    Properties.prototype.read = function (node, file) {
        file = path.resolve(file);
        if (!Fs.existsSync(file)) {
            throw new Error("Cannot find file properties '" + file + "'");
        }
        var properties = JSON.parse(Fs.readFileSync(file, 'utf-8'));
        for (var key in properties) {
            if (key === "propertiesFiles") {
                var propertiesFiles = properties[key];
                try {
                    var cwd = path.dirname(file);
                    if (propertiesFiles.cwd) {
                        if (propertiesFiles.cwd.match(/^\./)) {
                            cwd = path.dirname(file) + '/' + propertiesFiles.cwd;
                        }
                        else {
                            cwd = propertiesFiles.cwd;
                        }
                    }
                    this.mount(node, cwd, propertiesFiles.files);
                }
                catch (er) {
                    var message = er.message + '. \nCheck "propertiesFiles" value in your configuration (' + path.resolve(file) + ').';
                    throw new Error(message);
                }
            }
            else {
                node[key] = properties[key];
            }
        }
    };
    /**
     * Set a new key. If key exists then ignored.
     * @param key
     * @param value
     */
    Properties.prototype.set = function (key, value) {
        if (this._properties[key] === undefined) {
            this._properties[key] = value;
        }
        return this;
    };
    /**
     *
     * @param node
     * @param cwd
     * @param propertiesFilesList
     */
    Properties.prototype.mount = function (node, cwd, propertiesFilesList) {
        cwd = path.resolve(cwd);
        for (var mountName in propertiesFilesList) {
            var file = propertiesFilesList[mountName];
            var keys = mountName.split('.'); //eval expression
            var subNode = node;
            for (var key in keys) {
                subNode[keys[key]] = {};
                subNode = subNode[keys[key]];
            }
            this.read(subNode, cwd + '/' + file);
        }
    };
    /**
     *
     * @param expression
     * @returns {any}
     */
    Properties.prototype.get = function (expression) {
        return parse_1.parse(expression, this._properties);
    };
    Properties.getValue = function (expression) {
        return Properties.initialize().get(expression);
    };
    /**
     * Load file properties from file location or autoload file (set just filename)
     * @param file
     * @param autoload
     * @returns {Properties}
     */
    Properties.initialize = function (file, autoload) {
        if (!Properties._instance) {
            if (file && !autoload) {
                Properties._instance = new Properties(file);
            }
            else {
                var propFile = this.findPropertiesFile(file);
                if (propFile) {
                    Properties._instance = new Properties(propFile);
                }
            }
        }
        return Properties._instance;
    };
    Properties.clean = function () {
        Properties._instance = undefined;
    };
    /**
     * Find properties.json in the folder, parent folder, etc...
     * @returns {any}
     */
    Properties.findPropertiesFile = function (file) {
        if (file === void 0) { file = 'properties.json'; }
        var folder = path.resolve(__dirname);
        var current;
        while (!Fs.existsSync(folder + '/' + file) && current != folder) {
            current = folder;
            folder = path.resolve(folder + '/..');
        }
        if (current == folder) {
            return false;
        }
        return folder + '/' + file;
    };
    return Properties;
}());
exports.Properties = Properties;
//# sourceMappingURL=properties.js.map