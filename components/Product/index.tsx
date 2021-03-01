import React, { memo, useMemo } from 'react'
import { Button, Col, Row } from 'antd'
import cn from 'classnames'
import { ProductModel } from '../../models/Product.model'
import styles from './product.module.css'

type ProductProps = {
  product: ProductModel
  id: number
  groupId: number
  setCart: (groupId: number, productKey: number) => void
  rate: number
}

export const ProductComponent = memo(
  ({ product = new ProductModel(), id, groupId, setCart, rate }: ProductProps): JSX.Element => {
    const className = useMemo(() => {
      return cn(styles.row, { [styles.up]: product.isUpPrice, [styles.down]: product.isDownPrice })
    }, [product])
    return (
      <Row key={id} className={className}>
        <Col span={19} className={styles.column}>
          {`${product.name} (${product.count})`}
        </Col>
        <Col span={3} className={styles.column}>
          {(product.price * rate).toFixed(2)}
        </Col>
        <Col span={2} className={styles.column}>
          <Button type="primary" onClick={() => setCart(groupId, id)} disabled={!product.canBuy}>
            Buy
          </Button>
        </Col>
      </Row>
    )
  },
)
