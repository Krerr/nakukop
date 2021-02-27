export type NamesServerModel = {
  [id: number]: {
    G: string // наименование группы
    B: {
      // продукты
      [productId: string]: {
        N: string // наименование продукта
        T: number
      }
    }
  }
}
