import mongoose from 'mongoose'

import { MongoCredentials } from '@@/env'
import { getConnectionString } from '@/database/util'

const initDatabase = async (): Promise<void> => {
    await mongoose.connect(getConnectionString(MongoCredentials.user, MongoCredentials.password, 'zpw2020'), {
        useNewUrlParser: true
    })

    console.log('Connecting to MongoDB...')

    return new Promise((resolve, reject) => {
        const db = mongoose.connection

        db.on('error', (err) => {
            reject(err)
        })

        db.once('open', () => {
            resolve()
        })
    })
}

export {
    initDatabase
}
