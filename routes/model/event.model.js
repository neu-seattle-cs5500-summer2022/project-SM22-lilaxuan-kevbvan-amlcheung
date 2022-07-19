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


function updateEventByEventId(id, updatedEvent) {
    return EventModel.findByIdAndUpdate(id, {
        event: updatedEvent
    }).exec();
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
