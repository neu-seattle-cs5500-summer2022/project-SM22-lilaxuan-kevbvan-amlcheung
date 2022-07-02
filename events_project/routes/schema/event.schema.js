// const Schema = require('mongoose').Schema;

// const ReviewSchema = new Schema({
//     restaurantId: String,
//     review: String,
//     reviewDate: {
//         type: Date,
//         default: Date.now,
//     },
//     owner: String,
// }, {
//     collection: 'reviews',
// })

// module.exports = ReviewSchema;

const Schema = require('mongoose').Schema;

const EventSchema = new Schema ({
    eventId: String,
    eventName: String,
    eventDate: String,
    eventLocation: String,
    eventDescription: String,
    // eventDate: {
    //     type: Date
    // },
    owner: String
}, {
        collection: 'events',
})

module.exports = EventSchema;