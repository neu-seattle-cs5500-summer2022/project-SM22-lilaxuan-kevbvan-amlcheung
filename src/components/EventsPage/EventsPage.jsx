import Axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams,  useNavigate } from 'react-router';
import '../EventsEntry/EventEntry';

export default function EventsPage(props) {

    const [event, setEvent] = useState(undefined);
    const [eventId, setEventId] = useState(undefined);
    const params = useParams();
    const navigate = useNavigate();

    // Gets the event and sets the event Id
    useEffect(function() {
        Axios.get('/api/event/' + params.eventId)
            .then(response => setEvent(response.data))
            .catch(error => {
                if (error.response.status === 404) {
                console.log("in error");
                navigate("/");
                navigate("0");
                }
                });
        setEventId(params.eventId);
    },[]);

   

    return ( 
        <div>
            <div>
                Event Id: {event.eventId} 
            </div>
            <div>
                Event Name: {event.eventName}
            </div>
        </div>
        ) 



    // // if logged in and created restaurant, return this
    // if (username && username === restaurant.owner) {
    //     return ( 
    //     <div className="font-style-events">
    //         <div className="restaurant-name">
    //             {restaurant.name} 
    //         </div>
    //         <div className="attribute-name">
    //             Cuisine: {restaurant.cuisine}
    //         </div>
    //         <div className="attribute-name">
    //             Michilen Stars: {restaurant.rating}
    //         </div>
    //         {/* <div>
    //            ID: {restaurant._id}
    //         </div> */}
    //         <div className="attribute-name border">
    //            Owner: {restaurant.owner}
    //         </div>
    //         <button className = 'mod-button' id = "delete-restaurant" onClick={deleteEvent}>
    //             delete restaurant
    //         </button>
    //         <button className = 'mod-button' onClick={editEvent}>edit restaurant</button>
    //         <div>
    //             review restaurant:
    //         </div>
    //         <textarea id= "theReview" rows = "10" cols = "60" onChange={e => setReview(e.target.value)}></textarea>
    //         <button className = 'mod-button' id = "create" onClick={createReview}>
    //             submit review
    //         </button>
    //         {reviewComponent}
    //     </div>
    //     ) 
    //     // logged in but did not create the restaurant
    // } else if (username) {
    //     return ( 
    //     <div className="font-style-events">
    //         <div className="restaurant-name">
    //             {restaurant.name} 
    //         </div>
    //         <div className="attribute-name">
    //             Cuisine: {restaurant.cuisine}
    //         </div>
    //         <div className="attribute-name">
    //             Michilen Stars: {restaurant.rating}
    //         </div>
    //         {/* <div>
    //            ID: {restaurant._id}
    //         </div> */}
    //         <div className="attribute-name border">
    //            Owner: {restaurant.owner}
    //         </div>
    //         <div>
    //             Review this Restaurant:
    //         </div>
    //         <textarea id= "theReview" rows = "10" cols = "60" onChange={e => setReview(e.target.value)}></textarea>
    //         <button className = 'mod-button' id = "create" onClick={createReview}>
    //             submit review
    //         </button>
    //         {reviewComponent}
    //     </div>
    //     ) 
    // }

    // // if not logged in 
    // return (
    //     <div className="font-style-events">
    //         <div className="restaurant-name">
    //             {restaurant.name} 
    //         </div>
    //         <div className="attribute-name">
    //             Cuisine: {restaurant.cuisine}
    //         </div>
    //         <div className="attribute-name">
    //             Michilen Stars: {restaurant.rating}
    //         </div>
    //         {/* <div>
    //            ID: {restaurant._id}
    //         </div> */}
    //         <div className="attribute-name border">
    //            Owner: {restaurant.owner}
    //         </div>
    //         {reviewComponent}

    //     </div>
    // )

}