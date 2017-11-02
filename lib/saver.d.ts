/// <reference types="node" />
/**
 * Filters are saved as node buffers with the following format:
 * 1st byte: number of hashes (must be < 256!)
 * Remaining bytes: bloom filter data
 */
import Filter from './filter';
export declare function save(filter: Filter): Buffer;
export declare function load(buffer: Buffer): Filter;
