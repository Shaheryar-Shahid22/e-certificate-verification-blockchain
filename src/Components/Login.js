import React, { Component } from 'react';
import { Link } from "react-router-dom";
import "../App.css";
import firebase from 'firebase';
import $ from 'jquery'

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            password: "",
            errorFlag: false,
        }
    }
    componentDidMount() {
        localStorage.setItem("webToken", '');
        debugger;
        window.location.reload();
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
    componentDidMount() {
        $(".modal-backdrop").remove();
    }
    submitForm = (e) => {
        e.preventDefault();
        if (this.state.name !== "" && this.state.password !== "") {
            debugger;
            firebase.database()
                .ref("addStudent")
                .orderByChild("email")
                .equalTo(this.state.name)
                .on("value", (snap) => {
                    if (snap.hasChildren()) {
                        debugger;
                        let getData = this.getDesireDataWithKeys(snap.val());
                        if (getData[0].type == "Member" && getData[0].password == this.state.password) {
                            localStorage.setItem('webToken' , Math.floor(Math.random() * 450000000000000) + 1000000000000 );
                            this.props.history.push("/dashboard/Member");
                            window.location.reload();
                        }
                        else if (getData[0].type == "Admin" && getData[0].password == this.state.password) {
                            localStorage.setItem('webToken' , Math.floor(Math.random() * 450000000000000) + 1000000000000 );
                            this.props.history.push("/dashboard");
                            window.location.reload();
                        }
                        else {
                            console.log("Wrong Password!")
                            this.setState({
                                errorFlag: true,
                            })
                        }
                        console.log(getData);
                    }
                    else {
                        this.setState({
                            errorFlag: true,
                        })
                    }
                })


        } else {
            this.setState({
                errorFlag: true,
            });
        }
    };
    // submitForm = (e) => {
    //     e.preventDefault();
    //     if (this.state.name !== "" && this.state.password !== "") {
    //         debugger;
    //         firebase.auth()
    //             .createUserWithEmailAndPassword(this.state.name, this.state.password)
    //             .then(user => {

    //                         debugger;
    //                         if (user.user && user.user.emailVerified === false) {
    //                             user.user.sendEmailVerification().then(function () {
    //                                 debugger;

    //                             }).catch((aa) => {
    //                                 debugger;
    //                                 console.log(aa)
    //                             });
    //                         }
    //             })
    //             .catch(error => {
    //                 console.log(error)

    //                 //console.log(error)
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
                                                    <h1 class="h4 text-gray-900 mb-4">Welcome to E-Certificate Verification</h1>
                                                    {this.state.errorFlag ? <h6 className="text-danger">Invalid Email or Password</h6> : null}
                                                </div>
                                                <form class="user" onSubmit={this.submitForm} >
                                                    <div class="form-group">
                                                        <input type="email" class="form-control form-control-user"
                                                            id="exampleInputEmail" aria-describedby="emailHelp"
                                                            placeholder="Enter Email Address..." value={this.state.name}
                                                            onChange={this.onChangeText} name="name"
                                                        />
                                                    </div>
                                                    <div class="form-group">
                                                        <input type="password" class="form-control form-control-user"
                                                            id="exampleInputPassword" placeholder="Password" value={this.state.password}
                                                            onChange={this.onChangeText} name="password"
                                                        />
                                                    </div>
                                                    <div class="form-group">
                                                        <div class="custom-control custom-checkbox small">
                                                            <input type="checkbox" class="custom-control-input" id="customCheck" />
                                                            <label class="custom-control-label" for="customCheck">Remember
                                                        Me</label>
                                                        </div>
                                                    </div>

                                                    <button type="submit" class="btn btn-primary btn-user btn-block">
                                                        Login
                                                    </button>
                                                    {/* <hr />
                                                    <a href="index.html" class="btn btn-google btn-user btn-block">
                                                        <i class="fab fa-google fa-fw"></i> Login with Google
                                            </a>
                                                    <a href="index.html" class="btn btn-facebook btn-user btn-block">
                                                        <i class="fab fa-facebook-f fa-fw"></i> Login with Facebook
                                            </a> */}
                                                </form>
                                                {/* <hr />
                                                <div class="text-center">
                                                    <a class="small" href="forgot-password.html">Forgot Password?</a>
                                                </div> */}
                                                <Link to="/Signup">
                                                    <div class="text-center mt-2">
                                                        <a class="small">Signup for an account!</a>
                                                    </div>
                                                </Link>
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

export default Login;