import React, { memo } from 'react'
import { Col, Row } from 'antd'
import { ProductPanelComponent } from '../ProductPanel'
import { useMainPage } from './hooks/useMainPage'

export const MainPageComponent = memo(
  (): JSX.Element => {
    const { productGroups } = useMainPage()
    return (
      <div>
        <Row>HEADER</Row>
        <Row>
          <Col style={{ padding: '8px' }} span={12}>
            <ProductPanelComponent productGroups={productGroups} />
          </Col>
          <Col span={12} style={{ padding: '8px' }}>
            Basket
          </Col>
        </Row>
      </div>
    )
  },
)
