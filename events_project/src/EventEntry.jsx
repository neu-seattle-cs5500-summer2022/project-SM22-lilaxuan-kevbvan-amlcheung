import React, {useState, useEffect } from 'react';
import Axios from 'axios';
import { useNavigate, useParams} from 'react-router';
import './EventEntry.css';

export default function ReviewEntry() {

    const navigate = useNavigate();
    const [eventName, setEventName] = useState('');
    const [cuisine, setCuisine] = useState('');
    const [rating, setRating] = useState('');
    const [username, setUsername] = useState(null);
    const params = useParams();


    useEffect(function() {
        Axios.get('/api/user/isLoggedIn')
            .then(response => setUsername(response.data.username))
            .catch(error => console.log("User is not logged in"));
    }, [])

    // Gets the event and sets the event Id
    useEffect(function() {
        const eventInput = document.getElementById('event');
        const cuisineInput = document.getElementById('cuisine');
        const ratingInput = document.getElementById('rating');
         if (params.eventId === 'new'){
            eventInput.value = '';
            cuisineInput.value = '';
            ratingInput.value = '';
         } else {
            Axios.get('/api/event/' + params.eventId)
            .then(response =>{
                eventInput.value = response.data.name
                setEventName(response.data.name)
                cuisineInput.value = response.data.cuisine
                setCuisine(response.data.cuisine)
                ratingInput.value = response.data.rating
                setRating(response.data.rating)
            })
            .catch(error => {console.log(error)});
         }
    },[]);

    function createNewEvent() {
        Axios.post('/api/event/', {eventName, cuisine, rating, username})
            .then(response => {
                console.log(response)
                navigate('/event/' + response.data._id); // needs to navigate to the new event page
                navigate(0); // refreshes the page
            })
            .catch(error => console.log(error));
    }

     // Updates the event
     function updateEvent() {
        const eventId = params.eventId;
        Axios.put('/api/event/', {eventId, eventName, cuisine, rating, username})
            .then(response => {
                //console.log(response)
                navigate('/event/' + eventId); // needs to navigate to the new restaurant page
                navigate(0); // refreshes the page
            })
            .catch(error => console.log(error));
    }

    if (params.eventId === 'new') {
    // if the event is new, then create a new event when the buttom is submitted   
        return (
            <div>
                <div className="header">create a new event</div>
                <div className="new-event-form">
                    <div>
                        event name
                    </div>
                    <input id = 'event' className="input-box" value={eventName} onChange={e => setEventName(e.target.value)} />
                    <button className="submit" onClick={createNewEvent}>
                        submit
                    </button>
        
                </div>
            </div>
    
        )  
    } else {
        // if the event is being edited, then update the event when the button is submitted
        return (
            <div>
                <div className="header">Update a Event</div>
                <div className="new-event-form">
                <div>
                event name
                </div>
                <input id = 'event' className="input-box"  value={eventName} onChange={e => setEventName(e.target.value)} />
            </div>
            </div>       
    
        )
    }   
}