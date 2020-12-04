import { Schema } from 'mongoose'

const TripSchema = new Schema({
    id: String,

    description: String,
    destination: String,
    name: String,
    photoUrl: String,
    startDate: String,
    endDate: String,

    maxPeopleCount: Number,
    currentPeopleCount: Number,
    rating: Number,
    price: Number
})

export {
    TripSchema
}
