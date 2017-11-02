import Filter from './filter';
export { load, save } from './saver';
export declare function optimalFilter(numItems: number, errorRate: number): Filter;
export declare function filter(numBits: number, numHashes: number): Filter;
