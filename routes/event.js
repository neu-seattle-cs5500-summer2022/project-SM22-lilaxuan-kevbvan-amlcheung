const express = require('express');
const EventModel = require('./model/event.model');
// const jwt = require('jsonwebtoken');
// const auth_middleware = require('./middleware/auth_middleware');
// const { get } = require('./user');
const router = express.Router();

// Gets all events
router.get('/', function(request, response) {
    return EventModel.getAllEvents()
        .then(allEvents => {
            response.status(200).send(allEvents)
        })
        .catch(error => {
            response.status(400).send(error)
        })
})

// create an event
router.post('/', function(request, response) {

    const eventIdNum = request.body.eventId;
    const eventName = request.body.eventName;
    const eventDescription = request.body.eventDescription;
    const eventDate = request.body.eventDate;
    const eventTime = request.body.eventTime;
    const eventLocation = request.body.eventLocation;

    if (!eventIdNum) {
        response.status(401).send("Missing Event ID argument");
    } else if (!eventName) {
        response.status(401).send("Missing Event Title argument");
    } else if (!eventDescription) {
        response.status(401).send("Missing Event Descirption argument");
    } else if (!eventDate) {
        response.status(401).send("Missing Event Date argument");
    } else if (!eventTime) {
        response.status(401).send("Missing Event Time argument");
    } else if (!eventLocation) {
        response.status(401).send("Missing Event Location argument");

    const event = {
        eventId: eventIdNum,
        title: eventName, 
        description: eventDescription,
        date: eventDate,
        location: eventLocation
    }

    console.log(event);

    return EventModel.createEvent(event)
        .then(dbResponse => {
            response.status(200).send(dbResponse);
        })
        .catch(error => {
            response.status(400).send(error)
        })
});

// update the attribute of an event. Will keep the original info
// for an attribute if the user doesn't make any changes to it
router.put('/', function(request, response) {
    const eventId = request.body.eventId;
    const eventName = request.body.eventName;
    const eventDescription = request.body.eventDescription;
    const eventDate = request.body.eventDate;
    const eventTime = request.body.eventTime;
    const eventLoctaion = request.body.eventLocation;

    if (eventDate === undefined) {
        eventDate = request.date;
    }

    return EventModel.updateEventByEventId(eventId, eventName, eventDescription, eventDate, eventTime, eventLoctaion)
        .then(dbResponse => {
            response.status(200).send(dbResponse);
        })
        .catch(error => {
            response.status(400).send(error);
        })
});

// delete an event
router.delete('/:eventId', function(request, response) {
    const eventId = request.params.eventId;

    return EventModel.deleteEvent(eventId)
    .then(dpResponse => {
        response.status(200).send(dpResponse);
    })
    .catch(error => {
        response.status(400).send(error);
    })
})

module.exports = router;