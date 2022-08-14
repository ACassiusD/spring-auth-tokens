import './App.css';
import axios from 'axios'; //Library to make request to spring backend
import { useEffect, useState, Link} from 'react';
import { Navigate } from "react-router-dom";

//This is a funcional Component. For the login page.
//AKA the login component (should rename)
//It fetches the auth token via axios library communicating with spring.
//It redirects the user if they are authorized
const AuthToken = () => {
  
  //Setting the states for this component
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [authenticated, setAuthenticated] = useState(false);

  let handleSubmit = async (e) => {

    //prevent page refresh
    e.preventDefault(); 

    //Setting data to be passed in the request header.
    var data = {
      'username': username,
      'password': password
    }

    //WHY DOES MY AUTHENTICATE FUNCTION NOT GET EFFECTED BY CORS, BUT OTHERS DO??
    //Axios post to Spring backend.
    axios.post("http://localhost:8090/authenticate", data).then(res => {
      console.log(res.data);
      console.log(res.data.status);
      var statusCode = String(res.data.status);
      var errorString = String("Error");
      if(statusCode == errorString){
        setMessage(res.data.errorMessage);
      }else{
        document.cookie = "token=" + res.data.jwt //Probably shouldnt be set to a cookie.
        setAuthenticated(true)
      }
    })
    .catch((error) => {
      switch (error.response.status) {
        case 403:
            console.log("You are not authorized to access the site.");
        default:
            console.log(error.response);
            console.log(error.response.status);
     }
    });
  }

  
  //Prevent form submit from reloading page.
  const onClick = event => {
    event.preventDefault();
    console.log('form submitted ✅');
  };

  //This is the html the component renders.
  if(authenticated){
      return <Navigate replace to="/assets" />;
  } else{
    return (
      <div>
        <div>Login Page.</div>
        <form onSubmit={handleSubmit}> 
          <input type='username' name='username' placeholder='username...' value={username} onChange={(e) => setUsername(e.target.value)} required></input>
          <input type='password' name='password' placeholder='password...' value={password} onChange={(e) => setPassword(e.target.value)} required></input>
          <button type="submit">Log In</button>
          <div className='message'>{message ? <p>{message}</p> : null }</div>
        </form>
      </div>
    )
  }

}


// ROOT of our app. Calls the Login Component
function App() {
  return (
    <div className="App">
      <div>
      <AuthToken />
      </div>
    </div>
  );
}

export default App;
