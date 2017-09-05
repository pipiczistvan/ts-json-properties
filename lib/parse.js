"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var clone = function (src) { return (JSON.parse(JSON.stringify(src))); };
function parse(expression, scope) {
    var keys = expression.split(".");
    while ((scope = scope[keys.shift()]) && keys.length) { }
    return typeof scope === "object" ? clone(scope) : scope;
}
exports.parse = parse;
//# sourceMappingURL=parse.js.map