import { useEffect, useState } from 'react'
import { ProductGroupsModel } from '../../../models/ProductGroups.model'
import { Api } from '../../../api'
import { NamesServerModel } from '../../../models/NamesServer.model'

type ComponentState = ProductGroupsModel

export const useMainPage = (): { productGroups: ProductGroupsModel } => {
  const [state, setState] = useState<ComponentState>(new ProductGroupsModel())
  useEffect((): void => {
    async function getNames() {
      const names: NamesServerModel = await Api.getNames()
      const productGroups = new ProductGroupsModel()
      productGroups.setupNames(names)
      const goods = await Api.getGoods()
      productGroups.setupGoods(goods)
      setState(productGroups)
    }
    getNames()
  }, [])
  return { productGroups: state }
}
