import React from 'react';
import axios from 'axios'; //Library to make request to spring backend

//You can define components as a function or a class. 
//Class lets us be able to use class Welcome extends React.Component {
class Assets extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: "testUserName",
            password: "testPassWord"
        };
      }

    componentDidMount() {
        // Call api, pass auth token via cookie, if it doesnt exist, redirect to login.
        console.log("Component has been rendered");

        var bearer = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhc3NldGFkbWluIiwiaWF0IjoxNjYwMzc4MTQ4LCJleHAiOjE2NjAzNzg3NDh9.bliDezrkRapT-s6GCOaOLcZ1yICuxI3ixPCA9rDKIeo";

        let headers =  {
              "Content-Type": "application/json",
              "Authorization": "Bearer " + bearer
        }

        //   //Axios post to Spring backend.
        //   axios.post(
        //     "http://localhost:8090/create", { 
        //         headers: headers //Auth header does not seem to be getting sent?
        //     }).then(res => {
        //     console.log(res.data);
        //     console.log(res.data.status);
        //     var statusCode = String(res.data.status);
        //     var errorString = String("Error");
        //   })
        //   .catch((error) => {
        //     switch (error.response.status) {
        //       case 403:
        //           console.log("You are not authorized to access the site.");
        //       default:
        //           console.log(error.response);
        //    }
        //   });


        const response = axios({
            method: "post",
            url: 'http://localhost:8090/create',
            headers: {
              "Content-Type": "application/json",
              "Authorization": "Bearer " + bearer,
            },
            data: {},
          }).then(res => {
            console.log(res.data);
            console.log(res.data.status);
            var statusCode = String(res.data.status);
            var errorString = String("Error");
          })
          .catch((error) => {
            switch (error.response.status) {
              case 403:
                  console.log("You are not authorized to access the site.");
              default:
                  console.log(error.response);
           }
          });
    }

    render(){
        return (
            <div>
                <p>{"test"}</p>
                <p>{this.state.username}</p>
                <p>{this.state.password}</p>
            </div>
        )
    };    
}

export default Assets;