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


  // display for the sample events data
  // Todo: load data from the database
  const [eventsData, displayEvents] = useState([
    { id: 1, eventName: 'Firworks', eventDate: "2022-04-01", eventTime: "12:00:00", location: "Seattle, WA", description: "The fireworks show is to celebrate the July 4th." },
    { id: 2, eventName: 'Fancy show', eventDate: "2022-05-03", eventTime: "12:00:00", location: "Seattle, WA", description: "The fancy show is to celebrate the July 4th." },
    { id: 3, eventName: 'Rocks & Roll', eventDate: "2022-04-21", eventTime: "12:00:00", location: "Los Angeles, CA", description: "This show is to celebrate the July 4th." },
    { id: 4, eventName: 'Season', eventDate: "2022-05-21", eventTime: "12:00:00", location: "New Work, NY", description: "This show is to celebrate the July 4th." },
    { id: 5, eventName: 'Summer', eventDate: "2022-06-03", eventTime: "12:00:00", location: "Seattle, WA", description: "This show is to celebrate the July 4th. " }
  ]);


  function getEvents() {
    console.log("in getEvents()");
    // Axios.get('/api/event/')
    //   .then(function (response) {
    //     setEvents(response.data);
    //   })
    Axios.get('/')
    .then(function (response) {
      console.log("success");
      setEvents(response.data);
      console.log("EVENTS: " + events);
    })
    .catch(error => {console.log("ERROR: " + error)});
  }

  useEffect(getEvents, []);
  // console.log("Events: " + events);

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

      <p></p>
      <p></p>
      <p></p>
      {/* <div className="display_events">
        <h2 className="p-3 text-center">Display a list of events</h2>
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th> Event Name </th>
              <th>Even Date</th>
              <th>Even Time</th>
              <th>Location</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {eventsData && eventsData.map(event =>
              <tr key={event.id}>
                <td>{event.eventName} </td>
                <td>{event.eventDate}</td>
                <td>{event.eventTime}</td>
                <td>{event.location}</td>
                <td>{event.description}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div> */}
      
  
      <div>
        {eventComponent}
      </div>


      <footer id="footer">Group 3 Team members: Ashley Cheung, Kevin Van, Jiaxuan Li </footer>

    </div>
  );
}