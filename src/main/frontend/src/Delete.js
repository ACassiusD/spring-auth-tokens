import React from 'react';
import axios from 'axios'; //Library to make request to spring backend
import Cookies from 'js-cookie'; //To pull auth token from cookies
import { Navigate } from "react-router-dom";


//Assets Component. Displays All assets. Also pulls in Create component, Delete Component, and Update Component.
//Class way of defining component lets us be able to use more stuff.
class Delete extends React.Component {

    constructor(props) {
        super(props);
        console.log("my props")
        console.log(props)
        this.state = {
            deleteID: 3,
            authorized: Boolean,
            message: ""
        };
        this.handleSubmit = this.handleSubmit.bind(this);
      }

    componentDidMount() {
        console.log("Mounted Create.js")
    }

    handleSubmit(event) {
        console.log(this.state.createName);
        event.preventDefault();
        var bearer = Cookies.get("token"); 
        // //WORKING CREATE CALL
        const response2 = axios({
            method: "post",
            url: 'http://localhost:8090/delete?id='+this.state.deleteID,
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
                this.setState({message : "Asset Deleted Successfully"})
            }else if(res.data.status == "Error"){
                this.setState({message : res.data.errorMessage})
            }
            console.log(res.data);
            console.log(res.data.status);
            this.props.onChange(123);
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
            <form onSubmit={this.handleSubmit}>
                <h1>DELETE ASSET BY ID</h1>
                <table>
                    <thead>
                        <tr>
                            <td>Asset ID</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                {/* Adding this onchange allows the state to update when input is changed. */}
                                <input type="text" id="fname" 
                                    value={this.state.deleteID}
                                    onChange={e => this.setState({deleteID: e.target.value})}>
                                </input>
                            </td>
                            <td><button type="submit" >Delete Asset</button></td>
                        </tr>
                    </tbody>
                </table>
                <div>{this.state.message}</div>
            </form>
          </div>
      )
  }
}

export default Delete;