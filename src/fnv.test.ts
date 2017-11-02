import test from 'ava'
import * as Fnv from './fnv'


test('hash', t => {
  t.is( Fnv.hash('abc') , 33957123 )
  t.is( Fnv.rehash(25) , -1767018668 )
})