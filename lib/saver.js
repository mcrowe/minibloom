"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const filter_1 = require("./filter");
const IS_ALLOWED = typeof Buffer != 'undefined';
function save(filter) {
    assertAllowed();
    return Buffer.from(filter.buckets.buffer);
}
exports.save = save;
function load(buffer, numHashes) {
    assertAllowed();
    const buckets = new Int32Array(buffer.buffer, buffer.byteOffset, buffer.byteLength / Int32Array.BYTES_PER_ELEMENT);
    return new filter_1.default(buckets, numHashes);
}
exports.load = load;
function assertAllowed() {
    if (!IS_ALLOWED) {
        throw new Error('Filters can only be saved and loaded from js environments with a Buffer (ie. node.js).');
    }
}
