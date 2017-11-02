"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ava_1 = require("ava");
const Fnv = require("./fnv");
ava_1.default('hash', t => {
    t.is(Fnv.hash('abc'), 33957123);
    t.is(Fnv.rehash(25), -1767018668);
});
