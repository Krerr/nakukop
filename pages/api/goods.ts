import {Response, Request} from 'express'
import data from '../../task/data.json'

// @ts-ignore
export default function handler(req: Request, res: Response) {
    res.status(200).json(data)
}