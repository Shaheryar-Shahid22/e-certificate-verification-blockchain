import React, { Component } from 'react';


class AfterLogin extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    componentDidMount() {
        localStorage.setItem("webToken" , '');
        window.location.reload();
    }
    render() { 
        return ( <div>

        </div> );
    }
}
 
export default AfterLogin;