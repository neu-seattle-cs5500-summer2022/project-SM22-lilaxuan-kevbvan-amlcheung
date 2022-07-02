import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { useNavigate, useParams } from 'react-router';
import './EventEntry.css';

export default function EventEntry() {

    const navigate = useNavigate();
    const [eventName, setEventName] = useState('');
    const [eventDate, setEventDate] = useState('');
    const [eventTime, setEventTime] = useState('');
    const [eventDesc, setEventDesc] = useState('');
    const [eventLocation, setEventLocation] = useState('');
    // const [username, setUsername] = useState(null);
    const params = useParams();


    // useEffect(function () {
    //     Axios.get('/api/user/isLoggedIn')
    //         .then(response => setUsername(response.data.username))
    //         .catch(error => console.log("User is not logged in"));
    // }, [])

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
        Axios.post('/api/event/', { eventName, eventDate, eventTime, eventDesc, eventLocation})
            .then(response => {
                console.log(response)
                navigate('/event/' + response.data._id); // needs to navigate to the new event page
                navigate(0); // refreshes the page
            })
            .catch(error => console.log(error));
    }

    // // Updates the restaurant
    // function updateEvent() {
    //     const eventId = params.eventId;
    //     Axios.put('/api/event/', { eventId, eventName, eventDate, eventTime, eventDesc, eventLocation })
    //         .then(response => {
    //             //console.log(response)
    //             navigate('/event/' + eventId); // needs to navigate to the new event page
    //             navigate(0); // refreshes the page
    //         })
    //         .catch(error => console.log(error));
    // }

    // if (params.eventId == 'new') {
    //     // if the event is new, then create a new event when submitted   
    //     return (
    //         <div>
    //             <div className="header">Create a new Event</div>
    //             <div className="new-event-form">
    //                 <div>
    //                     Event Name
    //                 </div>
    //                 <input id='event' className="input-box" value={eventName} onChange={e => setEventName(e.target.value)} />

    //                 <div>
    //                     Date (mm/dd/yyyy)
    //                 </div>
    //                 <input id='eventDate' className="input-box" value={eventDate} onChange={e => setEventDate(e.target.value)} />

    //                 <div>
    //                     Time (HHMM)
    //                 </div>
    //                 <input id='eventTime' className="input-box" value={eventTime} onChange={e => setEventTime(e.target.value)} />

    //                 <div>
    //                     Description
    //                 </div>
    //                 <input id='eventDesc' className="input-box" value={eventDesc} onChange={e => setEventDesc(e.target.value)} />

    //                 <button className="submit" onClick={createNewEvent}>
    //                     Submit
    //                 </button>

    //             </div>
    //         </div>

    //     )
    // } else {
        // if the restaurant is being edited, then update the restaurant when submitted
        return (
            <div>
                <div className="header">Create an Event</div>
                <div className="new-event-form">
                    <div>
                        Event Name
                    </div>
                    <input id='event' className="input-box" value={eventName} onChange={e => setEventName(e.target.value)} />

                    <div>
                        Date (mm/dd/yyyy)
                    </div>
                    <input id='eventDate' className="input-box" value={eventDate} onChange={e => setEventDate(e.target.value)} />

                    <div>
                        Time (HHMM)
                    </div>
                    <input id='eventTime' className="input-box" value={eventTime} onChange={e => setEventTime(e.target.value)} />

                    <div>
                        Description
                    </div>
                    <input id='eventDesc' className="input-box" value={eventDesc} onChange={e => setEventDesc(e.target.value)} />

                    <button className="submit" onClick={createNewEvent}>
                        Submit
                    </button>
                </div>
            </div>

        )
    // }
}