import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import firebase from "firebase";
import moment from "moment-timezone";
import ct from "countries-and-timezones";
import $ from 'jquery';


const MemberDashboard = (props) => {
    const [erroFlag, seterroFlag] = useState(false);
    const [foundFlag, setfoundFlag] = useState(false);
    const [filterData, setfilterData] = useState([]);
    const [stdId, setstdId] = useState("");
    const [certificateId, setcertificateId] = useState("");
    const [certificateType, setcertificateType] = useState("");
    const [isLoading, setisLoading] = useState(false);


    //Testing
    const [zone, setzone] = useState("Asia/Karachi");
    const [zonesNames, setzonesNames] = useState([]);

    //End Testing
    const getDesireDataWithKeys = (data) => {
        let getData = [];
        let getKeys = Object.keys(data);
        getKeys.forEach((item) => {
            getData.push({ ...data[item], key: item });
        });
        return getData
    }
    useEffect(() => {




        var sone = moment.tz.guess();
        setzonesNames(moment.tz.names());
        setzone(sone);
        // console.log("Current Time Zone", sone);
        // console.log("Time of that Region", moment("5:00 PM", "h:mm a").tz("Europe/Istanbul").format("h:mm a"));

        // var makeData = new Date("October 13, 2014 5:40:00 PM").toLocaleString("en-US", { timeZone: "Turkey" })
        var makeDate = moment.utc("5:40:00 PM", "h:mm A").tz("Turkey")
        console.log("Current Time Zone", sone);
        // console.log("Actual Date", makeData);
        // console.log("Make Date", moment(makeData).format("h:mm A"));
        console.log("Make Date", makeDate.format());

        var newmakeDate = new Date();
        console.log("Offset of Current Zone", newmakeDate.getTimezoneOffset());

        // window.alert(calcTime('PAK', -300));


        var date = new Date("2019-04-29 06:12:06Z");

        var withoutUTC = moment(date).toString();
        var withUTC = moment.utc(date).toString();
        console.log(withoutUTC)
        console.log(withUTC)
        // console.log("UTC TIME", date);
        // console.log("LOCAL TIME", date.toLocaleString());
        newTimeLogic();



        var now = moment.tz("TR");
        var localOffset = now.utcOffset();
        now.tz("Asia/Karachi"); // your time zone, not necessarily the server's
        var centralOffset = now.utcOffset();
        var diffInMinutes = localOffset - centralOffset;
        console.log("Different Minutes", diffInMinutes);


        FinalApproach();
    }, []);

    const FinalApproach = () => {
        var date = moment().format("YYYY-MM-DD");
        var stamp = date + "T" + "05:00" + "Z";
        var momentTime = moment("5:00 PM", "h:mm A");
        var tzTime = momentTime.tz("turkey");
        var formattedTime = tzTime.format('h:mm A');
        console.log("Time in " + "Turkey" + ": " + formattedTime);

    }

    const newTimeLogic = () => {
        let TIME = "11/20/2020, 5:00:00 PM";
        var sone = moment.tz.guess();
        let NEWDATE = new Date(TIME).toLocaleString('en-US', {
            timeZone: "Asia/Karachi"
        });
        // ;
        console.log("NEW DATA", NEWDATE);
        // TIME = moment(TIME, "h:mm a").tz("turkey").format("h:mm a")
        // console.log("fufufuf", TIME)
        // console.log("Changing Time : ", moment(TIME, "h:mm a").tz("Turkey").format("h:mm a"));

        // const countries = ct.getAllCountries();
        // console.log(countries);

        var initialTime = "1:00"
        const timezones = ct.getTimezonesForCountry('TR');
        console.log("Turkey", timezones);
        var timezoneGMT = timezones[0].utcOffsetStr


        const timezonesCurrent = ct.getTimezonesForCountry('PK');
        console.log("Pak", timezonesCurrent[0].utcOffsetStr);
        var timezoneGMTCurrent = timezonesCurrent[0].utcOffsetStr

        console.log("inital", initialTime)
        console.log("turkey", timezoneGMT)
        console.log("pakistan", timezoneGMTCurrent)
        initialTime = initialTime - timezoneGMTCurrent + timezoneGMT
        console.log("F TIME", initialTime) //final time accroding to timezone
    }

    function calcTime(city, offset) {

        // create Date object for current location
        var d = new Date();

        // convert to msec
        // add local time zone offset
        // get UTC time in msec
        var utc = d.getTime() + (d.getTimezoneOffset() * 60000);

        // create new Date object for different city
        // using supplied offset
        var nd = new Date(utc + (3600000 * offset));

        // return time as a string
        return "The local time in " + city + " is " + nd.toLocaleString();

    }
    const changeTimeZoneLocation = (time) => {
        var sone = moment.tz.guess();
        return moment(time, "h:mm A").tz(zone).format("h:mm A");
    }


    const deleteData = (userId) => {
        debugger;
        let userRef = firebase
            .database()
            .ref('addStudent/' + userId);
        userRef.remove()
    }



    const timingArray = [
        {
            day: "Monday",
            startTime: "5 PM",
            endTime: "5:40 PM"
        },
        {
            day: "Tuesday",
            startTime: "5 PM",
            endTime: "5:40 PM"
        },
        {
            day: "Wednesday",
            startTime: "5 PM",
            endTime: "5:40 PM"
        },
        {
            day: "Thursday",
            startTime: "5 PM",
            endTime: "5:40 PM"
        },
        {
            day: "Friday",
            startTime: "5 PM",
            endTime: "5:40 PM"
        },
    ]
    const changeLocation = (e) => {
        console.log(e.target.value);
        setzone(e.target.value);

    }

    const submitForm = (e) => {
        e.preventDefault();
        $("#successModal").modal("show");
        setisLoading(true);
        seterroFlag(false);
        setfoundFlag(false);
        setTimeout(() => {
            if (certificateId !== "") {
                debugger;
                firebase.database()
                    .ref("certificates")
                    .orderByChild("certificateId")
                    .equalTo(certificateId)
                    .on("value", (snap) => {
                        if (snap.hasChildren()) {
                            debugger;
                            let getData = getDesireDataWithKeys(snap.val());
                            const found = getData.some(el => el.certificateId === certificateId);
                            if (found) {
                                setfoundFlag(true)
                                seterroFlag(false)
                            }
                            else {
                                seterroFlag(true)
                                setfoundFlag(false)

                            }
                            console.log(getData);
                            var filterData = getData.filter(item => item.certificateId == certificateId);
                            setfilterData(filterData);
                        }
                        else {
                            seterroFlag(true)
                            setfoundFlag(false)

                        }
                    })


            } else {
                seterroFlag(true)
            }
            $("#successModal").modal("hide");
            setisLoading(false);
        }, 6000);
    };
    const logOut = () => {
        debugger;
        localStorage.setItem("webToken", '');
        props.history.push('/');
        window.location.reload();
    }
    console.log("FILTER DATA", filterData);
    return (
        <div id="page-top" >


            <div id="wrapper">

                <div class="container-fluid">
                <div class="modal fade" id="successModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">Verifying The Data</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body text-center">
                                <div style={{ padding: "3vh 0" }}><i className="fas fa-spinner fa-3x text-success"></i></div>
                                <h3>Searching Data...</h3>
                                {/* <Link to="/">
                                    <button className="btn btn-success">Login Now</button>
                                </Link> */}
                            </div>
                        </div>
                    </div>
                </div>
                    <div class="d-sm-flex align-items-center justify-content-between mb-4">
                        <h1 class="h3 mb-0 text-gray-800">Member Dashboard</h1>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-md-4">
                            <div class="form-group">
                                <label className="font-weight-bold" style={{ color: "#2C53C5" }}>Enter the Certificate ID:</label>
                                <input type="text" class="form-control form-control-user"
                                    placeholder="Enter Certificate ID here.."
                                    name="stdId"
                                    value={certificateId}
                                    onChange={(e) => setcertificateId(e.target.value)}
                                />
                            </div>
                        </div>
                        {/* <div className="col-md-4">
                            <div class="form-group">
                                <label className="font-weight-bold" style={{ color: "#2C53C5" }}>Select Certificate Type:</label>
                                <select class="browser-default custom-select" onClick={(e) => setcertificateType(e.target.value)}
                                    name="certificateType">
                                    <option selected>Certificate Type</option>
                                    <option value="Degree" >Degree</option>
                                    <option value="Character Certificate">Character Certificate</option>
                                </select>
                            </div>
                        </div> */}
                        <div className="col-md-12 text-center">
                            <button className="btn btn-primary" onClick={submitForm}>Click to VERIFY</button>
                        </div>
                    </div>
                    <br />
                    <br />
                    <br />
                    {isLoading ? <div className="text-center"> <div class="spinner-border mr-3" role="status">
                        <span class="sr-only">Loading...</span>
                    </div>
                    </div>
                        :
                        foundFlag ?
                            <div className="row justify-content-center">
                                <div className="col-md-8 text-center">
                                    <div class="card shadow-sm">
                                        <div class="card-body">
                                            <label className="text-success font-weight-bold"> Verified <i className="fas fa-check-circle fa-2x"></i> </label><br />
                                            <div className="font-weight-bold border"> </div>
                                            <br />
                                            {filterData.length > 0 ?
                                                <div className="row text-left" style={{ fontSize: 18 }}>
                                                    <div className="col-md-6">
                                                    <label className="">ID: <span className="font-weight-bold">{filterData[0].stdId} </span></label>
                                                    <br />
                                                    <label className="">Name: <span className="font-weight-bold">{filterData[0].stdName} </span></label>
                                                    <br />
                                                    <label className="">GPA: <span className="font-weight-bold">{filterData[0].gpa} </span></label>
                                                    <br />
                                                    <label className="">Department: <span className="font-weight-bold">{filterData[0].department} </span></label>
                                                    </div>
                                                    <div className="col-md-6">
                                                    <label className="">Certificate Type: <span className="font-weight-bold">{filterData[0].certificateType} </span></label>
                                                    <label className="">Academic Year: <span className="font-weight-bold">{filterData[0].academicYear} </span></label>
                                                    <label className="">Date Of Birth: <span className="font-weight-bold">{filterData[0].dateOfBirth} </span></label>
                                                    </div>
                                                </div>
                                                : null}
                                            <br />
                                            {filterData.length > 0 ?
                                                <div className="border" style={{ fontSize: 18 }}>
                                                    <label className="text-primary font-weight-bold">Hash Value</label><br />
                                                    <label className="text-dark">{filterData[0].hashKey}</label>
                                                </div>
                                                : null}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            : null}
                    {erroFlag ?
                        <div className="row justify-content-center">
                            <div className="col-md-6 text-center">
                                <div class="card shadow-sm">
                                    <div class="card-body">
                                        <label className="text-danger font-weight-bold"> No Data Found in the Blockchain Network <i className="fas fa-times-circle fa-2x"></i> </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        : null}
                </div>
                <div class="modal fade" id="logoutModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
                    aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">Want to Leave?</h5>
                                <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <div class="modal-body">Select "Logout" below if you are ready to end your current session.</div>
                            <div class="modal-footer">
                                <button class="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
                                <a class="btn btn-primary" onClick={logOut}>Logout</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >);
}

export default MemberDashboard;