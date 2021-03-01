import { EffectCallback, useEffect, useState } from 'react'
import { ProductGroupsModel } from '../../../models/ProductGroups.model'
import { Api } from '../../../api'
import { NamesServerModel } from '../../../models/NamesServer.model'
import { DEFAULT_RATE } from '../../../constants/currency'
import { REQUEST_TIMEOUT } from '../../../constants/global'
import { GoodsServerModel } from '../../../models/GoodsServer.model'

type MainPageProps = {
  productGroups: ProductGroupsModel
  addToCart: (groupId: number, productKey: number) => void
  removeFromCart: (groupId: number, productKey: number) => void
  rate: number
  setRate: (id: number) => void
}

export const useMainPage = (): MainPageProps => {
  const [productGroups, setProductGroups] = useState(new ProductGroupsModel())
  const [rate, setRate] = useState(DEFAULT_RATE)

  // @ts-ignore
  useEffect((): EffectCallback => {
    let interval: any
    async function getNames() {
      const names: NamesServerModel = await Api.getNames()
      const PGroups = new ProductGroupsModel()
      PGroups.setupNames(names)
      const goods: GoodsServerModel = await Api.getGoods()
      PGroups.setupGoods(goods)
      setProductGroups(PGroups)
      interval = setInterval(async () => {
        const goods = await Api.getGoods()
        setProductGroups(productGroups => productGroups.setupGoods(goods))
      }, REQUEST_TIMEOUT)
    }
    getNames()
    return (): void => clearInterval(interval)
  }, [])

  const addToCart = (groupId: number, productKey: number): void => {
    const newProductGroups = Object.assign(new ProductGroupsModel(), productGroups)
    newProductGroups[groupId][productKey].addToCard()
    setProductGroups(newProductGroups)
  }

  const removeFromCart = (groupId: number, productKey: number): void => {
    const newProductGroups = Object.assign(new ProductGroupsModel(), productGroups)
    newProductGroups[+groupId][+productKey].removeFromCard()
    setProductGroups(newProductGroups)
  }
  return { productGroups, addToCart, removeFromCart, rate, setRate }
}
