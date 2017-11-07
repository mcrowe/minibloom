import test from 'ava'
import * as Bloom from './index'


test('filter', t => {
  const filter = Bloom.filter(25, 7)

  filter.add('abc')

  t.is( filter.test('abc'), true )
  t.is( filter.test('def'), false )
})


test('fromOptimal', t => {
  const filter = Bloom.optimalFilter(100, 0.01)

  filter.add('abc')

  t.is( filter.test('abc'), true )
  t.is( filter.test('def'), false )
})


test('to/fromBuffer', t => {
  const filter = Bloom.filter(32, 7)

  filter.add('abc')

  const buffer = Bloom.toBuffer(filter)

  const loadedFilter = Bloom.fromBuffer(buffer)

  t.is( loadedFilter.numHashes, 7 )
  t.is( loadedFilter.numBits, 32 )

  t.is( loadedFilter.test('abc'), true )
  t.is( loadedFilter.test('def'), false )
})


test('to/fromBase64', t => {
  const filter = Bloom.optimalFilter(1000, 0.01)

  filter.add('abc')
  filter.add('123')

  for (let i = 0; i < 500; i++) {
    filter.add(i.toString())
  }

  const [tSerialize, string] = time(() =>
    Bloom.toBase64(filter)
  )

  const [tDeserialize, loadedFilter] = time(() =>
    Bloom.fromBase64(string)
  )

  t.is( loadedFilter.test('abc'), true )
  t.is( loadedFilter.test('def'), false )
  t.is( loadedFilter.test('123'), true )
  t.is( loadedFilter.test('483'), true )
  t.is( loadedFilter.test('501'), false )
  t.is( string.length, 1601 )
  t.is ( tSerialize < 10, true )
  t.is ( tDeserialize < 10, true )
})


function time<T>(fn: () => T): [number, T] {
  const t = Date.now()
  const res = fn()
  return [Date.now() - t, res]
}