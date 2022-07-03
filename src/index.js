import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import App from './App';
import EventEntry from './EventEntry';
import NavBar from './NavBar';
// import Login from './Login';
// import CreateUser from './CreateUser';
// import RestaurantEntry from './RestaurantEntry';
import EventsPage from './EventsPage';

// Todo: change it here!!

  ReactDOM.render(
   <div>
   <BrowserRouter>
    <NavBar />
     <Routes>
      <Route path={"/"} element={<App />}/>
      {/* <Route path={"/login"} element={<Login />} />
      <Route path={"/createUser"} element={<CreateUser />} /> */}
      {/* <Route path={"/restaurantEntry/:restaurantId"} element={<RestaurantEntry />}/> */}
      <Route path={"/eventEntry/:eventId"} element={<EventEntry />}/>
      <Route path={"/event/:eventId"} element={<EventsPage />}/>
      {/* <Route path={"/eventEntry/:eventId"} element={<EventEntry />}/> */}
    </Routes>
   </BrowserRouter>
      
   </div>
 ,
   document.getElementById('root') );
