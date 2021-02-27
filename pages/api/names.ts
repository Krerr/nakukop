import {Response, Request} from 'express'
import names from '../../task/names.json'

// @ts-ignore
export default function handler(req: Request, res: Response) {
    res.status(200).json(names)
}