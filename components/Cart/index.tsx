import React, { memo } from 'react'
import { Row, Space, Table, Tag } from 'antd'
import Title from 'antd/lib/typography/Title'

type CartProps = {
  removeProductFromToCart: (groupId: string, productKey: string) => void
  cart: any
}

const createColumns = deleteAction => [
  {
    title: 'Наименование товара и описание',
    dataIndex: 'name',
    key: 'name',
    render: text => <a>{text}</a>,
  },
  {
    title: 'Количество',
    dataIndex: 'amount',
    key: 'amount',
  },
  {
    title: 'Цена',
    dataIndex: 'price',
    key: 'price',
    render: (text, record) => <a>{(record.price * record.amount).toFixed(2)}</a>,
  },

  {
    title: '',
    key: 'action',
    render: (text, record) => (
      <Space size="middle">
        {/*{console.log(record)}*/}
        <a onClick={() => deleteAction(record.groupId, record.id)}>Delete</a>
      </Space>
    ),
  },
]

export const CartComponent = memo(
  ({ cart, removeProductFromToCart }: CartProps): JSX.Element => {
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
          columns={createColumns(removeProductFromToCart)}
          dataSource={formatCartToTable(cart)}
          pagination={false}
          summary={data => {
            let total = 0
            data.forEach(({ amount, price }) => {
              total += amount * price
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
