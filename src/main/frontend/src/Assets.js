import React from 'react';
import axios from 'axios'; //Library to make request to spring backend
import Cookies from 'js-cookie'; //To pull auth token from cookies
import { Navigate } from "react-router-dom";
import Create from './Create'
import Update from './Update'
import Delete from './Delete'

//Assets Component. Displays All assets. Also pulls in Create component, Delete Component, and Update Component.
//Class way of defining component lets us be able to use more stuff.
class Assets extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            assetData: [],
            authorized: Boolean,
            update: 1
        };
      }

    componentDidMount() {
        // Call api, pass auth token via cookie, if it doesnt exist, redirect to login.
        console.log("Component has been rendered");

        //Get the bearer token that was set in the cookies after the login page.
        var bearer = Cookies.get("token"); 

        let headers =  {
              "Content-Type": "application/json",
              "Authorization": "Bearer " + bearer
        }

        //WORKING GETASSETS CALL
        const response1 = axios({
          method: "get",
          url: 'http://localhost:8090/getAssets',
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + bearer,
          },
          data: {},
        }).then(res => {
          //Good response, should probably validate better.
          this.setState({authorized : true})
          var jsonAssets = res.data;
          this.setState({assetData : jsonAssets})
          console.log(this.state.assetData);
        })
        .catch((error) => {
          console.log("ERROR, SET AUTH STATE TO FALSE AND REDIRECT TO LOGIN.")
          this.setState({authorized : false})
          switch (error.response.status) {
            case 403:
                console.log("You are not authorized to access the site.");
            default:
                console.log(error.response);
         }
        });
    }

    render(){    
      if(!this.state.authorized && !this.state.authorized != null){
        return <Navigate replace to="/" />;
      }else{
        return (
          <div>
              <h1>ASSETS DATABASE</h1>
              <table>
                <thead>
                  <tr><td>Product Id.</td><td>Asset Type ID</td><td>Name</td><td>Description</td><td>Price</td><td>Date</td></tr>{/* HEADERS */}
                </thead>  
                <tbody>
                  {this.state.assetData.map(d => (<tr><td>{d.id}</td><td>{d.assetTypeId}</td><td>{d.name}</td><td>{d.description}</td><td>{d.price}</td><td>{d.date.substring(0,10)}</td></tr>))} 
                  </tbody>
              </table>
              {/* Pulling IN CREATE, UPDATE, DELETE COMPONENTS */}
              {/* REALODING THE PARENT STATE BY CALLING this.componentDidMount() again */}
                <Create onChange={() =>this.componentDidMount()}/> 
                <Update onChange={() =>this.componentDidMount()}/> 
                <Delete onChange={() =>this.componentDidMount()}/> 
          </div>
      )
    };  
  }
}

export default Assets;