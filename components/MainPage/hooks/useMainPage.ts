import { useEffect, useState } from 'react'
import { ProductGroupsModel } from '../../../models/ProductGroups.model'
import { Api } from '../../../api'
import { NamesServerModel } from '../../../models/NamesServer.model'
import { defaultRate } from '../../../constants/currency'

export const useMainPage = (): {
  productGroups: ProductGroupsModel
  addToCart: any
  removeFromCart: any
  rate: number
  setRate: any
} => {
  const [productGroups, setProductGroups] = useState(new ProductGroupsModel())
  const [rate, setRate] = useState(defaultRate)
  useEffect((): void => {
    async function getNames() {
      const names: NamesServerModel = await Api.getNames()
      const productGroups = new ProductGroupsModel()
      productGroups.setupNames(names)
      const goods = await Api.getGoods()
      productGroups.setupGoods(goods)
      setProductGroups(productGroups)
    }
    getNames()
  }, [])

  const addToCart = (groupId: string, productKey: string): void => {
    const newProductGroups = Object.assign(new ProductGroupsModel(), productGroups)
    newProductGroups[+groupId][+productKey].addToCard()
    setProductGroups(newProductGroups)
  }

  const removeFromCart = (groupId: string, productKey: string): void => {
    const newProductGroups = Object.assign(new ProductGroupsModel(), productGroups)
    newProductGroups[+groupId][+productKey].removeFromCard()
    setProductGroups(newProductGroups)
  }
  return { productGroups, addToCart, removeFromCart, rate, setRate }
}
