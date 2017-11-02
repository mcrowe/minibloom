"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ava_1 = require("ava");
const params_1 = require("./params");
ava_1.default('getOptimalParams', t => {
    const params = params_1.getOptimalParams(1000, 0.01);
    t.is(params.numHashes, 7);
    t.is(params.numBits, 9586);
});
