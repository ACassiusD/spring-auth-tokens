import React from 'react';
import axios from 'axios'; //Library to make request to spring backend
import Cookies from 'js-cookie'; //To pull auth token from cookies
import { Navigate } from "react-router-dom";


//Assets Component. Displays All assets. Also pulls in Create component, Delete Component, and Update Component.
//Class way of defining component lets us be able to use more stuff.
class Create extends React.Component {

    constructor(props) {
        super(props);
        console.log("my props")
        console.log(props)
        this.state = {
            createName: "Super Software",
            createDescription: "Helps you do all the things",
            createPrice: 578.79,
            createAssetTypeId: 1,
            assetData: [],
            authorized: Boolean,
            message: ""
        };
        this.handleSubmit = this.handleSubmit.bind(this);
      }

    componentDidMount() {
        console.log("Mounted Create.js")
    }

    handleSubmit(event) {
        console.log("submitting");
        console.log(this.state.createName);
        event.preventDefault();
        console.log("test123")
        var bearer = Cookies.get("token"); 
        // //WORKING CREATE CALL
        const response2 = axios({
            method: "post",
            url: 'http://localhost:8090/create',
            headers: {
              "Content-Type": "application/json",
              "Authorization": "Bearer " + bearer,
            },
            data: {
                "name" : this.state.createName,
                "description" : this.state.createDescription,
                "price" : this.state.createPrice,
                "assetTypeId" : this.state.createAssetTypeId
            },
          }).then(res => {
            if(res.data.status == "Success"){
                this.setState({message : "Asset Created Successfully"})
            }else if(res.data.status == Error){
                this.setState({message : "There was an error creating the asset."})
            }
            console.log(res.data);
            console.log(res.data.status);
            this.props.onChange(123);
          })
          .catch((error) => {
            this.setState({message : "You are not authorized to access this resource."})
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
            <form onSubmit={this.handleSubmit}>
                <h1>CREATE ASSET</h1>
                <table>
                    <thead>
                        <tr>
                            <td>Name</td>
                            <td>Description</td>
                            <td>Price</td>
                            <td>Asset Type Id</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <input type="text" id="fname"  
                                    value={this.state.createName}
                                    onChange={e => this.setState({createName: e.target.value})}>
                                </input>                            
                            </td>
                            <td>
                                <input type="text" id="fname"  
                                    value={this.state.createDescription}
                                    onChange={e => this.setState({createDescription: e.target.value})}>
                                </input>                               </td>
                            <td>
                                <input type="text" id="fname"  
                                    value={this.state.createPrice}
                                    onChange={e => this.setState({createPrice: e.target.value})}>
                                </input>                               </td>
                            <td>
                                <input type="text" id="fname"  
                                    value={this.state.createAssetTypeId}
                                    onChange={e => this.setState({createAssetTypeId: e.target.value})}>
                                </input>                               </td>
                            <td><button type="submit" >Create Asset</button></td>
                        </tr>
                    </tbody>
                </table>
                <div>{this.state.message}</div>
            </form>
          </div>
      )
  }
}

export default Create;