import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import './App.css';
// import { Button, Container } from 'react';
// import { TextField } from 'react';
import Modali, { useModali } from 'modali';
// import EventsPage from './EventsPage';
// import CreateEventForm from './components/createEventForm';

// This is the main entry of the app!

export default function App() {

  const [event, setEvent] = useState([]);

  const [modal, openModal] = useModali();
  const [modal1, openModal1] = useModali();
  const [modal2, openModal2] = useModali();

  // handle the submit of the input form of the Modal section
  const [form, setForm] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`Form submitted, ${form}`);
  }
  const [events, displayEvents] = useState([
    { id: 1, eventName: 'Firworks', eventDate: "2022-04-01", location: "Seattle, WA", description: "The fireworks show is to celebrate the July 4th." },
    { id: 2, eventName: 'Fancy show', eventDate: "2022-05-03", location: "Seattle, WA", description: "The fancy show is to celebrate the July 4th." },
    { id: 3, eventName: 'Rocks & Roll', eventDate: "2022-04-21", location: "Los Angeles, CA", description: "This show is to celebrate the July 4th." },
    { id: 4, eventName: 'Season', eventDate: "2022-05-21", location: "New Work, NY", description: "This show is to celebrate the July 4th." },
    { id: 5, eventName: 'Summer', eventDate: "2022-06-03", location: "Seattle, WA", description: "This show is to celebrate the July 4th. " }
  ]);


  // const [inputFields, setInputFields] = useState(
  //   [
  //     {
  //       eventName: '',
  //       eventDate: ''
  //     }
  //   ])

  // const handleChangeInput = (index, event) => {
  //   const values = [...inputFields];
  //   values[index][event.target.name] = event.target.value;
  //   setInputFields(values);
  // }

  //   const handleSubmit = (e) => {
  //     console.log("input fields are: ", inputFields)
  //   }



  {/* Question: where is this api defined? api/event */ }
  function getEvent() {
    Axios.get('/api/event/')
      .then(function (response) {
        setEvent(response.data);
      })
  }
  useEffect(getEvent, []);
  console.log(event);

  const eventComponent = [];
  console.log(eventComponent);
  for (let e of event) {
    console.log(e);
    eventComponent.push(<div>
      <a href={'/event/' + e._id}><div className="event-name font-style-events">{e.name}</div></a>
    </div>)
  }


  return (
    <div className="App">

      <header className="App-header">
        <p>
          Welocme to the Events Project!
        </p>
      </header>
      <p>
      </p>


      <div className="Display_events">
        <h3 className="p-3 text-center">Display a list of events</h3>
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th> Event Name </th>
              <th>Even Date</th>
              <th>Location</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {events && events.map(event =>
              <tr key={event.id}>
                <td>{event.eventName} </td>
                <td>{event.eventDate}</td>
                <td>{event.location}</td>
                <td>{event.description}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>


      <button onClick={openModal}>
        Create a new event
      </button>
      <Modali.Modal {...modal}>
        <form>
          <p>Create a new event:</p>
          <label>Event Name: <input type="text" /> </label>
          <p>
          </p>
          <label>Event Date: <input type="text" /> </label>
          <p>
          </p>
          <label>Location: <input type="text" /> </label>
          <p>
          </p>
          <label>Description: <input type="text" /> </label>
          <p>
          </p>
          <button onClick={openModal}>submit</button>
          {/* <input onChange={(e) => setForm(e.target.value)} value={form}></input>
          <button type='submit'>submit</button> */}
          <p>
          </p>
        </form>
      </Modali.Modal>
      <p>
      </p>

      <button onClick={openModal1}>
        Update an event
      </button>
      <Modali.Modal {...modal1}>
        <form>
          <p>Update an event:</p>
          <label>Event Name: <input type="text" /> </label>
          <p>
          </p>
          <label>Event Date: <input type="text" /> </label>
          <p>
          </p>
          <label>Location: <input type="text" /> </label>
          <p>
          </p>
          <label>Description: <input type="text" /> </label>
          <p>
          </p>
          <button onClick={openModal1}>submit</button>
          {/* <input onChange={(e) => setForm(e.target.value)} value={form}></input>
          <button type='submit'>submit</button> */}
          <p>
          </p>
        </form>
      </Modali.Modal>
      <p>
      </p>

      <button onClick={openModal2}>
        Delete an event
      </button>
      <Modali.Modal {...modal2}>
        <form>
          <p>Delete an event:</p>
          <label>Event Name: <input type="text" /> </label>
          <p>
          </p>
          <label>Event Date: <input type="text" /> </label>
          <p>
          </p>
          <button onClick={openModal2}>submit</button>
          {/* <input onChange={(e) => setForm(e.target.value)} value={form}></input>
          <button type='submit'>submit</button> */}
          <p>
          </p>
        </form>
      </Modali.Modal>
      <p>
      </p>


      {/* todo: Diaplay all the events  */}
      <div className="font-style-events">
        {eventComponent}
      </div>



      {/* <CreateEventForm />  */}
      {/* <EventsPage /> */}

      <footer id="footer">Group 3 Team members: Ashley Cheung, Kevin Van, Jiaxuan Li </footer>
    </div>
  );
}