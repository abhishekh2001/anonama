import express, { Express, Request, Response } from 'express'
import 'dotenv/config'
import cors from 'cors'
import bodyParser from 'body-parser'
import reclaimRoute from './src/routes/reclaim/index'
import { connectDb } from './db'

const app: Express = express()
const port = process.env.PORT

app.use(cors())
app.use(bodyParser.json())

app.use('/reclaim', reclaimRoute)

app.get('/', (req: Request, res: Response) => {
    res.send('Express + TypeScript Server')
})

connectDb()
    .then(() => {
        app.listen(port, () => {
            console.log(
                `⚡️[server]: Server is running at http://localhost:${port}`
            )
        })
    })
    .catch((err) => {
        console.log('error -- ', (err as Error).toString())
    })
