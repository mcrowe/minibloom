/// <reference types="node" />
export default class Filter {
    private numHashes;
    private numBits;
    private buckets;
    private locations;
    constructor(numBits: number, numHashes: number);
    add(v: string): void;
    test(v: string): boolean;
    toBuffer(): Buffer;
    private getLocations(v);
}
