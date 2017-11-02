import Filter from './filter'


const IS_ALLOWED = typeof Buffer != 'undefined'


export function save(filter: Filter) {
  assertAllowed()
  return Buffer.from(filter.buckets.buffer)
}


export function load(buffer: Buffer, numHashes: number): Filter {
  assertAllowed()
  const buckets = new Int32Array(buffer.buffer, buffer.byteOffset, buffer.byteLength / Int32Array.BYTES_PER_ELEMENT)
  return new Filter(buckets, numHashes)
}


function assertAllowed() {
  if (!IS_ALLOWED) {
    throw new Error('Filters can only be saved and loaded from js environments with a Buffer (ie. node.js).')
  }
}