import { EffectCallback, useEffect, useState } from 'react'
import { ProductGroupsModel } from '../../../models/ProductGroups.model'
import { Api } from '../../../api'
import { NamesServerModel } from '../../../models/NamesServer.model'
import { DEFAULT_RATE } from '../../../constants/currency'
import { REQUEST_TIMEOUT } from '../../../constants/global'

export const useMainPage = (): {
  productGroups: ProductGroupsModel
  addToCart: any
  removeFromCart: any
  rate: number
  setRate: any
} => {
  const [productGroups, setProductGroups] = useState(new ProductGroupsModel())
  const [rate, setRate] = useState(DEFAULT_RATE)

  // @ts-ignore
  useEffect((): EffectCallback => {
    let interval: any
    async function getNames() {
      const names: NamesServerModel = await Api.getNames()
      const productGroups = new ProductGroupsModel()
      productGroups.setupNames(names)
      const goods = await Api.getGoods()
      productGroups.setupGoods(goods)
      setProductGroups(productGroups)
      interval = setInterval(async () => {
        const goods = await Api.getGoods()
        productGroups.setupGoods(goods)
        setProductGroups(productGroups => productGroups.setupGoods(goods))
      }, REQUEST_TIMEOUT)
    }
    getNames()
    return (): void => clearInterval(interval)
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
