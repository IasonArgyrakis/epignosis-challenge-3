import React from "react";
import {logged} from "../actions";
import axios from "axios";
import { useSelector} from "react-redux";


function LeaveSubmissionForm() {
    const login = useSelector(state => state.logged)

    const [startDate, setStartDate] = React.useState(undefined)
    const [endDate, setEndDate] = React.useState(undefined)
    const [reason, setReason] = React.useState(undefined)

    const [submited, setSubmited] = React.useState(false)
    const [submitedError, setSubmitedError] = React.useState({})



    const handleChange = (event) => {
        event.preventDefault()

        setSubmited(false)


        switch (event.target.id) {
            case 'startDate':
                setStartDate(event.target.value)
                break;
            case 'endDate':
                setEndDate(event.target.value)
                break;
            case 'reason':
                setReason(event.target.value)
                break;

        }


    }
    function renderSumbition() {
        if(submited){
            setTimeout(()=>(setSubmited(false)), 1000)
            return (<div className=" mt-2 alert alert-success" role="alert">
              Request Submitted
            </div>)
        }

    }
    function renderSumbitionError() {

        if(submitedError.errors==="Not enough days left"){
            console.log(submitedError.days_requested)
            // setTimeout(()=>(setSubmitedError(false)), 3000)
            return (<div className=" mt-2 alert alert-danger" role="alert">
                {submitedError.errors}  days requested: {submitedError.days_requested} days left {submitedError.days_left}
            </div>)
        }

    }

    const handleSubmit = (event) => {
        event.preventDefault()




        let config = {headers: {Accept: "application/json", Authorization: "Bearer " + login.token}};
        let data = {

            start: startDate,
            end: endDate,
            reason:reason

        }

        console.log(data);

        axios
            .post('http://localhost/api/my-applications/new', data, config)
            .then(function (response) {

                console.log(response.data)
                setSubmited(true)
                let info={
                    errors: response.data.errors,
                    days_requested:response.data.days_requested ,
                    days_left:response.data.days_left
                }

                setSubmitedError({...info})


            })
            .catch(function (error) {
                console.log(error.request)
                let info={
                    errors: error.errors,
                    days_requested:error ,
                    days_left:error

                }

                setSubmitedError({...info})


                console.log(error)

            });


    }



    return (
        <div className="row p-2">
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="startDate" className="text-white form-label"> Start Date</label>
                    <input required type="date" onChange={handleChange}   className="form-control" id="startDate" aria-describedby="startDate"/>

                </div>
                <div className="mb-3">
                    <label  htmlFor="endDate" className="form-label">End Date</label>
                    <input  required min={startDate} id="endDate" type="date" onChange={handleChange} className="form-control"  aria-describedby="endDate"/>
                </div>
                <div className="mb-3">
                    <textarea required  id="reason" onChange={handleChange} name="Reason" cols="40" placeholder="reason" rows="5"/>
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
            {renderSumbition()}
            {renderSumbitionError()}
        </div>)
}

export default LeaveSubmissionForm
