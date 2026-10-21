import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import firebase from "firebase";
import moment, { months } from "moment-timezone";
import ct, { getTimezone } from "countries-and-timezones";
import Axios from 'axios';
import CurrencyMap from "country-currency-map";
import fx from "money";
import jsPDF from "jspdf";
import $ from "jquery"
import { PDFViewer, PDFDownloadLink } from '@react-pdf/renderer';
import { ScrollTo } from "react-scroll-to";
// import PDFDownloadLink from '@react-pdf/renderer';
import Test from "./Components/Test";

const Dashboard = (props) => {
    const [users, setUsers] = useState([]);
    const [name, setname] = useState("");
    const [email, setemail] = useState("");
    const [phoneNumber, setphoneNumber] = useState("");
    const [companyName, setcompanyName] = useState("");
    const [nic, setnic] = useState("");
    const [password, setpassword] = useState("");
    const [id, setid] = useState("");
    const [certificates, setcertificates] = useState([]);
    const [errorFlag, seterrorFlag] = useState(false);
    const [loading, setloading] = useState(true);
    //Testing
    const [zone, setzone] = useState("");
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

        
        setTimeout(() => {
            firebase
            .database()
            .ref("certificates")
            .on("value", (snap) => {
                if (snap.hasChildren()) {
                    let getData = getDesireDataWithKeys(snap.val());
                    setcertificates(getData);
                    console.log("SNAP", snap.val());
                    console.log("Certificates", getData);
                    setloading(false);
                }
                else {
                    window.alert("No Data Found")
                }
            })


            firebase
            .database()
            .ref("addStudent")
            .on("value", (snap) => {
                if (snap.hasChildren()) {
                    let getData = getDesireDataWithKeys(snap.val());
                    setUsers(getData);
                    console.log("SNAP", snap.val());
                    console.log("DATA", getData);
                }
                else {
                    window.alert("No Data Found")
                }
            })
        }, 5000);



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
        // hitTimeZonAPI("05:00");
        FinalApproach();
        // FinalFinalFinalCoversion()


        // console.log("From 24 to 12", tConvert('05:40'));
        var countryName = ct.getCountryForTimezone(sone).name;
        console.log("Country Name", countryName);
        // console.log("CURRENCY", Country[0][countryName]);
        console.log("FORmat", CurrencyMap.formatLocaleCurrency(5000, "USD"));

        fx.base = "PKR";
        fx.rates = {
            "USD": 0.0063,   // eg. 1 USD === 0.745101 EUR
            "INR": 0.46,     // etc...
            "PKR": 1,        // always include the base rate (1:1)
            /* etc */
        }
        var current = fx.convert(1, { from: "USD", to: "PKR" });

        console.log("Coco", current);
        hitTimeZonAPI();


        // console.log("CHECKING TIME", FinalFinalFinalCoversion("1:00 AM"))
        timeCopyMedium();
    }, []);


    useEffect(() => {
            if(errorFlag == true) {
                setTimeout(() => {
                    seterrorFlag(false)
                }, 3000);
        }
    })
    function timeCopyMedium() {
        // const d1 = new Date(2017, 2, 11, 10, 30);
        var sone = moment.tz.guess();
        const d1 = 1489210200000;
        const seoul = moment(d1).tz(sone);
        seoul.format(); // 2017-03-11T11:30:00+09:00
        console.log("MOMENT SCNENE", seoul.date(15).format("h:mm A"))
        // console.log("Lo Agaya Time", d1.getTime()); // 1489199400000
    }

    function generatePDF() {
        var doc = new jsPDF();
        var elementHTML = document.getElementById('page-top').innerHTML;
        var specialElementHandler = {
            '#editor': function () {
                return true;
            }
        }

        doc.fromHTML(elementHTML, 15, 15, {
            'width': 170,
            'elementHandlers': specialElementHandler
        })

        doc.save('sample.pdf');
    }
    const FinalApproach = () => {



        // var date = moment().format("YYYY-MM-DD");
        // var stamp = date + "T" + "05:00" + "Z";
        // var momentTime = moment("5:00 PM", "h:mm A");
        // var tzTime = momentTime.tz("turkey");
        // var formattedTime = tzTime.format('h:mm A');
        // console.log("Time in " + "Turkey" + ": " + formattedTime);

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

        var initialTime = new Date("11/20/2020, 5:00:00 PM");
        var n = "05:00";
        console.log("inintial Time Offset", n);

        const timezones = ct.getTimezonesForCountry('CA');
        console.log("Turkey", timezones);
        var timezoneGMT = timezones[0].utcOffsetStr


        const timezonesCurrent = ct.getTimezonesForCountry('PK');
        console.log("Pak", timezonesCurrent);
        var timezoneGMTCurrent = timezonesCurrent[0].utcOffsetStr

        console.log("inital", n)
        console.log("turkey", timezoneGMT)
        console.log("pakistan", timezoneGMTCurrent)
        var fTime = n - timezoneGMTCurrent + timezoneGMT
        console.log("F TIME", new Date(fTime)) //final time accroding to timezone
    }

    function AMTO24(times) {
        try {
            var time = times;
            debugger;
            var hours = Number(time.match(/^(\d+)/)[1]);
            var minutes = Number(time.match(/:(\d+)/)[1]);
            var AMPM = time.match(/\s(.*)$/)[1];
            if (AMPM == "PM" && hours < 12) hours = hours + 12;
            if (AMPM == "AM" && hours == 12) hours = hours - 12;
            var sHours = hours.toString();
            var sMinutes = minutes.toString();
            if (hours < 10) sHours = "0" + sHours;
            if (minutes < 10) sMinutes = "0" + sMinutes;
            // alert(sHours + ":" + sMinutes);
            return sHours + ":" + sMinutes;
        }
        catch (err) {
            debugger;
            return "0:00"
        }
    }

    function timeConvert(n) {
        var num = n;
        var hours = (num / 60);
        var rhours = Math.floor(hours);
        debugger;
        if (rhours.toString().length == 1) {
            debugger;
            rhours = "0" + rhours
        }
        var minutes = (hours - rhours) * 60;
        var rminutes = Math.round(minutes);
        if (rminutes == 0) {
            rminutes = "00"
        }
        console.log(num + " minutes = " + rhours + " hour(s) and " + rminutes + " minute(s).");
        return {
            rhours,
            rminutes
        }
    }
    function tConvert24to12(time) {
        debugger;
        // Check correct time format and split into components
        time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];
        debugger;
        if (time.length > 1) {
            // If time format correct
            time = time.slice(1);  // Remove full string match value
            time[5] = +time[0] < 12 ? ' AM' : ' PM'; // Set AM/PM
            time[0] = +time[0] % 12 || 12; // Adjust hours
            debugger;
        }
        return time.join(''); // return adjusted time or original string
    }
    const FinalFinalFinalCoversion = (time) => {
        debugger;
        var currentZone = moment.tz.guess();
        var TIME = AMTO24(time)
        var convertedTimeinMinutes = moment.duration(TIME).asMinutes();
        var makingTimeDifferenceZero = convertedTimeinMinutes - 300;
        var usersCountryOffset = moment().tz(currentZone).utcOffset();
        var timeinMinutes = makingTimeDifferenceZero + usersCountryOffset;
        var timeinHours = timeConvert(timeinMinutes);
        debugger;
        // if (timeinHours.rhours > 12) {
        var ActualConvertedTime = tConvert24to12(`${timeinHours.rhours}:${timeinHours.rminutes}`);
        // }
        // else {
        //     var ActualConvertedTime = timeinHours.rhours + ":" + timeinHours.rminutes + " AM"
        // }
        // console.log("Time Converted 24 to 12:", ActualConvertedTime)
        // console.log("Time in Minutes", timeinMinutes)
        // console.log("Time in Hours", timeinHours.rhours, timeinHours.rminutes)
        // console.log("User Country Offset", usersCountryOffset)
        // console.log("Converted Time in Minutes", convertedTimeinMinutes)
        // console.log("After Making Time Difference Zero", makingTimeDifferenceZero);
        // console.log("timein Hours", timeinHours.rhours, timeinHours.rminutes);
        return ActualConvertedTime
    }
    const hitTimeZonAPI = () => {
        Axios.get(`https://api.exchangeratesapi.io/latest?base=PKR`)
            .then((response) => {
                debugger;
                console.log(response.data);
                console.log(response.status);
                console.log(response.statusText);
                console.log(response.headers);
                console.log(response.config);
            })
            .catch((err) => {
                debugger;
            })
        // Axios.get(`https://timezone.abstractapi.com/v1/convert_time?api_key=f521074a6679415b9958ff205cf0ae19&base_location=Karachi&base_datetime=2020-05-01 ${time}&target_location=Istanbul`)
        //     .then((response) => {
        //         debugger;
        //         console.log(response.data);
        //         console.log(response.status);
        //         console.log(response.statusText);
        //         console.log(response.headers);
        //         console.log(response.config);
        //         return response.data.target_location.datetime
        //     })
        //     .catch((err) => {
        //         debugger;
        //     })
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
        return moment(time, "h:mm A").tz("Asia/Karachi").format("h:mm A");
    }


    const deleteData = (userId) => {
        debugger;
        let userRef = firebase
            .database()
            .ref('addStudent/' + userId);
        userRef.remove()
    }

    const updateData = () => {
        debugger;
        if (
            Object.is(name, "") ||
            Object.is(email, "") ||
            Object.is(nic, "") ||
            Object.is(phoneNumber, "") ||
            Object.is(companyName, "") 
          ){
            seterrorFlag(true);
          }
          else{
        firebase.database().ref('addStudent/' + id).set({
            name: name,
            email: email,
            phoneNumber: phoneNumber,
            nic: nic,
            companyName: companyName,
            password: password,
            type: "Member"
        });
    }
    }

    const editData = (userId) => {
        let filterData = users.filter(item => item.key == userId);
        console.log("Filter Data", filterData);
        setname(filterData[0].name)
        setnic(filterData[0].nic)
        setphoneNumber(filterData[0].phoneNumber)
        setcompanyName(filterData[0].companyName)
        setemail(filterData[0].email)
        setpassword(filterData[0].password)
        setid(userId)

    }
    const onChangeText = (e) => {
        e.preventDefault();
        setname(e.target.value)
    };

    const timingArray = [
        {
            day: "Monday",
            startTime: "5:00 PM",
            endTime: "5:40 PM"
        },
        {
            day: "Tuesday",
            startTime: "5:00 PM",
            endTime: "5:40 PM"
        },
        {
            day: "Wednesday",
            startTime: "5:00 PM",
            endTime: "5:40 PM"
        },
        {
            day: "Thursday",
            startTime: "5:00 PM",
            endTime: "5:40 PM"
        },
        {
            day: "Friday",
            startTime: "5:00 PM",
            endTime: "5:40 PM"
        },
    ]
    const changeLocation = (e) => {
        console.log(e.target.value);
        setzone(e.target.value);

    }
    const logOut = () => {
        debugger;
        localStorage.setItem("webToken" , '');
        props.history.push('/');
        window.location.reload();
    }
    // console.log("Countries", Country[0])
    console.log("Checking", __dirname);
    return (
        <div id="page-top">

            <div id="editor"></div>


            <div id="wrapper">

                <div class="container-fluid">
                    <div class="d-sm-flex align-items-center justify-content-between mb-4">
                        <h1 class="h3 mb-0 text-gray-800">Dashboard</h1>
                        {/* <button onClick={ReactPDF.render(<Test />, `${"D:\PowerBi\power-bi\public"}/example.pdf`)}><i
                            class="fas fa-download fa-sm text-white-50"></i> Generate Report</button> */}
                        {/* <PDFDownloadLink document={<Test />} fileName="fee_acceptance.pdf">
                            {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download now!')}
                        </PDFDownloadLink> */}
                    </div>

                    <div class="row">
                        <div class="col-xl-3 col-md-6 mb-4">
                            <div class="card border-left-primary shadow h-100 py-2">
                                <div class="card-body">
                                    <div class="row no-gutters align-items-center">
                                        <div class="col mr-2">
                                            <div class="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                                Total Members</div>
                                            <div class="h5 mb-0 font-weight-bold text-gray-800">{users.length}</div>
                                        </div>
                                        <div class="col-auto">
                                            <i class="fas fa-user fa-2x text-gray-300"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="col-xl-3 col-md-6 mb-4">
                            <div class="card border-left-success shadow h-100 py-2">
                                <div class="card-body">
                                    <div class="row no-gutters align-items-center">
                                        <div class="col mr-2">
                                            <div class="text-xs font-weight-bold text-success text-uppercase mb-1">
                                                Total Cerificates</div>
                                            <div class="h5 mb-0 font-weight-bold text-gray-800">{certificates.length}</div>
                                        </div>
                                        <div class="col-auto">
                                            <i class="fas fa-certificate fa-2x text-gray-300"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* <div class="col-xl-3 col-md-6 mb-4">
                            <div class="card border-left-info shadow h-100 py-2">
                                <div class="card-body">
                                    <div class="row no-gutters align-items-center">
                                        <div class="col mr-2">
                                            <div class="text-xs font-weight-bold text-info text-uppercase mb-1">Tasks
                                            </div>
                                            <div class="row no-gutters align-items-center">
                                                <div class="col-auto">
                                                    <div class="h5 mb-0 mr-3 font-weight-bold text-gray-800">50%</div>
                                                </div>
                                                <div class="col">
                                                    <div class="progress progress-sm mr-2">
                                                        <div class="progress-bar bg-info" role="progressbar"
                                                            // style="width: 50%" aria-valuenow="50" aria-valuemin="0"
                                                            aria-valuemax="100"></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-auto">
                                            <i class="fas fa-clipboard-list fa-2x text-gray-300"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> */}

                        {/* <div class="col-xl-3 col-md-6 mb-4">
                            <div class="card border-left-warning shadow h-100 py-2">
                                <div class="card-body">
                                    <div class="row no-gutters align-items-center">
                                        <div class="col mr-2">
                                            <div class="text-xs font-weight-bold text-warning text-uppercase mb-1">
                                                Pending Requests</div>
                                            <div class="h5 mb-0 font-weight-bold text-gray-800">18</div>
                                        </div>
                                        <div class="col-auto">
                                            <i class="fas fa-comments fa-2x text-gray-300"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> */}
                    </div>


                    <div class="row">

                        <div class="col-xl-12 col-lg-7">
                            <div class="card shadow mb-4">
                                <div
                                    class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                    <h6 class="m-0 font-weight-bold text-primary">Members Details</h6>
                                    {/* <div class="dropdown no-arrow">
                                        <a class="dropdown-toggle" href="#" role="button" id="dropdownMenuLink"
                                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            <i class="fas fa-ellipsis-v fa-sm fa-fw text-gray-400"></i>
                                        </a>
                                        <div class="dropdown-menu dropdown-menu-right shadow animated--fade-in"
                                            aria-labelledby="dropdownMenuLink">
                                            <div class="dropdown-header">Dropdown Header:</div>
                                            <a class="dropdown-item" href="#">Action</a>
                                            <a class="dropdown-item" href="#">Another action</a>
                                            <div class="dropdown-divider"></div>
                                            <a class="dropdown-item" href="#">Something else here</a>
                                        </div>
                                    </div> */}
                                </div>
                                <div class="card-body">
                                    {loading ? 
                                    <div className="text-center">
                                <div class="spinner-border mr-3" role="status">
                                            <span class="sr-only">Loading...</span>
                                        </div>
                                    </div>
                                    : 
                                    <table class="table">
                                        <thead>
                                            <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">Name</th>
                                                <th scope="col">Company Name</th>
                                                <th scope="col">Phone Number</th>
                                                <th scope="col">NIC</th>
                                                <th scope="col">Email</th>
                                                {/* <th scope="col">Password</th> */}
                                                <th scope="col">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {users.map((users, index) => (
                                                users.type !== "Admin" ?
                                                    <tr>
                                                        <th scope="row">{index + 1}.</th>
                                                        <td>{users.name}</td>
                                                        <td>{users.companyName}</td>
                                                        <td>{users.phoneNumber}</td>
                                                        <td>{users.nic}</td>
                                                        <td>{users.email}</td>
                                                        {/* <td>{users.password}</td> */}
                                                        <td>
                                                            {/* <a onClick={() => editData(users.key)} class="btn btn-outline-primary mr-2" data-toggle="modal" data-target="#editModal">Edit</a> */}
                                                            <Link class="btn btn-danger" onClick={() => deleteData(users.key)}>Delete</Link>
                                                        </td>
                                                    </tr> : null
                                            ))}
                                        </tbody>
                                    </table>
}
                                </div>
                            </div>
                        </div>
                        <div class="col-xl-12 col-lg-7">
                            <div class="card shadow mb-4">
                                <div
                                    class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                    <h6 class="m-0 font-weight-bold text-primary">Certificate Details</h6>
                                    {/* <div class="dropdown no-arrow">
                                        <a class="dropdown-toggle" href="#" role="button" id="dropdownMenuLink"
                                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            <i class="fas fa-ellipsis-v fa-sm fa-fw text-gray-400"></i>
                                        </a>
                                        <div class="dropdown-menu dropdown-menu-right shadow animated--fade-in"
                                            aria-labelledby="dropdownMenuLink">
                                            <div class="dropdown-header">Dropdown Header:</div>
                                            <a class="dropdown-item" href="#">Action</a>
                                            <a class="dropdown-item" href="#">Another action</a>
                                            <div class="dropdown-divider"></div>
                                            <a class="dropdown-item" href="#">Something else here</a>
                                        </div>
                                    </div> */}
                                </div>
                                
                                <div class="card-body">
                                {loading ? 
                                    <div className="text-center">
                                <div class="spinner-border mr-3" role="status">
                                            <span class="sr-only">Loading...</span>
                                        </div>
                                    </div>
                                    : 
                                    <div className="table-responsive">
                                    <table class="table">
                                        <thead>
                                            <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">Student Id</th>
                                                <th scope="col">Student Name</th>
                                                <th scope="col">Academic Year</th>
                                                <th scope="col">GPA</th>
                                                <th scope="col">Date Of Birth</th>
                                                <th scope="col">Certificate Type</th>
                                                <th scope="col">Department</th>
                                                <th scope="col">Certificate ID</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {certificates.map((users, index) => (

                                                <tr>
                                                    <th scope="row">{index + 1}.</th>
                                                    <td>{users.stdId}</td>
                                                    <td>{users.stdName}</td>
                                                    <td>{users.academicYear}</td>
                                                    <td>{users.gpa}</td>
                                                    <td>{users.dateOfBirth}</td>
                                                    <td>{users.certificateType}</td>
                                                    <td>{users.department}</td>
                                                    <td>{users.certificateId}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    </div>
}
                                </div>
                            </div>
                        </div>

                        {/* <div class="col-xl-4 col-lg-5">
                            <div class="card shadow mb-4">
                                <div
                                    class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                    <h6 class="m-0 font-weight-bold text-primary">Time Table <sup>{zone}</sup></h6>
                                </div>
                                <div class="card-body">
                                    <select class="browser-default custom-select" onChange={changeLocation} >
                                        <option selected>Open this select menu</option>
                                        {zonesNames.map((item, index) => (
                                            <option value={item} key={index}>{item}</option>
                                        ))}
                                    </select>
                                    <div class="pt-4 pb-2">
                                        <table className="table">
                                            <tbody>
                                                <tr>
                                                    <th colSpan="2">
                                                        Course Timetable <sup>({zone})</sup>
                                                    </th>
                                                </tr>
                                                <tr>

                                                    {timingArray.map((item, index) => (
                                                        <div key={index}>
                                                            <td style={{ padding: '5px 0px 5px 15px' }}>  <label>{item.day.slice(0, 3)}</label></td> <td style={{ padding: '5px 0' }}> <label className="ml-2">{FinalFinalFinalCoversion(item.startTime)} - {FinalFinalFinalCoversion(item.endTime)}</label> </td>
                                                        </div>
                                                    ))}
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>

                                </div>
                            </div>
                        </div> */}
                    </div>

                </div>

            </div>

            <a class="scroll-to-top rounded" href="#page-top">
                <i class="fas fa-angle-up"></i>
            </a>

            <div class="modal fade" id="logoutModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
                aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Ready to Leave?</h5>
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

            <div class="modal fade" id="editModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
                aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Edit Member Data?</h5> <br/>
                            {errorFlag ? <h6 class="text-danger" id="exampleModalLabel"> <br/> All Fields are required</h6> : null}
                            <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div class="modal-body"> <div className="form-group">
                            <div class="form-group">
                                <label>Name:</label>
                                <input type="text" class="form-control form-control-user"

                                    placeholder="Name"
                                    name="name"
                                    value={name}
                                    onChange={(e) => setname(e.target.value)} />
                            </div>
                            <div class="form-group">
                                <label>Company Name:</label>
                                <input type="text" class="form-control form-control-user"
                                    placeholder="Company Name"
                                    name="companyName"
                                    value={companyName}
                                    onChange={(e) => setcompanyName(e.target.value)} />
                            </div>
                            <div class="form-group">
                                <label>NIC:</label>
                                <input type="text" class="form-control form-control-user"
                                    placeholder="NIC"
                                    name="nic"
                                    value={nic}
                                    onChange={(e) => setnic(e.target.value)} />
                            </div>
                            <div class="form-group">
                                <label>Phone Number:</label>
                                <input type="number" class="form-control form-control-user"
                                    placeholder="Phone Number"
                                    name="phoneNumber"
                                    value={phoneNumber}
                                    onChange={(e) => setphoneNumber(e.target.value)} />
                            </div>
                            <div class="form-group">
                                <label>Email:</label>
                                <input type="email" class="form-control form-control-user"
                                    placeholder="Email"
                                    name="email"
                                    value={email}
                                    onChange={(e) => setemail(e.target.value)} />
                            </div>
                            <div class="form-group">
                                <label>Password:</label>
                                <input type="text" class="form-control form-control-user"
                                    placeholder="Password"
                                    name="password"
                                    value={password}
                                    onChange={(e) => setpassword(e.target.value)}
                                />
                            </div>
                        </div>
                        </div>
                        <div class="modal-footer">
                            <button class="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
                            <a class="btn btn-primary" onClick={updateData}>Update</a>
                        </div>
                    </div>
                </div>
            </div>



        </div>);
}

export default Dashboard;