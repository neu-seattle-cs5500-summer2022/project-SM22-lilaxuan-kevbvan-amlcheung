import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import './App.css';

// This is the main entry of the app!

export default function App() {

  const [events, setEvents] = useState([]);

  function getEvents() {
    console.log("in getEvents()");
    Axios.get('/api/event/')
      .then(function (response) {
        setEvents(response.data);
      })
    .catch(error => {console.log("ERROR: " + error)});
  }

  useEffect(getEvents, []);
  console.log("Events: " + events);

  const eventComponent = [];
  console.log("eventComponent: " + eventComponent);
  for (let event of events) {
    eventComponent.push(<div>
      <a href={'/event/' + event._id}><div>Event Name: {event.eventName}</div></a>
      <div>Time: {event.eventTime}</div>
      <div>Date: {event.eventDate}</div>
      <div>Location: {event.eventLocation}</div>
      <div>Desc: {event.eventDescription}</div>
    </div>)
  }



  return (
    <div className="App">

      <header className="App-header">
        <p>
          Welcome to the Events Project!
        </p>
      </header>
  
      <div>
        {eventComponent}
      </div>

      <footer id="footer">Group 3 Team members: Ashley Cheung, Kevin Van, Jiaxuan Li </footer>

    </div>
  );
}