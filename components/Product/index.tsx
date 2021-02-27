import { Button, Col, Row } from 'antd'
import React from 'react'
import { Product as ProductModel } from '../../models/Product'
import styles from './product.module.css'

type ProductProps = {
  product: ProductModel
  id: string
  groupId: string
}

export const ProductComponent = ({ product = new ProductModel(), id, groupId }: ProductProps): JSX.Element => {
  return (
    <Row key={id}>
      <Col span={20} className={styles.column}>
        {product.name}
      </Col>
      <Col span={2} className={styles.column}>
        {product.price}
      </Col>
      <Col span={2} className={styles.column}>
        <Button type="primary" onClick={() => console.log(groupId, id)}>
          Buy
        </Button>
      </Col>
    </Row>
  )
}
