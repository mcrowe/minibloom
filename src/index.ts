import Filter from './filter'



export function optimalFilter(numItems: number, errorRate: number): Filter {
  const params = getOptimalParams(numItems, errorRate)
  return filter(params.numBits, params.numHashes)
}


export function filter(numBits: number, numHashes: number): Filter {
  const nWords = Math.ceil(numBits / 32)
  const buckets = new Int32Array(nWords)

  return new Filter(buckets, numHashes)
}


export function fromBuffer(buffer: Buffer): Filter {
  // const
}


/**
 * See https://hur.st/bloomfilter?n=100&p=0.1
 * m = ceil((n * log(p)) / log(1.0 / (pow(2.0, log(2.0)))));
 * k = round(log(2.0) * m / n);
 */
function getOptimalParams(numItems: number, errorRate: number) {
  const n = numItems
  const p = errorRate

  const log2 = Math.log(2)

  const m = Math.ceil((n * Math.log(p)) / Math.log(1 / Math.pow(2, log2)))
  const k = Math.round(log2 * m / n)

  return {
    numHashes: k,
    numBits: m
  }
}