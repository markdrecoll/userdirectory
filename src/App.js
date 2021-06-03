import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from "react";
import API from './utils/API'

function App() {

  // create a state for user data
  const[userData, setUserData] = useState([
    // {
    // name: "",}
  ]);

  // create a state for inputted user data, initialize as empty string
  const[userInputData, setUserInputData] = useState("");

  // create a state for the filter
  const[userFilteredData, setUserFilteredData] = useState([
  //   {
  //   name: ""
  // }
]);
  
  // on page load run api call to get user data
  useEffect( () => {
    API.getUserList().then( (users) => {
      setUserData(users.data.results);
      setUserFilteredData(users.data.results);
    });
  }, []);

  // when a change event happens, set the userInputData state
  const onChangeHandler = (event) => {
    setUserInputData(event.target.value);
    let tempFilter = userData.filter( (user) => {
      const values = Object.values(user).join("").toLowerCase();
      return values.indexOf(userInputData.toLowerCase()) !== -1;
    })
    setUserFilteredData(tempFilter);
  }

  const sortAlpha = () => {

    function compare( a, b ) {
      if ( a.email < b.email ){
        return -1;
      }
      if ( a.email > b.email ){
        return 1;
      }
      return 0;
    }

    // const oldState = userFilteredData
    var newArray = userFilteredData.sort(compare);
    setUserFilteredData([...newArray]);

  }

  return (
    <div className="App">

      {/* place for user to input text, on change event calls the onChangeHandler*/}
      <input
      type="text"
      id="userSortInput"
      onChange = {event => {onChangeHandler(event)}}
      value = {userInputData}
      />

      <h2>User Information</h2>
      <button onClick={sortAlpha}>Sort!</button>

      {/* display the data for only users who pass the filter */}
      {userFilteredData.map( (user) => {
        //console.log('MAP HAPPENING', user)
        return(
        <tr>
          <td><img src={user.picture.thumbnail} alt="user_thumbnail"></img></td>
          <td>{user.name.first}</td>
          <td>{user.name.last}</td>
          <td>{user.email}</td>
          <td>{user.phone}</td>
          <td>{user.dob.age}</td>
        </tr>
        )
      })}
      
    </div>
  );
}

export default App;
