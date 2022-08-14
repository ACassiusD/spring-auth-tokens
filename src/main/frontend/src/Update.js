import React from 'react';
import axios from 'axios'; //Library to make request to spring backend
import Cookies from 'js-cookie'; //To pull auth token from cookies
import { Navigate } from "react-router-dom";


//Assets Component. Displays All assets. Also pulls in Create component, Delete Component, and Update Component.
//Class way of defining component lets us be able to use more stuff.
class Update extends React.Component {

    constructor(props) {
        super(props);
        console.log("my props")
        console.log(props)
        this.state = {
            updateId : 10,
            updateName: "Upgfrtggfare",
            updateDescription: "Updated Description",
            updatePrice: 999.99,
            updateAssetTypeId: 2,
            updateDate: "1995-08-06",
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
            url: 'http://localhost:8090/update',
            headers: {
              "Content-Type": "application/json",
              "Authorization": "Bearer " + bearer,
            },
            data: {
                "id" : this.state.updateId,
                "name" : this.state.updateName,
                "description" : this.state.updateDescription,
                "price" : this.state.updatePrice,
                "date" : this.state.updateDate,
                "assetTypeId" : this.state.updateAssetTypeId
            },
          }).then(res => {
            if(res.data.status == "Success"){
                this.setState({message : "Asset Updated Successfully"})
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
                <h1>UPDATE ASSET</h1>
                <table>
                    <thead>
                        <tr>
                            <td>ID</td>
                            <td>Asset Type ID</td>
                            <td>Name</td>
                            <td>Description</td>
                            <td>Price</td>
                            <td>Date</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <input type="text" id="fname"  
                                value={this.state.updateId}
                                onChange={e => this.setState({updateId: e.target.value})}>
                                </input>
                            </td>
                            <td>
                            <input type="text" id="fname"  
                                value={this.state.updateAssetTypeId}
                                onChange={e => this.setState({updateAssetTypeId: e.target.value})}>
                                </input>
                            </td>
                            <td>
                            <input type="text" id="fname"  
                                value={this.state.updateName}
                                onChange={e => this.setState({updateName: e.target.value})}>
                                </input>                            </td>
                            <td>
                            <input type="text" id="fname"  
                                value={this.state.updateDescription}
                                onChange={e => this.setState({updateDescription: e.target.value})}>
                                </input>                            </td>
                            <td>
                            <input type="text" id="fname"  
                                value={this.state.updatePrice}
                                onChange={e => this.setState({updatePrice: e.target.value})}>
                                </input>                            </td>
                            <td>
                            <input type="text" id="fname"  
                                value={this.state.updateDate}
                                onChange={e => this.setState({updateDate: e.target.value})}>
                            </input>                            </td>
                            <td><button type="submit" >Update Asset</button></td>
                        </tr>
                    </tbody>
                </table>
                <div>{this.state.message}</div>
            </form>
          </div>
      )
  }
}

export default Update;