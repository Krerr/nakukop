import { useEffect, useState } from 'react'
import { ProductGroupsModel } from '../../../models/ProductGroups.model'
import { Api } from '../../../api'
import { NamesServerModel } from '../../../models/NamesServer.model'
import { defaultRate } from '../../../constants/currency'

export const useMainPage = (): {
  productGroups: ProductGroupsModel
  cart: any
  addProductToCart: any
  removeProductFromToCart: any
  rate: number
  setRate: any
} => {
  const [productGroups, setProductGroups] = useState(new ProductGroupsModel())
  const [cart, setCart] = useState({})
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

  const addProductToCart = (groupId: string, productKey: string): void => {
    const newCart = { ...cart }
    // @ts-ignore
    if (!newCart[+groupId]) {
      // @ts-ignore
      newCart[+groupId] = {}
    }
    // @ts-ignore
    if (!newCart[+groupId][+productKey]) {
      // @ts-ignore
      newCart[+groupId][+productKey] = { ...productGroups[+groupId][+productKey], amount: 1 }
    } else {
      // @ts-ignore
      newCart[+groupId][+productKey].amount += 1
    }
    setCart(newCart)
  }

  const removeProductFromToCart = (groupId: string, productKey: string): void => {
    const newCart = { ...cart }
    // @ts-ignore
    newCart[+groupId][+productKey].amount -= 1
    // @ts-ignore
    if (!newCart[+groupId][+productKey].amount) {
      // @ts-ignore
      delete newCart[+groupId][+productKey]
    }
    // @ts-ignore
    if (!Object.keys(newCart[+groupId]).length) {
      // @ts-ignore
      delete newCart[+groupId]
    }

    setCart(newCart)
  }
  return { productGroups, cart, addProductToCart, removeProductFromToCart, rate, setRate }
}
