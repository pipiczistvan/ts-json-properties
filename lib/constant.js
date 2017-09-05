"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var properties_1 = require("./properties");
function Constant(expression) {
    return function (targetClass, attributeName) {
        if (delete targetClass[attributeName]) {
            var constant_1;
            Object.defineProperty(targetClass, attributeName, {
                get: function () {
                    constant_1 = Object.freeze(constant_1 !== undefined ? constant_1 : properties_1.Properties.initialize().get(expression));
                    return constant_1;
                },
                enumerable: true,
                configurable: true
            });
        }
    };
}
exports.Constant = Constant;
//# sourceMappingURL=constant.js.map