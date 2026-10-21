import React, { Component } from 'react';


class NotFound extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( <div>
            <div className="bg-gradient-primary text-center" style={{ height: 800, paddingTop: "30vh" }}><h2 className="text-light"> Please Login to Continue </h2>
              <button className="btn btn-dark" onClick={() => this.props.history.push("/")}>Go Back to Login</button>
            </div>
        </div> );
    }
}
 
export default NotFound;