/// <reference types="node" />
import Filter from './filter';
export declare function save(filter: Filter): Buffer;
export declare function load(buffer: Buffer, numHashes: number): Filter;
