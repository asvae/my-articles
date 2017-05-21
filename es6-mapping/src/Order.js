import DateRange from './DateRange'
import Product from './Product'

export default class Order {
  id: Number
  name: String
  dateRange: DateRange
  product: Product

  constructor ({ id, name, dateRange, product } = {}) {
    this.id = id
    this.name = name || ''
    this.dateRange = new DateRange(dateRange) || null
    this.product = new Product(product) || null
  }

  /**
   * Calculate order price.
   * @returns {number}
   */
  calulatePrice (): Number {
    return this.dateRange.calculateDuration() * this.product.hourlyPrice
  }
}