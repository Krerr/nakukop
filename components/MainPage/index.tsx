import React, { memo } from 'react'
import { Col, Row } from 'antd'
import { ProductPanelComponent } from '../ProductPanel'
import { useMainPage } from './hooks/useMainPage'
import styles from './mainpage.module.css'
import { CartComponent } from '../Cart'
import { HeaderComponent } from '../Header'

export const MainPageComponent = memo(
  (): JSX.Element => {
    const { productGroups, addToCart, removeFromCart, rate, setRate } = useMainPage()
    return (
      <div>
        <Row>
          <HeaderComponent rate={rate} setRate={setRate} />
        </Row>
        <Row>
          <Col className={styles.column} span={11}>
            <ProductPanelComponent productGroups={productGroups} setCart={addToCart} rate={rate} />
          </Col>
          <Col className={styles.column} span={2}></Col>
          <Col className={styles.column} span={11}>
            <CartComponent removeFromCart={removeFromCart} cart={productGroups} rate={rate} />
          </Col>
        </Row>
      </div>
    )
  },
)
