"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ava_1 = require("ava");
const filter_1 = require("./filter");
ava_1.default('filter', t => {
    const filter = new filter_1.default(25, 7);
    filter.add('abc');
    t.is(filter.test('abc'), true);
    t.is(filter.test('def'), false);
});
