import Axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import './NavBar.css';

export default function NavBar(props) {

    const [username, setUsername] = useState(null);

    const navigate = useNavigate();

    // useEffect(function() {
    //     Axios.get('/api/user/isLoggedIn')
    //         .then(response => setUsername(response.data.username))
    //         .catch(error => console.log("User is not logged in"));
    // }, [])

    // function logout() {
    //     Axios.post('/api/user/logout')
    //     .then(response => {
    //         navigate('/'); // sending it back to the home page and then reload the page
    //         navigate(0); // refreshing the whole page
    //     })
    //     .catch(error => console.log("Error logging out"));
    // }

    // /eventEntry/new -> new is the event id
    // href component cannot have style?? why the component will still exist on another page??????
    return (
        <div className='createEvent'>
            <a href='/eventEntry/new'><h>Create An Event</h></a>
        </div>

    )


}