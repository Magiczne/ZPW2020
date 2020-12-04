import express from 'express'

import { initDatabase } from '@/database/db'

async function main () {
    initDatabase()
        .then(() => {
            const app = express()

            app.get('/', (req, res) => {
                res.send('Express + TS')
            })

            app.listen(8080, () => {
                console.log(`⚡️[server]: Server is running at https://localhost:8080`)
            })
        })
        .catch(err => {
            console.log(err)
        })
}

main()
    .then(() => {})
    .catch(err => {
        console.error(err)
    })
