import React from 'react';
import Page from '../Page';
import Test from "../Components/Test";
import { PDFViewer, PDFDownloadLink } from '@react-pdf/renderer';

const MultiPage = ({ id }) => {

    const PrintContent = (el) => {
        var restorepage = document.body.innerHTML;
        var Printcontent = document.getElementById(el).innerHTML;
        document.body.innerHTML = Printcontent;
        window.print();
        document.body.innerHTML = restorepage;
        window.location.reload();
    }
    const printFunc = () => {
        window.print();
    }
    return (
        <Page id={id}><div className="container">
            <PDFViewer style={{ height: 1000, width: 800 }}>
                <Test />
            </PDFViewer>
            <div class='printme'>
                Print this only
            </div>
            <div class="no-printme">
                <h1 class="no-printme"> do not print this </h1>



                <button onClick={printFunc}>Print only the above div</button>
                <button className="btn btn-dark" onClick={() => PrintContent("div1")}>Print</button>
                <div className="row" id="div1">
                    <div className="col-md-12">
                        <h4>Assessment Report</h4>
                        <h5>Paul Lisa Christiana</h5>
                        <label>17 November 2020</label> <br />
                        <label>12:35 PM</label>
                    </div>
                    <div className="col-md-12">
                        <table class="table">
                            <thead className="headCol">
                                <tr className="">
                                    <th scope="col" style={{ width: 2000 }}>Core Competency</th>
                                    <th scope="col" style={{ width: 0 }}>SR</th>
                                    <th scope="col" style={{ width: 0 }}>SR</th>
                                    <th scope="col" style={{ width: 0 }}>AV</th>
                                    <th scope="col" style={{ width: 0 }}>RPL</th>
                                    <th scope="col" style={{ width: 0 }}>DME</th>
                                    <th scope="col" style={{ width: 0 }}>80%</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th scope="row">--</th>
                                    <td>--</td>
                                    <td>--</td>
                                    <td>--</td>
                                    <td>--</td>
                                    <td>--</td>
                                    <td>--</td>
                                </tr>
                            </tbody>
                        </table>
                        <table className="table">
                            <thead class="thead-light">
                                <tr>
                                    <th scope="col">Customer Focus</th>
                                    <th scope="col">3</th>
                                    <th scope="col">2</th>
                                    <th scope="col">2.5</th>
                                    <th scope="col">3</th>
                                    <th scope="col">D</th>
                                    <th scope="col">83%</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th scope="row">--</th>
                                    <td>--</td>
                                    <td>--</td>
                                    <td>--</td>
                                    <td>--</td>
                                    <td>--</td>
                                    <td>--</td>
                                </tr>
                            </tbody>
                            <br />
                            <thead class="thead-light">
                                <tr>
                                    <th scope="col">Working with Others</th>
                                    <th scope="col">3</th>
                                    <th scope="col">1</th>
                                    <th scope="col">2</th>
                                    <th scope="col">3</th>
                                    <th scope="col">D</th>
                                    <th scope="col">67%</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th scope="row">Solicits the cooperation of members in othetr offices or department whose work benerfiodtd of depermn on ones reposnsibilty adn aor funtoinc</th>
                                    <td>4</td>
                                    <td>--</td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <th scope="row">Solicits the cooperation of members in othetr offices or department whose work benerfiodtd of depermn on ones reposnsibilty adn aor funtoinc</th>
                                    <td>4</td>
                                    <td>--</td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <th scope="row">Solicits the cooperation of members in othetr offices or department whose work benerfiodtd of depermn on ones reposnsibilty adn aor funtoinc</th>
                                    <td>4</td>
                                    <td>--</td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <th scope="row">Solicits the cooperation of members in othetr offices or department whose work benerfiodtd of depermn on ones reposnsibilty adn aor funtoinc</th>
                                    <td>4</td>
                                    <td>--</td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                            </tbody>
                            <br />
                            <thead class="thead-light">
                                <tr>
                                    <th scope="col">Customer Focus</th>
                                    <th scope="col">3</th>
                                    <th scope="col">2</th>
                                    <th scope="col">2.5</th>
                                    <th scope="col">3</th>
                                    <th scope="col">D</th>
                                    <th scope="col">83%</th>
                                </tr>
                            </thead>
                            <br />
                            <thead class="thead-light">
                                <tr>
                                    <th scope="col">Customer Focus</th>
                                    <th scope="col">3</th>
                                    <th scope="col">2</th>
                                    <th scope="col">2.5</th>
                                    <th scope="col">3</th>
                                    <th scope="col">D</th>
                                    <th scope="col">83%</th>
                                </tr>
                            </thead>
                            <br />
                            <thead class="thead-light">
                                <tr>
                                    <th scope="col">Customer Focus</th>
                                    <th scope="col">3</th>
                                    <th scope="col">2</th>
                                    <th scope="col">2.5</th>
                                    <th scope="col">3</th>
                                    <th scope="col">D</th>
                                    <th scope="col">83%</th>
                                </tr>
                            </thead>

                            <br />

                        </table>
                        <table class="table changePage">
                            <thead className="headCol">
                                <tr className="vendorListHeading">
                                    <th scope="col">CORE COMPETENCY</th>
                                    <th scope="col">Self Rating</th>
                                    <th scope="col">Supervisor Rating</th>
                                    <th scope="col">Average Score</th>
                                    <th scope="col">RPL</th>
                                    <th scope="col">DME</th>
                                    <th scope="col">80%</th>
                                </tr>
                            </thead>
                        </table>
                        <table className="table">
                            <thead class="thead-light">
                                <tr>
                                    <th scope="col">Customer Focus</th>
                                    <th scope="col">3</th>
                                    <th scope="col">2</th>
                                    <th scope="col">2.5</th>
                                    <th scope="col">3</th>
                                    <th scope="col">D</th>
                                    <th scope="col">83%</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th scope="row">--</th>
                                    <td>--</td>
                                    <td>--</td>
                                    <td>--</td>
                                    <td>--</td>
                                    <td>--</td>
                                    <td>--</td>
                                </tr>
                            </tbody>
                            <br />
                            <thead class="thead-light">
                                <tr>
                                    <th scope="col">Working with Others</th>
                                    <th scope="col">3</th>
                                    <th scope="col">1</th>
                                    <th scope="col">2</th>
                                    <th scope="col">3</th>
                                    <th scope="col">D</th>
                                    <th scope="col">67%</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th scope="row">Solicits the cooperation of members in othetr offices or department whose work benerfiodtd of depermn on ones reposnsibilty adn aor funtoinc</th>
                                    <td>4</td>
                                    <td>--</td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <th scope="row">Solicits the cooperation of members in othetr offices or department whose work benerfiodtd of depermn on ones reposnsibilty adn aor funtoinc</th>
                                    <td>4</td>
                                    <td>--</td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <th scope="row">Solicits the cooperation of members in othetr offices or department whose work benerfiodtd of depermn on ones reposnsibilty adn aor funtoinc</th>
                                    <td>4</td>
                                    <td>--</td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <th scope="row">Solicits the cooperation of members in othetr offices or department whose work benerfiodtd of depermn on ones reposnsibilty adn aor funtoinc</th>
                                    <td>4</td>
                                    <td>--</td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                            </tbody>
                            <br />
                            <thead class="thead-light">
                                <tr>
                                    <th scope="col">Customer Focus</th>
                                    <th scope="col">3</th>
                                    <th scope="col">2</th>
                                    <th scope="col">2.5</th>
                                    <th scope="col">3</th>
                                    <th scope="col">D</th>
                                    <th scope="col">83%</th>
                                </tr>
                            </thead>
                            <br />
                            <thead class="thead-light">
                                <tr>
                                    <th scope="col">Customer Focus</th>
                                    <th scope="col">3</th>
                                    <th scope="col">2</th>
                                    <th scope="col">2.5</th>
                                    <th scope="col">3</th>
                                    <th scope="col">D</th>
                                    <th scope="col">83%</th>
                                </tr>
                            </thead>
                            <br />
                            <thead class="thead-light">
                                <tr>
                                    <th scope="col">Customer Focus</th>
                                    <th scope="col">3</th>
                                    <th scope="col">2</th>
                                    <th scope="col">2.5</th>
                                    <th scope="col">3</th>
                                    <th scope="col">D</th>
                                    <th scope="col">83%</th>
                                </tr>
                            </thead>

                            <br />

                        </table>
                    </div>
                    <div className="col-md-12 text-center">
                        <hr style={{ backgroundColor: "black" }} />
                        <label style={{ fontSize: 12 }}>Report For: </label> &nbsp;
        <label className="font-weight-bold">Pagcor Assessment System</label>
                    </div>
                    {/* <PrintButton id={"multiPage"} label={"Print multiplate pages"} />
    <MultiPage id={"multiPage"} /> */}
                </div>
            </div></div></Page >)
};

export default MultiPage;