import React, { Component } from "react";
import firebase from "firebase";

class AddMember extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: '',
            nic: "",
            password: "",
            phoneNumber: "",
            companyName: '',
            stdId: "",
            cerId: "",
            certType: "",
            errorFlag: false,
            nicError: false
        };
    }
    componentDidUpdate(){
        if(this.state.nicError || this.state.errorFlag == true) {
            setTimeout(() => {
                this.setState({
                    nicError: false,
                    errorFlag: false
                })
            }, 3000);
        }
    }
    addEmployee = (e) => {
        e.preventDefault();
        if (
            Object.is(this.state.name, "") ||
            Object.is(this.state.email, "") ||
            Object.is(this.state.nic, "") ||
            Object.is(this.state.phoneNumber, "") ||
            Object.is(this.state.companyName, "") 
          ){
            this.setState({
                errorFlag: true
            })
          }
          else{
            if(this.state.nic.length == 13)
          {
        let data = {
            name: this.state.name,
            email: this.state.email,
            phoneNumber: this.state.phoneNumber,
            nic: this.state.nic,
            companyName: this.state.companyName,
            password: this.passwordGenerator(),
            type: "Member"
        };
        debugger;
        firebase.database().ref().child("addStudent").orderByChild("email").equalTo(this.state.email).once("value",snapshot => {
            if (snapshot.exists()){
              const userData = snapshot.val();
              debugger
              console.log("exists!", userData);
            }
            else {
              debugger
            }
        });
        firebase.database().ref().child("addStudent").push(data).then((success) => {
            console.log("retrieve data", success);
            this.props.history.push('/dashboard')
            debugger;
        })

    }
    else{
        this.setState({
            nicError: true
        })
    }

    }
        // let newEmployees = this.state.users.users.concat([data]);
        // debugger;
        // localStorage.setItem("Users", JSON.stringify(newEmployees));
        // this.setState({
        //   users: newEmployees,
        // });
    };
    onChangeText = (e) => {
        e.preventDefault();
        if(e.target.name == "nic"){
            if(e.target.value.length <= 13){
                this.setState({
                    [e.target.name]: e.target.value,
                });
            }
        }
        else{
            this.setState({
                [e.target.name]: e.target.value,
            });
        }
    };
    passwordGenerator = () => {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < 5; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }
    render() {
        return (

            <div className="container-fluid">
                <div class="card o-hidden border-0 shadow-lg my-5 h-100">
                    <div class="card-body p-0">
                        <div class="row h-100">
                            <div class="col-lg-12">
                                <div class="p-5">
                                {this.state.errorFlag ? 
                                    <div class="text-center">
                                        <h1 class="h4 text-danger mb-4">All fields are required</h1>
                                    </div>
                                    : null}
                                    <div class="text-left">
                                        <h1 class="h4 text-gray-900 mb-4">Add Member</h1>
                                    </div>
                                    <form class="user" onSubmit={this.addEmployee} >
                                        <div class="form-group">
                                            <input type="text" class="form-control form-control-user"
                                                id="exampleInputEmail" aria-describedby="emailHelp"
                                                placeholder="Enter Your Name" value={this.state.name}
                                                onChange={this.onChangeText} name="name"
                                            />
                                        </div>
                                        <div class="form-group">
                                            <input type="email" class="form-control form-control-user"
                                                id="exampleInputEmail" aria-describedby="emailHelp"
                                                placeholder="Enter Company Name" value={this.state.companyName}
                                                onChange={this.onChangeText} name="companyName"
                                            />
                                        </div>
                                        <div class="form-group">
                                           {this.state.nicError ? <label className="text-left text-danger">*invalid NIC number</label> : null}
                                            <input type="number" class="form-control form-control-user"
                                                id="exampleInputEmail" aria-describedby="emailHelp"
                                                placeholder="Enter Your NIC  e.g: 1234567891234" value={this.state.nic}
                                                onChange={this.onChangeText} name="nic"
                                            />
                                        </div>
                                        <div class="form-group">
                                            <input type="number" class="form-control form-control-user"
                                                id="exampleInputEmail" aria-describedby="emailHelp"
                                                placeholder="Enter Phone Number" value={this.state.phoneNumber}
                                                onChange={this.onChangeText} name="phoneNumber"
                                            />
                                        </div>
                                        <div class="form-group">
                                            <input type="email" class="form-control form-control-user"
                                                id="exampleInputEmail" aria-describedby="emailHelp"
                                                placeholder="Enter Email Address" value={this.state.email}
                                                onChange={this.onChangeText} name="email"
                                            />
                                        </div>

                                    </form>
                                </div>
                            </div>
                            <div class="col-lg-12 text-right">
                                <div class="p-5">
                                    <button type="submit" onClick={this.addEmployee} className="btn btn-dark
">Submit</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <div className="mx-auto shadow p-5">
                            <h1 class="h3 mb-0 text-gray-800">Dashboard</h1>
                            <form>
                                <div className="form-group">
                                    <input
                                        type="text"
                                        className="form-control form-control-lg"
                                        placeholder="Enter Student Name"
                                        name="name"
                                        value={this.state.name}
                                        onChange={this.onChangeText}
                                    />
                                </div>

                                <div className="form-group">
                                    <input
                                        type="text"
                                        className="form-control form-control-lg"
                                        placeholder="Enter Student ID"
                                        name="stdId"
                                        value={this.state.stdId}
                                        onChange={this.onChangeText}
                                    />
                                </div>
                                <div className="form-group">
                                    <input
                                        type="text"
                                        className="form-control form-control-lg"
                                        placeholder="Enter Certificate ID"
                                        name="cerId"
                                        value={this.state.cerId}
                                        onChange={this.onChangeText}
                                    />
                                </div>

                                <div className="form-group">
                                    <input
                                        type="text"
                                        className="form-control form-control-lg"
                                        placeholder="Enter Certificate Type"
                                        name="certType"
                                        value={this.state.certType}
                                        onChange={this.onChangeText}
                                    />
                                </div>

                                <button
                                    className="btn btn-outline-dark"
                                    onClick={this.addEmployee}
                                >
                                    Confirm
              </button>
                            </form>
                        </div> */}
            </div>

        );
    }
}

export default AddMember;
