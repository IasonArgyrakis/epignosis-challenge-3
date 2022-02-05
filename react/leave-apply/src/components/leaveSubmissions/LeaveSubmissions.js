import {Link} from "react-router-dom";
import axios from "axios";
import {logged} from "../actions";
import {useSelector} from "react-redux";
import React from "react";

function LeaveSubmissions() {
    const [submissions, setSubmissions] = React.useState([])


    const login = useSelector(state => state.logged)


    React.useEffect(() => {
        console.log(login)

        let config = {headers: {Accept: "application/json", Authorization: "Bearer " + login.token}};
        axios
            .get('http://localhost/api/my-applications', config)
            .then(function (response) {

                console.log(response.data)
                setSubmissions(response.data)

            })
            .catch(function (errors) {
                console.log(errors.errors);

            });


    }, []);

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

    function convertSubmisionDate(dateSttring) {
        return new Date(dateSttring).toISOString().slice(0, 10)
    }

    const renderRow = (item, index) => {

        return (
            <tr>
                <td>{index + 1}</td>
                <td>{convertSubmisionDate(item.created_at)}</td>
                <td>{item.start}</td>
                <td>{item.end}</td>
                <td>{calcBusinessDays(item.start, item.end)}</td>
                <td>{item.status}</td>
                <td>{item.reason}</td>

            </tr>)
    }


    return (<div>

            {login.token == undefined ?
                <div className="alert alert-warning" role="alert">
                    User is not logged in
                </div> : null
            }
            <Link className="btn btn-primary" to='/new-request'>New Request</Link>
            {
                submissions.length > 0 ?
                    <div className=" my-1">
                        <div className=" hx-1">
                            <div className="d-flex flex-row justify-content-evenly ">
                                <div className="col-sm-12">
                                    <table className="table table-borderless bg-white">
                                        <thead>
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Requested</th>
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
                        User has No applications
                    </div>
            }

        </div>
    )

}


export default LeaveSubmissions
