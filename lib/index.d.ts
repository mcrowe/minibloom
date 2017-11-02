/// <reference types="node" />
import Filter from './filter';
export declare function optimalFilter(numItems: number, errorRate: number): Filter;
export declare function filter(numBits: number, numHashes: number): Filter;
export declare function fromBuffer(buffer: Buffer): Filter;
