import Axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams,  useNavigate } from 'react-router';
import './App.css';
import './EventEntry';

export default function EventsPage(props) {

    const [event, setEvent] = useState(undefined);
    const [eventId, setEventId] = useState(undefined);
    // const [username, setUsername] = useState(null);
    const [review, setReview] = useState(null);
    const [allReviews, setAllReviews] = useState([]);
    const params = useParams();
    const navigate = useNavigate();

    // // Checks if user is logged in 
    // useEffect(function() {
    //     Axios.get('/api/user/isLoggedIn')
    //         .then(response => setUsername(response.data.username))
    //         .catch(error => console.log("User is not logged in"));
    // }, [])

    // Gets the event and sets the event Id
    useEffect(function() {
        Axios.get('/api/event/' + params.eventId)
            .then(response => setEvent(response.data))
            .catch(error => {
                if (error.response.status === 404) {
                navigate("/");
                navigate("0");
                }
                });
        setEventId(params.eventId);
    },[]);

    // // Creates a new review
    // function createReview() {
    //     Axios.post('/api/review/', {username, eventId, review})
    //         .then(response => {
    //             console.log("Created Review");
    //             console.log(response.data);
    //         })
    //         .catch(error => console.log(error));
    //         //setReview("");
    //     const reviewInput = document.getElementById('theReview');
    //     reviewInput.value = '';
    //     getReviewsForEvent();
    // }

        // Creates a new review
        function createReview() {
            Axios.post('/api/review/', {eventId, review})
                .then(response => {
                    console.log("Created Review");
                    console.log(response.data);
                })
                .catch(error => console.log(error));
                //setReview("");
            const reviewInput = document.getElementById('theReview');
            reviewInput.value = '';
            getReviewsForEvent();
        }

    // Deletes a review
    function deleteReview(reviewId) {
        //console.log(reviewId);
        Axios.delete('/api/review/'+ reviewId)
            .then(response => {
                console.log("Deleted Review");
                console.log(response.data);
            })
            .catch(error => console.log(error));
            getReviewsForEvent();
    }

    // Gets reviews for a specific restaurant
    function getReviewsForEvent() {
        Axios.get('/api/review/' + params.eventId)
        .then(function(response) {
            setAllReviews(response.data)
        })
        .catch(error => console.log(error));
    }

    // Edits a review
    function editReview(reviewId, review) {
        console.log("Editing Review");
        console.log(reviewId);
        console.log(review);
        const reviewInput = document.getElementById('theReview');
        reviewInput.value = review;
        deleteReview(reviewId);
    }

    
    // Edits a event
    function editEvent() {
        navigate('/eventEntry/' + params.eventId)// navigates to the restaurant entry form
        navigate(0) // refreshes the page
    }
    
    // Deletes a restaurant from the db and navigates back to the homepage
    function deleteEvent() {
        const eventId = event._id;
        console.log(eventId);
        console.log(event._id);
        Axios.delete('/api/event/'+ eventId)
            .then(response => {
                console.log("Deleted Event")
                console.log(response.data)
                navigate('/')// needs to navigate to home
                navigate(0) // refreshes the page
            })
            .catch(error => console.log(error));
    }
    

    getReviewsForEvent()
    //useEffect(() => getReviewsForEvent(), [])

    // Creates the review Compnent
    const reviewComponent = [];
    for (let review of allReviews) {
        reviewComponent.push(<div>
            <h5 className = 'review-style border-top'>date: {review.reviewDate}</h5>
            <h5 className = 'review-style'>user: {review.owner}</h5>
            <h5 className = 'review-style' >{review.review}</h5>
            <button className = 'mod-button' id = "delete" onClick={()=>deleteReview(review._id)}>delete review</button>
            <button className = 'mod-button' id = "edit" onClick={()=>editReview(review._id, review.review)}>edit review</button>
        </div>)
    }
    
    // for (let review of allReviews) {
    //     if (review.owner === username){
    //         reviewComponent.push(<div>
    //             <h5 className = 'review-style border-top'>date: {review.reviewDate}</h5>
    //             <h5 className = 'review-style'>user: {review.owner}</h5>
    //             <h5 className = 'review-style' >{review.review}</h5>
    //             <button className = 'mod-button' id = "delete" onClick={()=>deleteReview(review._id)}>delete review</button>
    //             <button className = 'mod-button' id = "edit" onClick={()=>editReview(review._id, review.review)}>edit review</button>
    //         </div>)
    //     } else {
    //     reviewComponent.push(<div>
    //         <h5 className = 'border-top'>Date: {review.reviewDate}</h5>
    //         <h5>{review.review}</h5>
    //         <h5>User: {review.owner}</h5>
    //     </div>)
    //     }
    // }

    if (!event) {
        return (<div>
            Event loading...
        </div>)
    }

    // eventId: String,
    // eventTitle: String,
    // eventDate: {
    //     type: Date
    // },
    return ( 
        <div className="font-style-events">
            <div className="restaurant-name">
                {event.eventId} 
            </div>
            <div className="attribute-name">
                Cuisine: {event.eventTitle}
            </div>
            <button className = 'mod-button' id = "delete-restaurant" onClick={deleteEvent}>
                delete restaurant
            </button>
            <button className = 'mod-button' onClick={editEvent}>edit event</button>
            <div>
                review restaurant:
            </div>
            <textarea id= "theReview" rows = "10" cols = "60" onChange={e => setReview(e.target.value)}></textarea>
            <button className = 'mod-button' id = "create" onClick={createReview}>
                submit review
            </button>
            {reviewComponent}
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