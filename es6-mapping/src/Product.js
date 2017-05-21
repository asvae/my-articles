export default class Product {
  id: Number
  name: String
  hourlyPrice: Number

  constructor ({ id, name, hourlyPrice } = {}) {
    this.id = id
    this.name = name
    this.hourlyPrice = hourlyPrice
  }
}