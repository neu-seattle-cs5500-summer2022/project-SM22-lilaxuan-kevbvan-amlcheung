const Schema = require('mongoose').Schema;

const EventSchema = new Schema ({
    // eventId: String,
    eventName: String,
    eventDate: String,
    eventLocation: String,
    eventTime: String,
    eventDescription: String,
    // eventDate: {
    //     type: Date
    // },
    // owner: String
}, {
    collection: 'events',
})

module.exports = EventSchema;