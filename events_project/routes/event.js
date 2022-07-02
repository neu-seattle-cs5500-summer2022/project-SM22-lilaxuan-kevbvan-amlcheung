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
    const eventName = request.body.title;
    const eventDescription = request.body.description;
    const eventDate = request.body.date;
    const eventOwner = request.body.owner;

    if (!eventIdNum) {
        response.status(401).send("Missing Event ID argument");
    } else if (!eventName) {
        response.status(401).send("Missing Event Title argument");
    } else if (!eventDescription) {
        response.status(401).send("Missing Event Descirption argument");
    } else if (!eventDate) {
        response.status(401).send("Missing Event Date argument");
    } else if (!eventOwner) {
        response.status(401).send("Missing Event Owner argument");
    }

    const event = {
        eventId: eventIdNum,
        title: eventName, 
        description: eventDescription,
        date: eventDate,
        owner: eventOwner,
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

// update a the date or owner attribute of an event. Will keep the original info
// for an attribute if the user doesn't make any changes to it
router.put('/', function(request, response) {
    const eventId = request.body.eventId;
    const eventName = request.body.title;
    const eventDescription = request.body.description;
    const eventDate = request.body.date;
    const eventOwner = request.body.owner;

    if (eventDate === undefined) {
        eventDate = request.date;
    }
    if (eventOwner === undefined) {
        eventOwner = request.owner;
    }

    return EventModel.updateEventByEventId(eventId, eventName, eventDescription, eventDate, eventOwner)
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