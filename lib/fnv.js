"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Fowler/Noll/Vo hashing.
function hash(v) {
    let a = 2166136261;
    for (let i = 0, n = v.length; i < n; i++) {
        const c = v.charCodeAt(i);
        const d = c & 0xff00;
        if (d) {
            a = fnvMultiply(a ^ d >> 8);
        }
        a = fnvMultiply(a ^ c & 0xff);
    }
    return fnvMix(a);
}
exports.hash = hash;
// One additional iteration of FNV, given a hash.
function rehash(a) {
    return fnvMix(fnvMultiply(a));
}
exports.rehash = rehash;
// a * 16777619 mod 2**32
function fnvMultiply(a) {
    return a + (a << 1) + (a << 4) + (a << 7) + (a << 8) + (a << 24);
}
// See https://web.archive.org/web/20131019013225/http://home.comcast.net/~bretm/hash/6.html
function fnvMix(a) {
    a += a << 13;
    a ^= a >>> 7;
    a += a << 3;
    a ^= a >>> 17;
    a += a << 5;
    return a & 0xffffffff;
}
