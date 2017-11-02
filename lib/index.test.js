"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ava_1 = require("ava");
const index_1 = require("./index");
ava_1.default('doSomething', t => {
    t.is(index_1.doSomething(5), 25);
});
