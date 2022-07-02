const mongoose = require('mongoose');

// const ReviewSchema = require('../schema/event.schema');

const EventModel = mongoose.model("Event", EventSchema);

function createEvent(event) {
    return EventModel.create(event);
}

function getAllEvents() {
    return EventModel.find().exec();
}

/*
function getReviewById(id) {
    return ReviewModel.find(id).exec();
}
*/
// function getReviewByRestaurantId(RestaurantId) {
//     return ReviewModel.find({
//         restaurantId: RestaurantId
//     }).exec();
// }

function updateEventByEventId(id, updatedEvent) {
    return EventModel.findByIdAndUpdate(id, {
        event: updatedEvent
    }).exec();
}

function deleteEventByEventId(EventId) {
    return EventModel.deleteMany({
        eventId: EventId
    }).exec();
}

// function deleteReviewByReviewId(id) {
//     return ReviewModel.findByIdAndDelete(id).exec();
// }

module.exports = {
//     createReview,
//     getAllReviews,
//    // getReviewById,
//     getReviewByRestaurantId,
//     updateReviewByReviewId,
//     deleteReviewByRestaurantId,
//     deleteReviewByReviewId,
    createEvent,
    getAllEvents,
    updateEventByEventId,
    deleteEventByEventId,
}
