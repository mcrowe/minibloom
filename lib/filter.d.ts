export default class Filter {
    readonly buckets: Int32Array;
    readonly numBits: number;
    readonly numHashes: number;
    private locations;
    constructor(buckets: Int32Array, numHashes: number);
    add(v: string): void;
    test(v: string): boolean;
    private getLocations(v);
    private makeLocationsArray();
}
