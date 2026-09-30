export function cartTotal(items, options) {
  if (items.length === 0) return 0

  let subtotal = 0
  for (const item of items) {
    if (item.price < 0) {
      throw new RangeError(`price cannot be negative: ${item.price}`)
    }
    if (!Number.isInteger(item.qty) || item.qty <= 0) {
      throw new RangeError(`qty must be a positive integer: ${item.qty}`)
    }
    subtotal += item.price * item.qty
  }

  const { vatRate, freeShipFrom, shipFee } = options
  const vat = vatRate * subtotal
  const shipping = subtotal >= freeShipFrom ? 0 : shipFee

  return Math.round(subtotal + vat + shipping)
}
