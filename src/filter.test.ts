import test from 'ava'
import Filter from './filter'


test('filter', t => {
  const filter = new Filter(25, 7)

  filter.add('abc')

  t.is( filter.test('abc'), true )
  t.is( filter.test('def'), false )
})