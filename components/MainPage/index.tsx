import React, { memo } from 'react'
import { Col, Row } from 'antd'
import { ProductPanelComponent } from '../ProductPanel'
import { useMainPage } from './hooks/useMainPage'
import styles from './mainpage.module.css'

export const MainPageComponent = memo(
  (): JSX.Element => {
    const { productGroups } = useMainPage()
    return (
      <div>
        <Row>HEADER</Row>
        <Row>
          <Col className={styles.column} span={12}>
            <ProductPanelComponent productGroups={productGroups} />
          </Col>
          <Col className={styles.column} span={12}>
            Basket
          </Col>
        </Row>
      </div>
    )
  },
)
