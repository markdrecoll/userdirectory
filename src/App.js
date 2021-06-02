import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from "react";
import API from './utils/API'

function App() {

  const[userData, setUserData] = useState([
    {
    name: ""}
  ]);

  const[userInputData, setUserInputData] = useState("");

  const[userFilteredData, setUserFilteredData] = useState([{
    name: ""
  }]);

  useEffect( () => {
    API.getUserList().then( (users) => {
      setUserData(users.data.results);
      setUserFilteredData(users.data.results);
    });
  }, []);

  const onChangeHandler = (event) => {
    // console.log(event.target.value);
    setUserInputData(event.target.value);
    let tempFilter = userData.filter( (user) => {
      const values = Object.values(user)
      .join("")
      .toLowerCase();
      // console.log(user);
      return values.indexOf(userInputData.toLowerCase()) !== -1;
    })
    setUserFilteredData(tempFilter);
  }

  return (
    <div className="App">

      <input
      type="text"
      id="userSortInput"
      onChange = {event => {onChangeHandler(event)}}
      value = {userInputData}
      />

      <div>

      {userFilteredData.map( (user) => {

        // console.log(user.name.first);
        return(
        <p>
          {user.name.first}
        </p>
        )
      })}
      </div>

    </div>
  );
}

export default App;
