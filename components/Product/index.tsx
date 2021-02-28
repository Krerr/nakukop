import React, { memo } from 'react'
import { Button, Col, Row } from 'antd'
import { ProductModel } from '../../models/Product.model'
import styles from './product.module.css'

type ProductProps = {
  product: ProductModel
  id: string
  groupId: string
  setCart: (groupId: string, productKey: string) => void
  rate: number
}

export const ProductComponent = memo(
  ({ product = new ProductModel(), id, groupId, setCart, rate }: ProductProps): JSX.Element => {
    return (
      <Row key={id}>
        <Col span={19} className={styles.column}>
          {`${product.name} (${product.count})`}
        </Col>
        <Col span={3} className={styles.column}>
          {(product.price * rate).toFixed(2)}
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
