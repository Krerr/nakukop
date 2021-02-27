type ProductOptions = {
  id: number
  name: string
  price?: number
  count?: number
}

const omitProductKeys = new Set(['name'])
const omitGroupKeys = new Set([])

export class ProductGroups {
  [groupId: number]: {
    name: string
    [productId: number]: {
      name: string
      price: number
      count: number
    }
  }
  public setGroup(id: number, name: string): ProductGroups {
    this[id] = { name }
    return this
  }

  public setProduct(groupId: number, { id, name, price, count }: ProductOptions): ProductGroups {
    this[groupId] = { ...this[groupId], [id]: { name, price, count } }
    return this
  }
  public setProductAttributes(groupId: number, productId: number, price: number, count: number): ProductGroups {
    this[groupId][productId] = { ...this[groupId][productId], price, count }
    return this
  }

  public getGroupKeys(): string[] {
    return Object.keys(this).filter((key: string): boolean => !omitGroupKeys.has(key))
  }

  public getProductKeys(groupId: string): string[] {
    return Object.keys(this[+groupId]).filter((key: string): boolean => !omitProductKeys.has(key))
  }

  public hasInStockProducts(groupId: string) {
    return this.getProductKeys(groupId).some(productKey => this.productInStock(groupId, productKey))
  }
  public productInStock(groupId: string, productKey: string) {
    return this[+groupId][+productKey].count
  }
}
