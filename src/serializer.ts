import Filter from './filter'
import * as Base64 from './base64'


const IS_ALLOWED = typeof Buffer != 'undefined'


/**
 * Filters are saved as node buffers with the following format:
 * 1st byte: number of hashes (must be < 256!)
 * Remaining bytes: bloom filter data
 */
export function toBuffer(filter: Filter): Buffer {
  assertAllowed()

  const a = Buffer.from(filter.buckets.buffer)

  const b = Buffer.alloc(1 + a.byteLength)

  b.writeUInt8(filter.numHashes, 0)

  a.copy(b, 1)

  return b
}


export function fromBuffer(buffer: Buffer): Filter {
  assertAllowed()

  const a = buffer
  const b = Buffer.alloc(a.byteLength - 1)

  const numHashes = a.readUInt8(0)

  a.copy(b, 0, 1)

  const buckets = new Int32Array(b.buffer, b.byteOffset, b.byteLength / Int32Array.BYTES_PER_ELEMENT)

  return new Filter(buckets, numHashes)
}


export function toBase64(filter: Filter): string {
  // Store number of hashes as a single base36 encoded character.
  // NOTE: Will not work if more than 35 hashes!
  const numHashes = filter.numHashes.toString(36)

  // Store data as a base64 string
  const data = Base64.fromByteArray(new Uint8Array(filter.buckets.buffer))

  return numHashes + data
}


export function fromBase64(base64: string): Filter {
  // Load number of hashes back from the first caracter (base36)
  const numHashes = parseInt(base64[0], 36)

  // Load the data from the rest of the string as base64.
  const buckets = new Int32Array(Base64.toByteArray(base64.slice(1)).buffer)

  return new Filter(buckets, numHashes)
}


function assertAllowed() {
  if (!IS_ALLOWED) {
    throw new Error('Filters can only be saved and loaded from js environments with a Buffer (ie. node.js).')
  }
}