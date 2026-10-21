import React, { Component } from "react";
import Ecertificate from '../abis/Ecertificate.json'
import firebase from "firebase";
import DatePicker from "react-datepicker";
import { sha256, sha224 } from 'js-sha256';
import moment from "moment";
import $ from 'jquery';
import Web3 from 'web3';

const ipfsClient = require('ipfs-http-client')
const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' }) // leaving out the arguments will default to these values


class AddCertificate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stdId: "",
            stdName: '',
            department: "",
            certificateId: "",
            dummyId: '',
            start: '',
            certificateType: "",
            academicYear: "",
            gpa: "",
            dateOfBirth: new Date("01-01-2003"),
            loader: false,
            errorFlag: false
        };
        this.addCertificate = this.addCertificate.bind(this)
    }
    getDesireDataWithKeys = (data) => {
        let getData = [];
        let getKeys = Object.keys(data);
        getKeys.forEach((item) => {
            getData.push({ ...data[item], key: item });
        });
        return getData
    }

    componentDidMount() {
        firebase
            .database()
            .ref("certificateId")
            .on("value", (snap) => {
                if (snap.hasChildren()) {
                    // let getData = getDesireDataWithKeys(snap.val());
                    // setUsers(getData);
                    console.log("SNAP", snap.val());
                    var str = snap.val();
                    var IdLastPart = parseInt(str["id"]) + 1;
                    console.log("DATA", IdLastPart);
                    
                    this.setState({
                        certificateId: str["start"] + "-" + IdLastPart,
                        dummyId: IdLastPart,
                        start: str["start"]
                    })
                    debugger;
                }
                else {
                    window.alert("No Data Found")
                }
            })
    }
    componentDidUpdate() {
        if (this.state.errorFlag == true) {
            setTimeout(() => {
                this.setState({
                    errorFlag: false
                })
            }, 3000);
        }
    }

    updateId = () => {
        // firebase.database().ref().child("certificateId").setValue("123");
        
        debugger;
    }

    async componentWillMount() {
        await this.loadWeb3()
        await this.loadBlockchainData()
      }
    
      async loadWeb3() {
        if (window.ethereum) {
          window.web3 = new Web3(window.ethereum)
          await window.ethereum.enable()
        }
        else if (window.web3) {
          window.web3 = new Web3(window.web3.currentProvider)
        }
        else {
          window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
        }
      }

      handleInputChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value,
        })
    }
    
      async loadBlockchainData() {
        const web3 = window.web3
        // Load account
        const accounts = await web3.eth.getAccounts()
        this.setState({ account: accounts[0] })
        // Network ID
        const networkId = await web3.eth.net.getId()
        const networkData = Ecertificate.networks[networkId]
        if(networkData) {
          // Assign contract
          const ecertificate = new web3.eth.Contract(Ecertificate.abi, networkData.address)
          this.setState({ ecertificate })
          }
        else {
          window.alert('Smart contract not deployed to detected network.')
        }
      }

      handleSubmit = (e) => {
        e.preventDefault();
        this.addCertificate();
    }

    addCertificate = (e) => {
        $("#successModal").modal("show");
        this.setState({
            loader: true
        })
        e.preventDefault();
        var initialData = {
            stdName: this.state.stdName,
            stdId: this.state.stdId,
            certificateType: this.state.certificateType,
            department: this.state.department,
        }
        if (
            Object.is(this.state.stdId, "") ||
            Object.is(this.state.stdName, "") ||
            Object.is(this.state.certificateType, "") ||
            Object.is(this.state.academicYear, "") ||
            Object.is(this.state.gpa, "") ||
            Object.is(this.state.dateOfBirth, "") ||
            Object.is(this.state.department, "")
        ) {
            this.setState({
                errorFlag: true,
                loader: false
            })
        }
        
        else {
            let data = {
                stdName: this.state.stdName,
                stdId: this.state.stdId,
                certificateType: this.state.certificateType,
                department: this.state.department,
                hashKey: sha256(JSON.stringify(initialData)),
                dateOfBirth: moment(this.state.dateOfBirth).format("YYYY-MM-DD"),
                gpa: this.state.gpa,
                academicYear: this.state.academicYear,
                certificateId: this.state.certificateId
            };

            firebase.database().ref('certificateId').set({
                "id": this.state.dummyId,
                "start": this.state.start
              });

            console.log(this.state);
              this.setState({ loading: true })
              this.state.ecertificate.methods.addCertificate(this.state.certificateId, this.state.stdId, this.state.stdName, this.state.certificateType, this.state.department).send({ from: this.state.account })
              .once('receipt', (receipt) => {
                  console.log(receipt);
                this.setState({ loading: false })
              })

            debugger;
            firebase.database().ref().child("certificates").push(data).then((success) => {
                console.log("retrieve data", success);
                setTimeout(() => {
                    $("#successModal").modal("hide");
                    this.props.history.push('/dashboard')
                }, 5000);
                debugger;
            })

        }



        // let newEmployees = this.state.users.users.concat([data]);
        // debugger;
        // localStorage.setItem("Users", JSON.stringify(newEmployees));
        // this.setState({
        //   users: newEmployees,
        // });
    };
    onChangeText = (e) => {
        debugger;
        e.preventDefault();
        this.setState({
            [e.target.name]: e.target.value,
        });
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
        console.log("SHAH 246", sha256('The quick brown fox jumps over the lazy dog')
        )
        console.log("CertificateId" , this.state.dateOfBirth);
        return (
            <div className="container-fluid">
                <div class="modal fade" id="successModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">Adding Certificate Data</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                                
                            </div>
                            <div class="modal-body text-center">
                                <div style={{ padding: "3vh 0" }}><i className="fas fa-spinner fa-3x text-success"></i></div>
                                <h3>Confirm Transaction on MetaMask...</h3>
                                {/* <Link to="/">
                                    <button className="btn btn-success">Login Now</button>
                                </Link> */}
                            </div>
                        </div>
                    </div>
                </div>
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
                                        <h1 class="h4 text-gray-900 mb-4">Add Certificate Data</h1>
                                    </div>
                                    <form class="user" onSubmit={this.addEmployee} >
                                        <div class="form-group">
                                            <input type="text" class="form-control form-control-user"
                                                id="exampleInputEmail" aria-describedby="emailHelp"
                                                placeholder="Certificate Id" value={this.state.certificateId}
                                                readOnly={true}
                                                onChange={this.onChangeText} name="stdId"
                                            />
                                        </div>
                                        <div class="form-group">
                                            <input type="number" class="form-control form-control-user"
                                                id="exampleInputEmail" aria-describedby="emailHelp"
                                                placeholder="Enter Student Id" value={this.state.stdId}
                                                onChange={this.onChangeText} name="stdId"
                                            />
                                        </div>
                                        <div class="form-group">
                                            <input type="text" class="form-control form-control-user"
                                                id="exampleInputEmail" aria-describedby="emailHelp"
                                                placeholder="Enter Student Name" value={this.state.stdName}
                                                onChange={this.onChangeText} name="stdName"
                                            />
                                        </div>
                                        <div class="form-group">
                                            <select class="browser-default custom-select" style={{ borderRadius: 20 }} onChange={this.onChangeText} name="certificateType">
                                                <option selected>Certificate Type</option>
                                                <option value="Degree">Degree</option>
                                                <option value="Diploma">Diploma</option>
                                                <option value="Character Certificate">Character Certificate</option>

                                            </select>
                                        </div>
                                        <div class="form-group">
                                        <select class="browser-default custom-select" style={{ borderRadius: 20 }} onChange={this.onChangeText} name="department">
                                                <option selected>Select Department</option>
                                                <option value="College Of Computer Science">College of Computer Science</option>
                                                <option value="College Of Management Science">College of Management Science</option>
                                                <option value="College Of Engineering">College of Engineering</option>
                                                <option value="College Of Media Arts">College of Media Arts</option>

                                            </select>
                                        </div>
                                        <div class="form-group">
                                            <input type="number" step="0000" class="form-control form-control-user"
                                                id="exampleInputEmail" aria-describedby="emailHelp"
                                                placeholder="Enter Academic Year" value={this.state.academicYear}
                                                onChange={this.onChangeText} name="academicYear"
                                            />
                                        </div>
                                        <div class="form-group">
                                            <input type="number" maxLength={3} step ="0.01" class="form-control form-control-user"
                                                id="exampleInputEmail" aria-describedby="emailHelp"
                                                placeholder="Enter GPA" value={this.state.gpa}
                                                onChange={this.onChangeText} name="gpa"
                                            />
                                        </div>
                                        <div class="form-group">
                                            <p>Enter Date Of Birth:</p>
                                            <br />
                                            <DatePicker
                                                selected={this.state.dateOfBirth}
                                                onChange={date => this.setState({ dateOfBirth: date })}
                                                maxDate={new Date("12-31-2003")}
                                                // selected={new Date("01-01-2003")}
                                            // showTimeSelect
                                            // dateFormat="Pp"
                                            />
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div class="col-md-12 text-right">
                                <div class="p-5">
                                    {this.state.loader ?
                                        <div class="spinner-border mr-3" role="status">
                                            <span class="sr-only">Loading...</span>
                                        </div>
                                        : null}
                                    <button type="submit" onClick={this.addCertificate} className="btn btn-dark">Submit Data </button>
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

export default AddCertificate;
