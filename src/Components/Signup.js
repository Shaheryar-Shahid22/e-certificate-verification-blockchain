import React, { Component } from 'react';
import { Link } from "react-router-dom";
import "../App.css";
import firebase from 'firebase';
import $ from 'jquery';

class Signup extends Component {
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
            fieldColor: "text-danger",
            errorFlag: false,
            nicError: false,
            alreadyExistError: false
        }
    }
    componentDidUpdate(previousProps, previousState){
        debugger;
        if(previousState.password !== this.state.password && this.state.password.length >= 6) {
            this.setState({
                fieldColor: "text-success"
            })
        }
    }
    onChangeText = (e) => {
        e.preventDefault();
        this.setState({
            [e.target.name]: e.target.value,
        });
    };
    getDesireDataWithKeys = (data) => {
        let getData = [];
        let getKeys = Object.keys(data);
        getKeys.forEach((item) => {
            getData.push({ ...data[item], key: item });
        });
        return getData
    }
    addMember = (e) => {
        e.preventDefault();
        if (
            Object.is(this.state.name, "") ||
            Object.is(this.state.email, "") ||
            this.state.password.length < 6 ||
            Object.is(this.state.phoneNumber, "") ||
            Object.is(this.state.companyName, "")
        ) {
            this.setState({
                errorFlag: true
            })
        }
        else {
            if (this.state.nic.length == 13) {
                let data = {
                    name: this.state.name,
                    email: this.state.email,
                    phoneNumber: this.state.phoneNumber,
                    nic: this.state.nic,
                    companyName: this.state.companyName,
                    password: this.state.password,
                    type: "Member"
                };
                debugger;
                firebase.database().ref().child("addStudent").orderByChild("email").equalTo(this.state.email).once("value", snapshot => {
                    if (snapshot.exists()) {
                        const userData = snapshot.val();
                        debugger
                        console.log("exists!", userData);
                        this.setState({
                            alreadyExistError: true
                        })
                        $("#exampleModal").modal("show");
                    }
                    else {
                        firebase.database().ref().child("addStudent").push(data).then((success) => {
                            console.log("retrieve data", success);
                            // this.props.history.push('/dashboard')
                            debugger;
                        })
                        $("#successModal").modal("show");
                        firebase.auth()
                        .createUserWithEmailAndPassword(this.state.email, this.state.password)
                        .then(user => {
        
                                    debugger;
                                    if (user.user && user.user.emailVerified === false) {
                                        user.user.sendEmailVerification().then(function () {
                                            debugger;
        
                                        }).catch((aa) => {
                                            debugger;
                                            console.log(aa)
                                        });
                                    }
                        })
                        .catch(error => {
                            debugger;
                            console.log(error)
        
                            //console.log(error)
                        })
                    }
                });

            }
            else {
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
    // submitForm = (e) => {
    //     e.preventDefault();
    //     if (this.state.name !== "" && this.state.password !== "") {
    //         debugger;
    //         firebase.auth().signInWithEmailAndPassword(this.state.name, this.state.password)
    //             .then((snapshot) => {
    //                 debugger;
    //                 let currentUser = snapshot.user.uid;
    //                 console.log(snapshot.user.uid);
    //                 // this.props.currentUserId(snapshot.user.uid);
    //                 let that = this;
    //                 // return firebase.firestore().collection('userData').doc(currentUser).get().then(function (snapshot) {
    //                 //   console.log(snapshot);
    //                 //   if (snapshot.exists) {
    //                 //     console.log("Document data:", snapshot.data().userName);
    //                 //     // that.props.updateUserName(snapshot.data().userName);
    //                 //     that.setState({ email: "", password: "" })
    //                 //     that.setState({ loading: false });
    //                 that.props.history.push('/dashboard');
    //                 //   } else {
    //                 //   }
    //                 // });
    //             })
    //             .catch((err) => {
    //                 debugger;
    //                 console.log(err.message);
    //                 this.setState({ email: "", password: "" })
    //                 this.setState({ loading: false });
    //                 this.setState({ loginError: 'Invalid Email Address or Password' })
    //             })
    //     } else {
    //         this.setState({
    //             errorFlag: true,
    //         });
    //     }
    // };
    render() {
        return (
            <div className="App bg-gradient-primary">
                <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">Signup ERROR</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body text-center">
                                <div style={{ padding: "2vh 0" }}><i className="fas fa-frown fa-2x text-danger"></i></div>
                                <h6>This Email is already Exists</h6>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal fade" id="successModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">Signup SUCCESSFULLY</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body text-center">
                                <div style={{ padding: "3vh 0" }}><i className="fas fa-smile fa-3x text-success"></i></div>
                                <h6>Verification Email has been Sent</h6>
                                <Link to="/">
                                    <button className="btn btn-success">Login Now</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="container">

                    <div class="row justify-content-center">

                        <div class="col-xl-10 col-lg-12 col-md-9">

                            <div class="card o-hidden border-0 shadow-lg my-5 h-100">
                                <div class="card-body p-0">
                                    <div class="row h-100">
                                        <div class="col-lg-6 d-none d-lg-block bg-login-image"></div>
                                        <div class="col-lg-6">
                                            <div class="p-5">
                                                <div class="text-center">
                                                    <h1 class="h4 text-gray-900 mb-4">Signup Here!</h1>
                                                    {this.state.errorFlag ? <h6 className="text-danger">All Fields are Required</h6> : null}
                                                </div>
                                                <form class="user" onSubmit={this.addMember} >
                                                    <div class="form-group">
                                                        <input type="text" class="form-control form-control-user"
                                                            id="exampleInputEmail" aria-describedby="emailHelp"
                                                            placeholder="Enter Your Name" value={this.state.name}
                                                            onChange={this.onChangeText} name="name"
                                                        />
                                                    </div>
                                                    <div class="form-group">
                                                        <input type="text" class="form-control form-control-user"
                                                            id="exampleInputEmail" aria-describedby="emailHelp"
                                                            placeholder="Enter Company Name" value={this.state.companyName}
                                                            onChange={this.onChangeText} name="companyName"
                                                        />
                                                    </div>
                                                    <div class="form-group">
                                                        {this.state.nicError ? <label className="text-left text-danger" style={{fontSize: 12}}>*invalid NIC number</label> : null}
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
                                                    <div class="form-group">
                                                        <label className={this.state.fieldColor} style={{fontSize: 12}}>*Password should have minimum 6 characters</label>
                                                        <input type="text" class="form-control form-control-user"
                                                            id="exampleInputEmail" aria-describedby="emailHelp"
                                                            placeholder="Enter Password" value={this.state.password}
                                                            onChange={this.onChangeText} name="password"
                                                        />
                                                    </div>
                                                    <button type="submit" class="btn btn-primary btn-user btn-block">
                                                        Signup
                                                    </button>
                                                </form>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>

                </div>

            </div>
        );
    }
}

export default Signup;