import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import './App.css';

export default function App() {

  const [restaurants, setRestaurants] = useState([]);
  //const [newHomeInput, setNewHomeInput] = useState('');

  function getRestaurants() {
    Axios.get('/api/restaurant/')
      .then(function(response) {
        setRestaurants(response.data);
      })
  }
  useEffect(getRestaurants, []);
  console.log(restaurants);

  const restaurantComponent = [];
  console.log(restaurantComponent);
  for(let restaurant of restaurants) {
    console.log(restaurant);
    restaurantComponent.push(<div>
      <a href={'/restaurant/' + restaurant._id}><div className="restaurant-name font-style-restaurants">{restaurant.name}</div></a>
      <div className="attribute-name font-style-restaurants">Cuisine: {restaurant.cuisine}</div>
      <div className="attribute-name font-style-restaurants margin">Michelin Stars: {restaurant.rating}</div>
      </div>)
  }

  return (
    <body>
        <div className="font-style-restaurants">
          {restaurantComponent}
        </div>
    </body>
  );
}



// import logo from './logo.svg';
// import './App.css';
// import React, {}  from 'react';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
