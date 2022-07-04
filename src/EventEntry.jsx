import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { useNavigate, useParams } from 'react-router';
import './EventEntry.css';

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
        if (params.eventId == 'new') {
            eventInput.value = '';
            dateInput.value = '';
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
    }, []);

    function createNewEvent() {
        Axios.post('/api/event/', { eventName, eventDate, eventTime, eventDescription, eventLocation })
            .then(response => {
                console.log("created event");
                console.log(response.data);
                // navigate('/');
                navigate(0); // refreshes the page
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
                <input id='eventDate' className="input-box" value={eventDate} onChange={e => setEventDate(e.target.value)} />

                <div>
                    Time
                </div>
                <input id='eventTime' className="input-box" value={eventTime} onChange={e => setEventTime(e.target.value)} />

                <div>
                    Description
                </div>
                <input id='eventDescription' className="input-box" value={eventDescription} onChange={e => setEventDesc(e.target.value)} />

                <div>
                    Location
                </div>
                <input id='eventLocation' className="input-box" value={eventLocation} onChange={e => setEventLocation(e.target.value)} />
                <p>
                </p>

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
                    <input className="input-box" value={eventDate} onChange={e => setEventDate(e.target.value)} />

                    <div>
                        Time
                    </div>
                    <input className="input-box" value={eventTime} onChange={e => setEventTime(e.target.value)} />

                    <div>
                        Description
                    </div>
                    <input className="input-box" value={eventDescription} onChange={e => setEventDesc(e.target.value)} />

                    <div>
                        Location
                    </div>
                    <input className="input-box" value={eventLocation} onChange={e => setEventLocation(e.target.value)} />
                    <p>
                    </p>

                    <button className="submit" onClick={createNewEvent}>
                        Submit
                    </button>
                </div>
            </div>

        )

    }

    // }
}