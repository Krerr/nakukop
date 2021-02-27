export type Product = {
  B: boolean
  C: number // Цена в долларах
  CV: any
  G: number // Id группы
  P: number // количество оставшегося товара
  Pl: any
  T: number
}

export type GoodsServerModel = {
  Error: string
  Id: number
  Success: boolean
  Value: {
    Goods: Product[]
  }
}
