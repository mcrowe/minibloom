"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const filter_1 = require("./filter");
const Base64 = require("./base64");
const IS_ALLOWED = typeof Buffer != 'undefined';
/**
 * Filters are saved as node buffers with the following format:
 * 1st byte: number of hashes (must be < 256!)
 * Remaining bytes: bloom filter data
 */
function toBuffer(filter) {
    assertAllowed();
    const a = Buffer.from(filter.buckets.buffer);
    const b = Buffer.alloc(1 + a.byteLength);
    b.writeUInt8(filter.numHashes, 0);
    a.copy(b, 1);
    return b;
}
exports.toBuffer = toBuffer;
function fromBuffer(buffer) {
    assertAllowed();
    const a = buffer;
    const b = Buffer.alloc(a.byteLength - 1);
    const numHashes = a.readUInt8(0);
    a.copy(b, 0, 1);
    const buckets = new Int32Array(b.buffer, b.byteOffset, b.byteLength / Int32Array.BYTES_PER_ELEMENT);
    return new filter_1.default(buckets, numHashes);
}
exports.fromBuffer = fromBuffer;
function toBase64(filter) {
    // Store number of hashes as a single base36 encoded character.
    // NOTE: Will not work if more than 35 hashes!
    const numHashes = filter.numHashes.toString(36);
    // Store data as a base64 string
    const data = Base64.fromByteArray(new Uint8Array(filter.buckets.buffer));
    return numHashes + data;
}
exports.toBase64 = toBase64;
function fromBase64(base64) {
    // Load number of hashes back from the first caracter (base36)
    const numHashes = parseInt(base64[0], 36);
    // Load the data from the rest of the string as base64.
    const buckets = new Int32Array(Base64.toByteArray(base64.slice(1)).buffer);
    return new filter_1.default(buckets, numHashes);
}
exports.fromBase64 = fromBase64;
function assertAllowed() {
    if (!IS_ALLOWED) {
        throw new Error('Filters can only be saved and loaded from js environments with a Buffer (ie. node.js).');
    }
}
