import Filter from './filter';
export { toBuffer, fromBuffer, toBase64, fromBase64 } from './serializer';
export declare type IFilter = Filter;
export declare function optimalFilter(numItems: number, errorRate: number): Filter;
export declare function filter(numBits: number, numHashes: number): Filter;
