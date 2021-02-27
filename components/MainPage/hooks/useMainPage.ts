import { useEffect, useState } from 'react'
import { ProductGroups } from '../../../models/ProductGroups'
import { Api } from '../../../api'

type ComponentState = ProductGroups

export const useMainPage = () => {
  const [state, setState] = useState<ComponentState>(new ProductGroups())
  useEffect(() => {
    async function getNames() {
      const names = await Api.getNames()
      const productGroups = new ProductGroups()
      for (let groupId in names) {
        productGroups.setGroup(+groupId, names[groupId].G)
        const products = names[groupId].B
        for (let productId in products) {
          productGroups.setProduct(+groupId, { id: +productId, name: `${products[productId].N}` })
        }
      }
      const goods = await Api.getGoods()
      if (goods.Success) {
        goods.Value.Goods.forEach((product: any): void => {
          // @ts-ignore
          productGroups.setProductAttributes(product.G, product.T, product.C, product.P)
        })
      }
      setState(productGroups)
    }
    getNames()
  }, [])
  return { productGroups: state }
}
