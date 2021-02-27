import { Product as ProductModel } from '../../models/Product'
import { Button, Col, Row } from 'antd'
import React from 'react'

type ProductProps = {
  product: ProductModel
  id: string
  groupId: string
}

export const ProductComponent = ({ product, id, groupId }: ProductProps): JSX.Element => {
  return (
    <Row key={id}>
      <Col span={20} style={{ padding: '8px' }}>
        {product.name}
      </Col>
      <Col span={2} style={{ padding: '8px' }}>
        {product.price}
      </Col>
      <Col span={2} style={{ padding: '8px' }}>
        <Button type="primary" onClick={() => console.log(groupId, id)}>
          Buy
        </Button>
      </Col>
    </Row>
  )
}
