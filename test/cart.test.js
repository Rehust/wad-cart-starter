import { test } from 'node:test'
import assert from 'node:assert/strict'
import { cartTotal } from '../src/cart.js'

const options = { vatRate: 0.08, freeShipFrom: 500000, shipFee: 30000 }

test('the example from the slides', () => {
  const items = [
    { name: 'Áo thun', price: 180000, qty: 2 },
    { name: 'Sổ tay', price: 45000, qty: 1 },
  ]
  assert.equal(cartTotal(items, options), 467400)
})

test('an empty cart is 0', () => {
  assert.equal(cartTotal([], options), 0)
})

test('shipping is 0 at the free-shipping threshold', () => {
  const items = [{ name: 'Áo thun', price: 250000, qty: 2 }]
  // subtotal 500000 = freeShipFrom, so no shipFee: 500000 + 40000 vat
  assert.equal(cartTotal(items, options), 540000)
})

test('a negative price throws RangeError', () => {
  const items = [{ name: 'Hoàn tiền', price: -1, qty: 1 }]
  assert.throws(() => cartTotal(items, options), RangeError)
})

test('a qty that is not a positive integer throws RangeError', () => {
  for (const qty of [0, 1.5, -2]) {
    const items = [{ name: 'Áo thun', price: 180000, qty }]
    assert.throws(() => cartTotal(items, options), RangeError)
  }
})

test('the result is a number, not a string', () => {
  const items = [{ name: 'Áo thun', price: 180000, qty: 2 }]
  assert.equal(typeof cartTotal(items, options), 'number')
})
