"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
};
exports.__esModule = true;
__exportStar(require("./answer"), exports);
__exportStar(require("./comment"), exports);
__exportStar(require("./generated"), exports);
__exportStar(require("./post"), exports);
__exportStar(require("./reply"), exports);
__exportStar(require("./user"), exports);
/*export const getMutationType = (model, type) => {
    model = model.charAt(0).toUpperCase() + model.slice(1);
    type = type.charAt(0).toUpperCase() + type.slice(1);
    console.log();
    return Types[`${type}${model}Mutation`];
};

export const getMutationVariablesType = (model, type) => {
    model = model.charAt(0).toUpperCase() + model.slice(1);
    type = type.charAt(0).toUpperCase() + type.slice(1);
    return Types[`${type}${model}MutationVariables`];
};

export const getQueryType = (model) => {
    model = model.charAt(0).toUpperCase() + model.slice(1);
    return Types[`${model}Query`];
};

export const getQueryVariablesType = (model) => {
    model = model.charAt(0).toUpperCase() + model.slice(1);
    return Types[`{model}QueryVariables`];
};*/
