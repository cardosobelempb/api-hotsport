import { XorEncoder } from '../utils/xor-encoder'

const original = 'Senha123'
const key = 42

// encode
const encoded = XorEncoder.encode(original, key)
console.log('Encoded:', encoded)

// decode
const decoded = XorEncoder.decode(encoded, key)
console.log('Decoded:', decoded)
