import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import './App.css';
// import Modali, { useModali } from 'modali';
// import EventEntry from './EventEntry';
// import { getAllEvents } from '../routes/model/event.model';
// import EventsPage from './EventsPage';

// This is the main entry of the app!

export default function App() {

  const [events, setEvents] = useState([]);

  // not working
  function getEvents() {
    console.log("in getEvents()");
    Axios.get('/api/event/')
      .then(function(response) {
        setEvents(response.data);
      })
  }

  useEffect(getEvents, []);
  console.log("Events: " + events);

const eventComponent = [];
console.log("eventComponent: " + eventComponent);
for (let event of events) {
  eventComponent.push(<div>
    <a href={'/event/' + event._id}><div>Event Name: {event.eventName}</div></a>
    <div>Location: {event.eventLocation}</div>
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

    </div>
  );
}