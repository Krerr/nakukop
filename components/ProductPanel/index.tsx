import { Product } from '../../models/Product'
import { Collapse } from 'antd'
import React from 'react'
import { ProductGroups } from '../../models/ProductGroups'
import { ProductComponent } from '../Product'

const { Panel } = Collapse

type ProductPanelProps = {
  productGroups: ProductGroups
}

export const ProductPanelComponent = ({ productGroups }: ProductPanelProps): JSX.Element => {
  return (
    <Collapse defaultActiveKey={['1']}>
      {productGroups.getGroupKeys().map((groupId: string): JSX.Element | null => {
        if (productGroups.hasInStockProducts(groupId)) {
          return (
            <Panel header={productGroups[+groupId]?.name} key={groupId}>
              {productGroups?.getProductKeys(groupId).map((productKey: string): JSX.Element | null => {
                if (productGroups.productInStock(groupId, productKey)) {
                  return (
                    <ProductComponent
                      key={productKey}
                      id={productKey}
                      groupId={groupId}
                      product={Object.assign(new Product(), {
                        name: productGroups[+groupId][+productKey].name,
                        price: productGroups[+groupId][+productKey].price,
                      })}
                    />
                  )
                }
                return null
              })}
            </Panel>
          )
        }
        return null
      })}
    </Collapse>
  )
}
