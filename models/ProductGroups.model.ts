import { ProductModel } from './Product.model'
import { NamesServerModel } from './NamesServer.model'
import { GoodsServerModel } from './GoodsServer.model'

type ProductOptions = {
  id: number
  name: string
  price?: number
  count?: number
}

const omitProductKeys = new Set(['name'])
const omitGroupKeys = new Set([])

export class ProductGroupsModel {
  [groupId: number]: {
    name: string
    [productId: number]: {
      name: string
      price: number
      count: number
      id: number
      groupId: number
      amount: number
    }
  }
  public setGroup(id: number, name: string): ProductGroupsModel {
    this[id] = { name }
    return this
  }

  public setProduct(groupId: number, { id, name, price, count }: ProductOptions): ProductGroupsModel {
    this[groupId] = { ...this[groupId], [id]: { name, price, count, id, groupId } }
    return this
  }
  public setProductAttributes(groupId: number, productId: number, price: number, count: number): ProductGroupsModel {
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

  public createProduct(groupId: string, productKey: string): ProductModel {
    return Object.assign(new ProductModel(), {
      name: this[+groupId][+productKey].name,
      price: this[+groupId][+productKey].price,
    })
  }

  public setupNames(names: NamesServerModel): ProductGroupsModel {
    for (let groupId in names) {
      this.setGroup(+groupId, names[groupId].G)
      const products = names[groupId].B
      for (let productId in products) {
        this.setProduct(+groupId, { id: +productId, name: `${products[productId].N}` })
      }
    }
    return this
  }
  public setupGoods(goods: GoodsServerModel): ProductGroupsModel {
    if (goods.Success) {
      goods.Value.Goods.forEach((product: any): void => {
        // @ts-ignore
        this.setProductAttributes(product.G, product.T, product.C, product.P)
      })
    }
    return this
  }
}
