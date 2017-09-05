"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var properties_1 = require("./properties");
function EnvValue(expression, defaultValue) {
    return function (targetClass, attributeName) {
        if (delete targetClass[attributeName]) {
            var value_1;
            var defaultKey_1 = expression + "Default";
            Object.defineProperty(targetClass, attributeName, {
                get: function () {
                    value_1 = process.env[value_1 ? value_1 : properties_1.Properties.initialize().get(expression)] || properties_1.Properties.initialize().get(defaultKey_1) || defaultValue;
                    return value_1;
                },
                set: function (v) {
                    value_1 = v;
                },
                enumerable: true,
                configurable: true
            });
        }
    };
}
exports.EnvValue = EnvValue;
//# sourceMappingURL=env-value.js.map