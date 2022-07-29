const express = require('express');
const EventModel = require('./model/event.model');
const router = express.Router();

// Gets all events
router.get('/', function (request, response) {
    return EventModel.getAllEvents()
        .then(allEvents => {
            // console.log("get all routes");
            response.status(200).send(allEvents)
        })
        .catch(error => {
            // console.log("event.js: 3");
            response.status(400).send(error)
        })
})

// gets event by Id
router.get('/:eventId', function(request, response) {
    const eventId = request.params.eventId
    // console.log("eventId: " + eventId);

    return EventModel.getEventById(eventId)
        .then(event => {
                response.status(200).send(event);
                console.log("Get Router Sucessful");
        })
        .catch(error => {
            response.status(400).send(error);
            console.log("Get Router Unsuccessful");
        })
})

// create an event
router.post('/', function (request, response) {

    // console.log("in router.post()!!");

    // const eventIdNum = request.body.eventId;
    const name = request.body.eventName;
    const description = request.body.eventDescription;
    const date = request.body.eventDate;
    const time = request.body.eventTime;
    const location = request.body.eventLocation;

    // if (!eventIdNum) {
    //     response.status(401).send("Missing Event ID argument");
    if (!name) {
        response.status(401).send("Missing Event Title argument");
    } else if (!description) {
        response.status(401).send("Missing Event Descirption argument");
    } else if (!date) {
        response.status(401).send("Missing Event Date argument");
    } else if (!time) {
        response.status(401).send("Missing Event Time argument");
    } else if (!location) {
        response.status(401).send("Missing Event Location argument");
    }

    const event = {
        // eventId: eventIdNum,
        eventName: name,
        eventDescription: description,
        eventDate: date,
        eventTime: time,
        eventLocation: location
    }

    // console.log("Event POST" + event);

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
router.put('/', function (request, response) {
    const eventId = request.body.eventId;
    const eventName = request.body.eventName;
    const eventDescription = request.body.eventDescription;
    const eventDate = request.body.eventDate;
    const eventTime = request.body.eventTime;
    const eventLocation = request.body.eventLocation;

    if (eventDate === undefined) {
        eventDate = request.date;
    }

    return EventModel.updateEventByEventId(eventId, eventName, eventDate, eventTime, eventDescription, eventLocation)
        .then(dbResponse => {
            response.status(200).send(dbResponse);
        })
        .catch(error => {
            response.status(400).send(error);
        })
});

// delete an event
router.delete('/:eventId', function (request, response) {
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