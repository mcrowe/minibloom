import Filter from './filter'
import { getOptimalParams } from './params'


export {
  toBuffer,
  fromBuffer,
  toBase64,
  fromBase64
} from './serializer'


export type IFilter = Filter


export function optimalFilter(numItems: number, errorRate: number): Filter {
  const params = getOptimalParams(numItems, errorRate)
  return filter(params.numBits, params.numHashes)
}


export function filter(numBits: number, numHashes: number): Filter {
  const nWords = Math.ceil(numBits / 32)
  const buckets = new Int32Array(nWords)
  return new Filter(buckets, numHashes)
}