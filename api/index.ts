import axios from 'axios'
import { Urls } from '../constants/api'

async function getNames(): Promise<any> {
  const res = await axios.get(Urls.names)
  return res.data
}

async function getGoods(): Promise<any> {
  const res = await axios.get(Urls.goods)
  return res.data
}

export const Api = { getNames, getGoods }
