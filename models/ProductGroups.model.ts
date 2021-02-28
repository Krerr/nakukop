import { ProductModel } from './Product.model'
import { NamesServerModel } from './NamesServer.model'
import { GoodsServerModel, Product } from './GoodsServer.model'

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
    [productId: number]: ProductModel
  }
  public setGroup(id: number, name: string): ProductGroupsModel {
    this[id] = { name }
    return this
  }

  public setProduct(groupId: number, { id, name, price, count }: ProductOptions): ProductGroupsModel {
    // @ts-ignore
    this[groupId] = { ...this[groupId], [id]: Object.assign(new ProductModel(), { name, price, count, id, groupId }) }
    return this
  }
  public setProductAttributes(groupId: number, productId: number, price: number, count: number): ProductGroupsModel {
    // @ts-ignore
    this[groupId][productId] = Object.assign(new ProductModel(), this[groupId][productId], { price, count })
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

  public getProduct(groupId: string, productKey: string): ProductModel {
    return this[+groupId][+productKey]
  }

  public setupNames(names: NamesServerModel): ProductGroupsModel {
    for (let groupId in names) {
      this.setGroup(+groupId, names[groupId].G)
      const products = names[groupId].B
      for (let productId in products) {
        this.setProduct(+groupId, { id: +productId, name: `${products[productId].N}` })
      }
    }
    return Object.assign(new ProductGroupsModel(), this)
  }
  public setupGoods(goods: GoodsServerModel): ProductGroupsModel {
    if (goods.Success) {
      goods.Value.Goods.forEach((product: Product): void => {
        // @ts-ignore
        const p = this.getProduct(product.G, product.T)
        p.changePrice(product.C)
        p.changeCount(product.P)
        this[product.G][product.T] = Object.assign(new ProductModel(), p)
      })
    }
    return Object.assign(new ProductGroupsModel(), this)
  }
}
