import test from 'ava'
import { doSomething } from './index'


test('doSomething', t => {
  t.is(doSomething(5), 25)
})