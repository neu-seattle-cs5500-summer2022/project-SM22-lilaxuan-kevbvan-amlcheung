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

    // Gets the restaurant and sets the restaurant Id
    useEffect(function() {
        const restaurantInput = document.getElementById('restaurant');
        const cuisineInput = document.getElementById('cuisine');
        const ratingInput = document.getElementById('rating');
         if (params.restaurantId === 'new'){
            restaurantInput.value = '';
            cuisineInput.value = '';
            ratingInput.value = '';
         } else {
            Axios.get('/api/restaurant/' + params.restaurantId)
            .then(response =>{
                restaurantInput.value = response.data.name
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
        Axios.post('/api/restaurant/', {eventName, cuisine, rating, username})
            .then(response => {
                console.log(response)
                navigate('/restaurant/' + response.data._id); // needs to navigate to the new restaurant page
                navigate(0); // refreshes the page
            })
            .catch(error => console.log(error));
    }

    //  // Updates the restaurant
    //  function updateEvent() {
    //     const restaurantId = params.restaurantId;
    //     Axios.put('/api/event/', {restaurantId, eventName, cuisine, rating, username})
    //         .then(response => {
    //             //console.log(response)
    //             navigate('/restaurant/' + restaurantId); // needs to navigate to the new restaurant page
    //             navigate(0); // refreshes the page
    //         })
    //         .catch(error => console.log(error));
    // }

    if (params.restaurantId === 'new') {
    // if the restaurant is new, then create a new restaurant when the buttom is submitted   
        return (
            <div>
                <div className="header">create a new event</div>
                <div className="new-restaurant-form">
                    <div>
                        event name
                    </div>
                    <input id = 'restaurant' className="input-box" value={eventName} onChange={e => setEventName(e.target.value)} />
                    <button className="submit" onClick={createNewEvent}>
                        submit
                    </button>
        
                </div>
            </div>
    
        )  
    } else {
        // if the restaurant is being edited, then update the restaurant when the button is submitted
        return (
            <div>
                <div className="header">Update a Event</div>
                <div className="new-restaurant-form">
                <div>
                    restaurant name
                </div>
                <input id = 'restaurant' className="input-box"  value={eventName} onChange={e => setEventName(e.target.value)} />
            </div>
            </div>       
    
        )
    }   
}