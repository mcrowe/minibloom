# minibloom

Extremely fast pure-javascript Bloom filter for node and browsers, with no dependencies.

This library is optimized for smaller strings (< 20 characters). It uses the FNV hash which seems to be the best hashing function for smaller strings. If you are adding large documents, consider using a library that uses the xxhash or murmur hashing algorithms.

This is based on the excellent work by Jason Davies in his [bloomfilter.js](https://github.com/jasondavies/bloomfilter.js) library. I've made some performance tweaks and done some major modernization of the codebase and added some useful features.

Some references:

- [bloomfilter.js](https://github.com/jasondavies/bloomfilter.js)
- [fnv vs other hashes](https://aras-p.info/blog/2016/08/02/Hash-Functions-all-the-way-down/)
- [producing n hash functions by hashing only once](http://willwhim.wpengine.com/2011/09/03/producing-n-hash-functions-by-hashing-only-once/)

## Usage

> npm install @mcrowe/minibloom --save

```js
import * as Bloom from 'minibloom'

// Create an optimal filter given number of items and error rate.
const filter = Bloom.optimalFilter(1000, 0.01)

// Create a filter using number of bits and hashes
const filter = Bloom.filter(1024, 7)

// Add an item
filter.add('abc')

/**
 * Test for the presence of an item. If false then the item was definitely
 * not added. Otherwise, it *might* have been added (depending on the
 * filter's error rate.)
 */
filter.test('abc')

// Saving and loading from/to base64 strings.
const string = Bloom.toBase64(filter)
const loadedBuffer = Bloom.fromBase64(string)

// Saving and loading from/to buffers (node.js only).
const buffer = Bloom.toBuffer(filter)
const loadedBuffer = Bloom.fromBuffer(buffer)

```

## Development

Install npm modules:

> npm install

Run tests:

> npm test

## Release

Release a new version:

> bin/release.sh

This will publish a new version to npm, as well as push a new tag up to github.
