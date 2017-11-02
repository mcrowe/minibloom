import test from 'ava'
import { getOptimalParams } from './params'


test('getOptimalParams', t => {
  const params = getOptimalParams(1000, 0.01)

  t.is(params.numHashes, 7)
  t.is(params.numBits, 9586)
})