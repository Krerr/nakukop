import React, { memo, useState } from 'react'
import { Col, Row } from 'antd'
import { ProductPanelComponent } from '../ProductPanel'
import { useMainPage } from './hooks/useMainPage'
import styles from './mainpage.module.css'
import { CartComponent } from '../Cart'

export const MainPageComponent = memo(
  (): JSX.Element => {
    const { productGroups, cart, addProductToCart, removeProductFromToCart } = useMainPage()
    return (
      <div>
        <Row>HEADER</Row>
        <Row>
          <Col className={styles.column} span={11}>
            <ProductPanelComponent productGroups={productGroups} setCart={addProductToCart} />
          </Col>
          <Col className={styles.column} span={2}></Col>
          <Col className={styles.column} span={11}>
            <CartComponent removeProductFromToCart={removeProductFromToCart} cart={cart} />
          </Col>
        </Row>
      </div>
    )
  },
)
