import * as Fnv from './fnv'


type ITypedArray = Uint8Array | Uint16Array | Uint32Array


export default class Filter {

  public readonly buckets: Int32Array
  public readonly numBits: number
  public readonly numHashes: number
  private locations: ITypedArray

  constructor(buckets: Int32Array, numHashes: number) {
    this.buckets = buckets
    this.numBits = buckets.byteLength * 8
    this.numHashes = numHashes
    this.locations = this.makeLocationsArray()
  }

  add(v: string) {
    const l = this.getLocations(v)
    const k = this.numHashes
    const buckets = this.buckets
    for (let i = 0; i < k; i++) {
      buckets[Math.floor(l[i] / 32)] |= 1 << (l[i] % 32)
    }
  }

  test(v: string) {
    const l = this.getLocations(v)
    const k = this.numHashes
    const buckets = this.buckets

    for (var i = 0; i < k; i++) {
      const b = l[i]
      if ((buckets[Math.floor(b / 32)] & (1 << (b % 32))) === 0) {
        return false
      }
    }

    return true
  }

  private getLocations(v: string) {
    const m = this.numBits
    const a = Fnv.hash(v)
    const b = Fnv.rehash(a)
    let x = a % m

    for (let i = 0; i < this.numHashes; i++) {
      this.locations[i] = x < 0 ? (x + m) : x
      x = (x + b) % m
    }

    return this.locations
  }

  private makeLocationsArray(): ITypedArray {
    const kbytes = 1 << Math.ceil(Math.log(Math.ceil(Math.log(this.numBits) / Math.LN2 / 8)) / Math.LN2)
    const kbuffer = new ArrayBuffer(kbytes * this.numHashes)
    const arrayType = kbytes === 1 ? Uint8Array : kbytes === 2 ? Uint16Array : Uint32Array
    return new arrayType(kbuffer)
  }

}