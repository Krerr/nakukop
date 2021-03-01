import { ProductModel } from './Product.model'
import { NamesServerModel } from './NamesServer.model'
import { GoodsServerModel, Product } from './GoodsServer.model'

const omitProductKeys = new Set(['name'])
const omitGroupKeys = new Set([])

export class ProductGroupsModel {
  [groupId: number]: {
    name: string
    [productId: number]: ProductModel
  }
  public setGroup(id: number, name: string): ProductGroupsModel {
    this[id] = { name }
    return Object.assign(new ProductGroupsModel(), this)
  }

  public setProduct(groupId: number, { id, name, price, count }: Partial<ProductModel>): ProductGroupsModel {
    this[groupId] = { ...this[groupId], [id]: Object.assign(new ProductModel(), { name, price, count, id, groupId }) }
    return Object.assign(new ProductGroupsModel(), this)
  }

  public getGroupKeys(): number[] {
    return Object.keys(this)
      .filter((key: string): boolean => !omitGroupKeys.has(key))
      .map((item: string): number => Number(item))
  }

  public getGroupName = (groupId: number): string => this[groupId]?.name

  public getProductKeys(groupId: number): number[] {
    if (!this[groupId]) return []
    return Object.keys(this[groupId])
      .filter((key: string): boolean => !omitProductKeys.has(key))
      .map((item: string): number => Number(item))
  }

  public hasInStockProducts(groupId: number): boolean {
    return this.getProductKeys(groupId).some(productKey => this.productInStock(groupId, productKey))
  }
  public productInStock(groupId: number, productKey: number): boolean {
    return Boolean(this[groupId][productKey].count)
  }

  public getProduct(groupId: number, productKey: number): ProductModel {
    return this[groupId][productKey]
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
        const p = this.getProduct(product.G, product.T)
        p.changePrice(product.C)
        p.changeCount(product.P)
        this[product.G][product.T] = Object.assign(new ProductModel(), p)
      })
    }
    return Object.assign(new ProductGroupsModel(), this)
  }

  public formatToTable = (): ProductModel[] => {
    const products: ProductModel[] = []
    Object.keys(this).forEach((groupId: string): void => {
      if (!this[+groupId]) return
      Object.keys(this[+groupId]).forEach((productId: string): void => {
        if (this[+groupId][+productId]?.inCard) {
          products.push(Object.assign(new ProductModel(), this[+groupId][+productId], { key: productId }))
        }
      })
    })
    return products
  }
}
