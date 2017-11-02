/**
 * See https://hur.st/bloomfilter?n=100&p=0.1
 * m = ceil((n * log(p)) / log(1.0 / (pow(2.0, log(2.0)))));
 * k = round(log(2.0) * m / n);
 */
export declare function getOptimalParams(numItems: number, errorRate: number): {
    numHashes: number;
    numBits: number;
};
