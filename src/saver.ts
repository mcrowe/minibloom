/**
 * Filters are saved as node buffers with the following format:
 * 1st byte: number of hashes (must be < 256!)
 * Remaining bytes: bloom filter data
 */

import Filter from './filter'


const IS_ALLOWED = typeof Buffer != 'undefined'


export function save(filter: Filter) {
  assertAllowed()

  const a = Buffer.from(filter.buckets.buffer)

  const b = Buffer.alloc(1 + a.byteLength)

  b.writeUInt8(filter.numHashes, 0)

  a.copy(b, 1)

  return b
}


export function load(buffer: Buffer): Filter {
  assertAllowed()

  const a = buffer
  const b = Buffer.alloc(a.byteLength - 1)

  const numHashes = a.readUInt8(0)

  a.copy(b, 0, 1)

  const buckets = new Int32Array(b.buffer, b.byteOffset, b.byteLength / Int32Array.BYTES_PER_ELEMENT)

  return new Filter(buckets, numHashes)
}


function assertAllowed() {
  if (!IS_ALLOWED) {
    throw new Error('Filters can only be saved and loaded from js environments with a Buffer (ie. node.js).')
  }
}