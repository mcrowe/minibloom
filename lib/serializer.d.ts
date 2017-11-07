/// <reference types="node" />
import Filter from './filter';
/**
 * Filters are saved as node buffers with the following format:
 * 1st byte: number of hashes (must be < 256!)
 * Remaining bytes: bloom filter data
 */
export declare function toBuffer(filter: Filter): Buffer;
export declare function fromBuffer(buffer: Buffer): Filter;
export declare function toBase64(filter: Filter): string;
export declare function fromBase64(base64: string): Filter;
