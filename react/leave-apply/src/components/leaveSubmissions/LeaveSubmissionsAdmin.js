import {Link} from "react-router-dom";
import axios from "axios";
import {logged} from "../actions";
import {useSelector} from "react-redux";
import React from "react";

function LeaveSubmissionsAdmin() {


    function calcBusinessDays(dDate1S, dDate2S) {
        if(dDate1S===dDate2S)return 1
        let  dDate1=new Date(Date.parse(dDate1S))
        let dDate2= new Date(Date.parse(dDate2S))


        // input given as Date objects
        var iWeeks, iDateDiff, iAdjust = 0;
        if (dDate2 < dDate1) return -1; // error code if dates transposed
        var iWeekday1 = dDate1.getDay(); // day of week
        var iWeekday2 = dDate2.getDay();
        iWeekday1 = (iWeekday1 == 0) ? 7 : iWeekday1; // change Sunday from 0 to 7
        iWeekday2 = (iWeekday2 == 0) ? 7 : iWeekday2;
        if ((iWeekday1 > 5) && (iWeekday2 > 5)) iAdjust = 1; // adjustment if both days on weekend
        iWeekday1 = (iWeekday1 > 5) ? 5 : iWeekday1; // only count weekdays
        iWeekday2 = (iWeekday2 > 5) ? 5 : iWeekday2;

        // calculate differnece in weeks (1000mS * 60sec * 60min * 24hrs * 7 days = 604800000)
        iWeeks = Math.floor((dDate2.getTime() - dDate1.getTime()) / 604800000)

        if (iWeekday1 < iWeekday2) { //Equal to makes it reduce 5 days
            iDateDiff = (iWeeks * 5) + (iWeekday2 - iWeekday1)
        } else {
            iDateDiff = ((iWeeks + 1) * 5) - (iWeekday1 - iWeekday2)
        }

        iDateDiff -= iAdjust // take into account both days on weekend

        return (iDateDiff + 1); // add 1 because dates are inclusive
    }

    const [submissions, setSubmissions] = React.useState([])



    const login = useSelector(state => state.logged)

    const getCurrentApplications = () => {
        let config = {headers: {Accept: "application/json", Authorization: "Bearer " + login.token}};

        axios
            .get('http://localhost/api/all-applications', config)
            .then(function (response) {

                console.log(response.data)
                setSubmissions(response.data)

            })
            .catch(function (errors) {
                console.log(errors.errors);

            });

    }

    React.useEffect(() => {  getCurrentApplications() }, []);


    const handleApprove = (event) => {
        let id = event.target.id

        let config = {
            headers: {
                Accept: "application/json",
                Authorization: "Bearer " + login.token
            }
        };
        let data = {

            status: "approved"


        }
        axios
            .put('http://localhost/api/application/' + id, data, config)
            .then(function (response) {

                console.log(response.data)
                getCurrentApplications()


            })
            .catch(function (errors) {
                console.log(errors.errors);

            });


    }

    const handleDeny = (event) => {
        let id = event.target.id

        let config = {
            headers: {
                Accept: "application/json",
                Authorization: "Bearer " + login.token
            }
        };
        let data = {

            status: "rejected"


        }
        axios
            .put('http://localhost/api/application/' + id, data, config)
            .then(function (response) {

                console.log(response.data)
                getCurrentApplications()


            })
            .catch(function (errors) {
                console.log(errors.errors);

            });


    }

    let renderRow = (item,index) => {

        return (
            <tr>
                <td>{index+1}</td>
                <td>{item.applicant}</td>
                <td>{item.start}</td>
                <td>{item.end}</td>
                <td>{calcBusinessDays(item.start, item.end)}</td>
                <td>{item.status}</td>
                <td>{item.reason}</td>
                <td>
                    <button type="button" id={item.id} onClick={handleApprove}
                            className="btn btn-success">Approve
                    </button>
                </td>
                <td>
                    <button type="button" id={item.id} onClick={handleDeny}
                            className="btn btn-danger">Deny
                    </button>
                </td>
            </tr>)
    }

    return (<div>

            {login.token == undefined ?
                <div className="alert alert-warning" role="alert">
                    User is not logged in
                </div> : null
            }

            {submissions.length > 0 ?
                <div className=" my-1">
                    <div className=" hx-1">
                        <div className="d-flex flex-row justify-content-evenly ">
                            <div className="col-sm-12">
                                <table className="table table-borderless bg-white">
                                    <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Requested By</th>
                                        <th scope="col">Start</th>
                                        <th scope="col">End</th>
                                        <th scope="col"> Days</th>
                                        <th scope="col">Status</th>
                                        <th scope="col">Reason</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        submissions.map((item,index) => {
                                            return renderRow(item,index)
                                        })
                                    }
                                    </tbody>
                                </table>
                            </div>


                            <div/>
                        </div>
                    </div>
                </div>

                :
                <div className=" mt-2 alert alert-primary" role="alert">
                    There are no pending applications
                </div>
            }

        </div>
    )



}


export default LeaveSubmissionsAdmin
