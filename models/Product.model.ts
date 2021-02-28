export class ProductModel {
  id: number
  groupId: number
  name: string
  price: number
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
}
