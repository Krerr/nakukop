import axios from 'axios'
import { Urls } from '../constants/api'
import { NamesServerModel } from '../models/NamesServer.model'
import { GoodsServerModel } from '../models/GoodsServer.model'

async function getNames(): Promise<NamesServerModel> {
  const res = await axios.get(Urls.names)
  return res.data
}

async function getGoods(): Promise<GoodsServerModel> {
  const res = await axios.get(Urls.goods)
  return res.data
}

export const Api = { getNames, getGoods }
