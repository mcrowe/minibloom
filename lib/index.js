"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const filter_1 = require("./filter");
function optimalFilter(numItems, errorRate) {
    const params = getOptimalParams(numItems, errorRate);
    return filter(params.numBits, params.numHashes);
}
exports.optimalFilter = optimalFilter;
function filter(numBits, numHashes) {
    const nWords = Math.ceil(numBits / 32);
    const buckets = new Int32Array(nWords);
    return new filter_1.default(buckets, numHashes);
}
exports.filter = filter;
function fromBuffer(buffer) {
    // const
}
exports.fromBuffer = fromBuffer;
/**
 * See https://hur.st/bloomfilter?n=100&p=0.1
 * m = ceil((n * log(p)) / log(1.0 / (pow(2.0, log(2.0)))));
 * k = round(log(2.0) * m / n);
 */
function getOptimalParams(numItems, errorRate) {
    const n = numItems;
    const p = errorRate;
    const log2 = Math.log(2);
    const m = Math.ceil((n * Math.log(p)) / Math.log(1 / Math.pow(2, log2)));
    const k = Math.round(log2 * m / n);
    return {
        numHashes: k,
        numBits: m
    };
}
