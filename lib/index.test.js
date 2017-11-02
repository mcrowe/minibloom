"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ava_1 = require("ava");
const Bloom = require("./index");
ava_1.default('filter', t => {
    const filter = Bloom.filter(25, 7);
    filter.add('abc');
    t.is(filter.test('abc'), true);
    t.is(filter.test('def'), false);
});
ava_1.default('fromOptimal', t => {
    const filter = Bloom.optimalFilter(100, 0.01);
    filter.add('abc');
    t.is(filter.test('abc'), true);
    t.is(filter.test('def'), false);
});
ava_1.default('save/load', t => {
    const filter = Bloom.filter(25, 7);
    filter.add('abc');
    const buffer = Bloom.save(filter);
    const loadedFilter = Bloom.load(buffer, 7);
    t.is(loadedFilter.test('abc'), true);
    t.is(loadedFilter.test('def'), false);
});
