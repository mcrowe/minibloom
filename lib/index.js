"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const filter_1 = require("./filter");
const params_1 = require("./params");
var saver_1 = require("./saver");
exports.load = saver_1.load;
exports.save = saver_1.save;
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
