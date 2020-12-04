import mongoose from 'mongoose'

import { TripSchema } from '@/database/schemas'

const Trip = mongoose.model('Trip', TripSchema)

export {
    Trip
}
