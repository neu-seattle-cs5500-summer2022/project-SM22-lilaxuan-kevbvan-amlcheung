import React, { useState, useEffect, useCallback } from 'react';
import Axios from 'axios';
import { useNavigate, useParams } from 'react-router';
import './EventEntry.css';
import DateSelector from './DateSelector.jsx'

export default function EventEntry() {

    const navigate = useNavigate();
    const [eventName, setEventName] = useState('');
    const [eventDate, setEventDate] = useState('');
    const [eventTime, setEventTime] = useState('');
    const [eventDescription, setEventDesc] = useState('');
    const [eventLocation, setEventLocation] = useState('');
    // const [username, setUsername] = useState(null);
    const params = useParams();

    // Gets the event and sets the event Id
    useEffect(function () {
        const eventInput = document.getElementById('eventName');
        const dateInput = document.getElementById('eventDate');
        const timeInput = document.getElementById('eventTime');
        const descInput = document.getElementById('eventDescription');
        const locationInput = document.getElementById('eventLocation')
        if (params.eventId === 'new') {
            eventInput.value = '';
            timeInput.value = '';
            descInput.value = '';
            locationInput.value = '';
        } else {
            Axios.get('/api/event/' + params.eventId)
                .then(response => {
                    eventInput.value = response.data.eventName
                    setEventName(response.data.eventName)
                    dateInput.value = response.data.eventDate
                    setEventDate(response.data.eventDate)
                    timeInput.value = response.data.eventTime
                    setEventTime(response.data.eventTime)
                    descInput.value = response.data.eventDescription
                    setEventDesc(response.data.eventDescription)
                    locationInput.value = response.data.eventLocation
                    setEventLocation(response.data.eventLocation)
                })
                .catch(error => { console.log(error) });
        }
    }, [params.eventId]);

    function createNewEvent() {
        Axios.post('/api/event/', { eventName, eventDate, eventTime, eventDescription, eventLocation })
            .then(response => {
                console.log("created event");
                console.log(response.data);
                navigate('/');
                navigate(0);
            })
            .catch(error => console.log(error.response));
    }


    function updateEvent() {
        const eventId = params.eventId;
        Axios.put('/api/event/', {eventId, eventName, eventDate, eventTime, eventDescription, eventLocation})
            .then(response => {
                console.log("WE ARE IN UPDATE EVENT")
                navigate('/event/' + eventId);
                navigate(0);
            })
            .catch(error => console.log(error.response));
    }

    // console.log("HERE");
    if (params.eventId === 'new') {
        return (
            <div className='inputPage'>
                <div className="header">Create a New Event</div>

                <div className="new-event-form"></div>
                <div>
                    Event Name
                </div>
                <input id='eventName' className="input-box" value={eventName} onChange={e => setEventName(e.target.value)} />

                <div>
                    Date
                </div>
            
                <DateSelector setEventDate= {setEventDate}/>

                <div>
                    Time
                </div>
                <input id='eventTime' className="input-box" value={eventTime} onChange={e => setEventTime(e.target.value)} />

                <div>
                    Location
                </div>
                <input id='eventLocation' className="input-box" value={eventLocation} onChange={e => setEventLocation(e.target.value)} />

                <div>
                    Description
                </div>
                <textarea id='eventDescription' className="input-box" value={eventDescription} onChange={e => setEventDesc(e.target.value)} />

                <button className="submit" onClick={createNewEvent}>
                    Submit
                </button>
            </div>

        )
    } else {
        return (
            <div>
                <div className="header">Update an Event</div>
                <div className="new-event-form">
                    <div>
                        Event Name
                    </div>
                    <input className="input-box" value={eventName} onChange={e => setEventName(e.target.value)} />

                    <div>
                        Date
                    </div>
                    <DateSelector setEventDate= {setEventDate}/>

                    <div>
                        Time
                    </div>
                    <input className="input-box" value={eventTime} onChange={e => setEventTime(e.target.value)} />

                    <div>
                        Location
                    </div>
                    <input className="input-box" value={eventLocation} onChange={e => setEventLocation(e.target.value)} />

                    <div>
                        Description
                    </div>
                    <textarea className="input-box" value={eventDescription} onChange={e => setEventDesc(e.target.value)} />

                    <button className="submit" onClick={updateEvent}>
                        Submit
                    </button>
                </div>
            </div>

        )

    }

    // }
}