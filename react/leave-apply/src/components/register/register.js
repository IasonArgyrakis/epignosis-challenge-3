import React from "react";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {logged} from "../actions";

const Register = () => {

    const login = useSelector(state => state.logged)
    const dispatch = useDispatch()

    const [firstName, setfirstName] = React.useState(undefined)
    const [lastName, setlastName] = React.useState(undefined)
    const [email, setEmail] = React.useState(undefined)
    const [password, setPassword] = React.useState(undefined)
    const [confirm_password, setConfirm_password] = React.useState(undefined)
    const [type, setType] = React.useState(undefined)

    const [backendErrors, setBackendErrors] = React.useState([])

    const handleChange = (event) => {
        event.preventDefault()
        setBackendErrors([])
        switch (event.target.id) {
            case 'email':
                setEmail(event.target.value)
                break;
            case 'firstName':
                setfirstName(event.target.value)
            case 'lastName':
                setlastName(event.target.value)
            case 'password':
                setPassword(event.target.value)
            case 'confirm_password':
                setConfirm_password(event.target.value)
            case 'type':
                setType(event.target.value)
                break;

        }

    }


    const handleSubmit = (event) => {
        event.preventDefault()

        setfirstName(event.target.firstName.value)
        setlastName(event.target.lastName.value)
        setEmail(event.target.email.value)
        setPassword(event.target.password.value)
        setConfirm_password(event.target.password_confirmation.value)
        setType(event.target.type.value)

        let config = {headers: {Accept: "application/json"}};
        let data = {
            firstName: event.target.firstName.value,
            lastName: event.target.lastName.value,
            email: event.target.email.value,
            password: event.target.password.value,
            confirm_password: event.target.password_confirmation.value,
            type: event.target.type.value
        }
        console.log(data);


        axios
            .post('http://localhost/api/register/', data, config)
            .then(async function (response) {
                console.log(response)
                if (login.token == undefined) {
                    console.log("user  signed in")
                    dispatch(logged(response.data))
                } else {
                    console.log("new user  made")
                }


            })
            .catch(function (error) {


                let errors = error.response.data.errors
                console.log(errors)
                let renderErrors = []
                errors.map((item) => {
                    renderErrors.push(<div className="alert alert-danger" role="alert">
                        {item}
                    </div>)
                })

                setBackendErrors(renderErrors)


            });


    }


    return (

        <div className="row  centered-form">
            <div className=" mx-auto col-xs-12 col-sm-8 col-md-6 col-sm-offset-2 col-md-offset-4">
                <div className="panel mb-2 card p-1 panel-default">
                    <div className="panel-heading">
                        <h3 className="panel-title">Register</h3>

                    </div>
                    <div className="panel-body">
                        <form role="form" onSubmit={handleSubmit}>
                            <div className="row mb-1">
                                <div className="col-xs-6 col-sm-6 col-md-6">
                                    <div className="form-group">
                                        <input type="text" name="first_name" onChange={handleChange} id="firstName"
                                               className="form-control input-sm" placeholder="First Name"/>
                                    </div>
                                </div>
                                <div className="col-xs-6 col-sm-6 col-md-6">
                                    <div className="form-group">
                                        <input type="text" name="last_name" id="lastName" onChange={handleChange}
                                               className="form-control input-sm" placeholder="Last Name"/>
                                    </div>
                                </div>
                            </div>

                            <div className="form-group mb-1">
                                <input type="email" name="email" id="email" className="form-control input-sm"
                                       onChange={handleChange}
                                       placeholder="Email Address"/>
                            </div>

                            <div className="row mb-1">
                                <div className="col-xs-6 col-sm-6 col-md-6 mb-1">
                                    <div className="form-group">
                                        <input type="password" name="password" id="password" onChange={handleChange}
                                               className="form-control input-sm" minLength="8" placeholder="Password"/>
                                    </div>
                                </div>
                                <div className="col-xs-6 col-sm-6 col-md-6 mb-1">
                                    <div className="form-group">
                                        <input type="password" name="password_confirmation" onChange={handleChange}
                                               id="password_confirmation" minLength="8"
                                               className="form-control input-sm"
                                               placeholder="Confirm Password"/>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group mb-2">
                                <label htmlFor="exampleFormControlSelect1">User Type</label>
                                <select className="form-control" id="type" onChange={handleChange}>
                                    <option value="admin">Administrator</option>
                                    <option value="employee">Employee</option>

                                </select>
                            </div>

                            <input type="submit" value="Register" className="btn btn-info btn-block"/>

                        </form>
                        {backendErrors}

                    </div>
                </div>
            </div>
        </div>

    )
}
export default Register
