import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from "react";
import API from './utils/API'

function App() {

  // create a state for user data
  const[userData, setUserData] = useState([]);

  // create a state for inputted user data, initialize as empty string
  const[userInputData, setUserInputData] = useState("");

  // create a state for the filter
  const[userFilteredData, setUserFilteredData] = useState([]);
  
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

  // sorts each user based on what is being compared
  const sortAlpha = (event) => {

    // first name, last name, and age have prefixes in their data, name and dob respectively
    let prefixToUserData = "name";

    // the button events pass in the id name
    let typeOfUserData = event.target.id;
    
    // the switch cases change it to dob, or blank, the default is set as name above
    switch(typeOfUserData){
      case "email":
        prefixToUserData = "";
        break;
      case "phone":
        prefixToUserData = "";
        break;
      case "age":
        prefixToUserData = "dob";
        break;      
    }

    // if one user's attribute is alaphabetically before or after, sort accordingly
    function compare( a, b ) {

      // if the prefis is name or dob that is passed in before the event.target.id
      if(prefixToUserData==="name" || prefixToUserData==="dob"){
        if ( a[prefixToUserData][event.target.id] < b[prefixToUserData][event.target.id] ){return -1;}
        if ( a[prefixToUserData][event.target.id] > b[prefixToUserData][event.target.id] ){return 1;}
        return 0;
      // for email and phone there is no prefix, so just pass in event.target.id
      }else{
        if ( a[event.target.id] < b[event.target.id] ){return -1;}
        if ( a[event.target.id] > b[event.target.id] ){return 1;}
        return 0;
      }
    }

    // set the userFilteredData that gets output to the new array
    var newArray = userFilteredData.sort(compare);
    setUserFilteredData([...newArray]);
  }

  return (
    <div className="App">
      <h2>User Information</h2>

      {/* place for user to input text, on change event calls the onChangeHandler*/}
      <p>Type in information, and only fields that contain it will be displayed.</p>
      <input
      type="text"
      id="userSortInput"
      onChange = {event => {onChangeHandler(event)}}
      value = {userInputData}
      />
      <br /><br />

      {/* display the data for only users who pass the filter */}
      <table>
        <thead>
      <tr>
        <th>Picture</th>
        <th>First Name</th>
        <th>Last Name</th>
        <th>Email</th>
        <th>Phone Number</th>
        <th>Age</th>
      </tr>
      <tr>
        <th></th>
        {/* each button has an id for what will be sorted in the sortAlpha function */}
        <th><button class="btn btn-secondary btn-sm" onClick={event => {sortAlpha(event)}} id="first">Sort First Name</button></th>
        <th><button class="btn btn-secondary btn-sm" onClick={event => {sortAlpha(event)}} id="last">Sort Last Name</button></th>
        <th><button class="btn btn-secondary btn-sm" onClick={event => {sortAlpha(event)}} id="email">Sort Email</button></th>
        <th><button class="btn btn-secondary btn-sm" onClick={event => {sortAlpha(event)}} id="phone">Sort Phone Number</button></th>
        <th><button class="btn btn-secondary btn-sm" onClick={event => {sortAlpha(event)}} id="age">Sort Age</button></th>
      </tr>
      </thead>
      <tbody>
      {userFilteredData.map( (user) => {
        return(
        <tr key={user.email}>
          <td><img src={user.picture.thumbnail} alt="user_thumbnail"></img></td>
          <td>{user.name.first}</td>
          <td>{user.name.last}</td>
          <td>{user.email}</td>
          <td>{user.phone}</td>
          <td>{user.dob.age}</td>
        </tr>
        )
        
      })}
      </tbody>
      </table>
      
    </div>
  );
}

export default App;
