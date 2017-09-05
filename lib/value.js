"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var properties_1 = require("./properties");
function Value(expression) {
    return function (targetClass, attributeName) {
        if (delete targetClass[attributeName]) {
            var value_1;
            Object.defineProperty(targetClass, attributeName, {
                get: function () {
                    value_1 = value_1 !== undefined ? value_1 : properties_1.Properties.initialize().get(expression);
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
exports.Value = Value;
//# sourceMappingURL=value.js.map