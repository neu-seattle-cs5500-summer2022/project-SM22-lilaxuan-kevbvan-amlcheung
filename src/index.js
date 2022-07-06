import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import EventEntry from './EventEntry';
import NavBar from './NavBar';
import EventsPage from './EventsPage';

  ReactDOM.render(
   <div>
   <BrowserRouter>
    <NavBar />
     <Routes>
      <Route path={"/"} element={<App />}/>
      <Route path={"/eventEntry/:eventId"} element={<EventEntry />}/>
      <Route path={"/event/:eventId"} element={<EventsPage />}/>
    </Routes>
   </BrowserRouter>
      
   </div>
 ,
  document.getElementById('root'));