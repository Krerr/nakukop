import React, { memo, useState } from 'react'
import { Button, Col, Input, Row } from 'antd'
import styles from './header.module.css'

type HeaderProps = {
  rate: number
  setRate: (rate: number) => void
}

export const HeaderComponent = memo(
  ({ rate, setRate }: HeaderProps): JSX.Element => {
    const [value, setValue] = useState(rate)
    return (
      <Row key={1} gutter={16} className={styles.container}>
        <Col span={8}>
          <Input className={styles.input} value={value} onChange={e => setValue(+e.target.value)} />
        </Col>
        <Col span={4}>
          <Button type="primary" onClick={() => setRate(value)}>
            Change currency rate
          </Button>
        </Col>
      </Row>
    )
  },
)
