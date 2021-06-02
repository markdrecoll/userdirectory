import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from "react";
import API from './utils/API'

function App() {

  // create a state for user data
  const[userData, setUserData] = useState([
    {
    name: ""}
  ]);

  // create a state for inputted user data, initialize as empty string
  const[userInputData, setUserInputData] = useState("");

  // create a state for the filter
  const[userFilteredData, setUserFilteredData] = useState([{
    name: ""
  }]);
  
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

  return (
    <div className="App">

      {/* place for user to input text, on change event calls the onChangeHandler*/}
      <input
      type="text"
      id="userSortInput"
      onChange = {event => {onChangeHandler(event)}}
      value = {userInputData}
      />

      {/* display the data for only users who pass the filter */}
      {userFilteredData.map( (user) => {
        return(
        <p>
          {user.name.first}
        </p>
        )
      })}
      
    </div>
  );
}

export default App;
