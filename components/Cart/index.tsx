import React, { memo } from 'react'
import { Alert, Space, Table } from 'antd'
import Title from 'antd/lib/typography/Title'
import { ProductModel } from '../../models/Product.model'

type CartProps = {
  removeProductFromToCart: (groupId: string, productKey: string) => void
  cart: any
  rate: number
}

const createColumns = (deleteAction: Function, rate: number): any[] => [
  {
    title: 'Наименование товара и описание',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Количество',
    dataIndex: 'amount',
    key: 'amount',
    render: (text: string, record: ProductModel) => (
      <>
        <p>{text}</p>
        {record.count === 1 && <Alert message="Количество ограничено" type="warning" />}
      </>
    ),
  },
  {
    title: 'Цена',
    dataIndex: 'price',
    key: 'price',
    render: (_: string, record: ProductModel) => <span>{(record.price * record.amount * rate).toFixed(2)}</span>,
  },

  {
    title: '',
    key: 'action',
    render: (_: string, record: ProductModel) => (
      <Space size="middle">
        {/*{console.log(record)}*/}
        <a onClick={() => deleteAction(record.groupId, record.id)}>Delete</a>
      </Space>
    ),
  },
]

export const CartComponent = memo(
  ({ cart, removeProductFromToCart, rate }: CartProps): JSX.Element => {
    const formatCartToTable = (cart: any) => {
      const products: any[] = []
      Object.keys(cart).forEach(groupId => {
        Object.keys(cart[groupId]).forEach(productId => {
          products.push(cart[groupId][productId])
        })
      })
      return products
    }
    return (
      <>
        <Title level={3}>Корзина</Title>
        <Table
          columns={createColumns(removeProductFromToCart, rate)}
          dataSource={formatCartToTable(cart)}
          pagination={false}
          summary={data => {
            let total = 0
            data.forEach(({ amount, price }) => {
              total += amount * price * rate
            })
            return (
              <Table.Summary.Row>
                <Table.Summary.Cell index={0}>ИТОГО</Table.Summary.Cell>
                <Table.Summary.Cell index={1}></Table.Summary.Cell>
                <Table.Summary.Cell index={2}>{total.toFixed(2)}</Table.Summary.Cell>
              </Table.Summary.Row>
            )
          }}
        />
      </>
    )
  },
)
