import React, { memo } from 'react'
import { Collapse } from 'antd'
import { ProductGroupsModel } from '../../models/ProductGroups.model'
import { ProductComponent } from '../Product'

const { Panel } = Collapse

type ProductPanelProps = {
  productGroups: ProductGroupsModel
  setCart: (groupId: number, productKey: number) => void
  rate: number
}

export const ProductPanelComponent = memo(
  ({ productGroups = new ProductGroupsModel(), setCart, rate }: ProductPanelProps): JSX.Element => {
    return (
      <Collapse defaultActiveKey={['1']}>
        {productGroups.getGroupKeys().map((groupId: number): JSX.Element | null => {
          if (productGroups.hasInStockProducts(groupId)) {
            return (
              <Panel header={productGroups?.getGroupName(groupId)} key={groupId}>
                {productGroups?.getProductKeys(groupId).map((productKey: number): JSX.Element | null => {
                  if (productGroups.productInStock(groupId, productKey)) {
                    return (
                      <ProductComponent
                        key={productKey}
                        id={productKey}
                        groupId={groupId}
                        product={productGroups.getProduct(groupId, productKey)}
                        setCart={setCart}
                        rate={rate}
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
  },
)
