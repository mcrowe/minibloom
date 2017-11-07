"use strict";
/**
 * Filters are saved as node buffers with the following format:
 * 1st byte: number of hashes (must be < 256!)
 * Remaining bytes: bloom filter data
 */
Object.defineProperty(exports, "__esModule", { value: true });
const filter_1 = require("./filter");
const Base64 = require("./base64");
const IS_ALLOWED = typeof Buffer != 'undefined';
function save(filter) {
    assertAllowed();
    const a = Buffer.from(filter.buckets.buffer);
    const b = Buffer.alloc(1 + a.byteLength);
    b.writeUInt8(filter.numHashes, 0);
    a.copy(b, 1);
    return b;
}
exports.save = save;
function load(buffer) {
    assertAllowed();
    const a = buffer;
    const b = Buffer.alloc(a.byteLength - 1);
    const numHashes = a.readUInt8(0);
    a.copy(b, 0, 1);
    const buckets = new Int32Array(b.buffer, b.byteOffset, b.byteLength / Int32Array.BYTES_PER_ELEMENT);
    return new filter_1.default(buckets, numHashes);
}
exports.load = load;
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
// const Base64 = (function () {
//   var digitsStr: any =
//   //   0       8       16      24      32      40      48      56     63
//   //   v       v       v       v       v       v       v       v      v
//       "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz+-";
//   var digits: any = digitsStr.split('');
//   var digitsMap: any = {};
//   for (var i = 0; i < digits.length; i++) {
//       digitsMap[digits[i]] = i;
//   }
//   return {
//       fromInt: function(int32: number): string {
//           var result = '';
//           while (true) {
//               result = digits[int32 & 0x3f] + result;
//               int32 >>>= 6;
//               if (int32 === 0)
//                   break;
//           }
//           return result;
//       },
//       toInt: function(digitsStr: any) {
//           var result = 0;
//           var digits = digitsStr.split('');
//           for (var i = 0; i < digits.length; i++) {
//               result = (result << 6) + digitsMap[digits[i]];
//           }
//           return result;
//       }
//   };
// })();
// function _arrayBufferToBase64( buffer ) {
//   var binary = '';
//   var bytes = new Uint8Array( buffer );
//   var len = bytes.byteLength;
//   for (var i = 0; i < len; i++) {
//       binary += String.fromCharCode( bytes[ i ] );
//   }
//   return btoa( binary );
// }
// function btoa(str) {
//   var buffer
//     ;
//   if (str instanceof Buffer) {
//     buffer = str;
//   } else {
//     buffer = new Buffer(str.toString(), 'binary');
//   }
//   return buffer.toString('base64');
// } 
