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


test('save/load', t => {
  const filter = Bloom.filter(32, 7)

  filter.add('abc')

  const buffer = Bloom.save(filter)

  const loadedFilter = Bloom.load(buffer)

  t.is( loadedFilter.numHashes, 7 )
  t.is( loadedFilter.numBits, 32 )

  t.is( loadedFilter.test('abc'), true )
  t.is( loadedFilter.test('def'), false )
})