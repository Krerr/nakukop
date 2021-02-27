import React, { memo } from 'react'
import { Button, Col, Row } from 'antd'
import { ProductModel } from '../../models/Product.model'
import styles from './product.module.css'

type ProductProps = {
  product: ProductModel
  id: string
  groupId: string
  setCart: (groupId: string, productKey: string) => void
}

export const ProductComponent = memo(
  ({ product = new ProductModel(), id, groupId, setCart }: ProductProps): JSX.Element => {
    return (
      <Row key={id}>
        <Col span={20} className={styles.column}>
          {product.name}
        </Col>
        <Col span={2} className={styles.column}>
          {product.price}
        </Col>
        <Col span={2} className={styles.column}>
          <Button type="primary" onClick={() => setCart(groupId, id)}>
            Buy
          </Button>
        </Col>
      </Row>
    )
  },
)
