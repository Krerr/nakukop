export class ProductModel {
  id: number
  groupId: number
  name: string
  price: number
  prevPrice: number
  count: number
  amount?: number = 0
  inCard?: boolean = false
  public get canBuy(): boolean {
    return this.count > this.amount
  }
  public addToCard() {
    this.amount += 1
    this.inCard = true
  }
  public removeFromCard() {
    this.amount -= 1
    if (this.amount < 1) {
      this.inCard = false
    }
  }
  public changePrice(newPrice: number): ProductModel {
    if (this.prevPrice) {
      this.prevPrice = this.price
    } else {
      this.prevPrice = newPrice
    }
    this.price = newPrice
    return this
  }
  public changeCount(newCount: number): ProductModel {
    this.count = newCount
    return this
  }
  public get isUpPrice(): boolean {
    return this.price > this.prevPrice
  }
  public get isDownPrice(): boolean {
    return this.prevPrice > this.price
  }
}
