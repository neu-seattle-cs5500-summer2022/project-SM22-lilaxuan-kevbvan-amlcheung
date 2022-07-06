const mongoose = require('mongoose');

const EventSchema = require('../schema/event.schema');

const EventModel = mongoose.model("Event", EventSchema);

function createEvent(event) {
    return EventModel.create(event);
}

function getAllEvents() {
    return EventModel.find().exec();
}

function getEventByName(eventName) {

    return EventModel.find({
    
    eventName: eventName
    
    }).exec();
    
}
    
function getEventById(id) {

return EventModel.findById(id).exec();

}


function updateEventByEventId(id, updatedName, updatedDate, updatedTime, updatedDesc, updatedLocation) {
    return EventModel.findByIdAndUpdate(id, {
        "$set": {"eventName": updatedName, "eventDate": updatedDate, "eventTime": updatedTime, "eventDescription": updatedDesc, "eventLocation": updatedLocation }}
        ).exec();
}

function deleteEvent(EventId) {
    // console.log("in deleteEvent()");
    return EventModel.findByIdAndDelete(EventId).exec();
}


module.exports = {
    createEvent,
    getAllEvents,
    getEventByName,
    getEventById,
    updateEventByEventId,
    deleteEvent,
}
