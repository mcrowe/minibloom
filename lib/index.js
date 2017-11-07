"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const filter_1 = require("./filter");
const params_1 = require("./params");
var serializer_1 = require("./serializer");
exports.toBuffer = serializer_1.toBuffer;
exports.fromBuffer = serializer_1.fromBuffer;
exports.toBase64 = serializer_1.toBase64;
exports.fromBase64 = serializer_1.fromBase64;
function optimalFilter(numItems, errorRate) {
    const params = params_1.getOptimalParams(numItems, errorRate);
    return filter(params.numBits, params.numHashes);
}
exports.optimalFilter = optimalFilter;
function filter(numBits, numHashes) {
    const nWords = Math.ceil(numBits / 32);
    const buckets = new Int32Array(nWords);
    return new filter_1.default(buckets, numHashes);
}
exports.filter = filter;
