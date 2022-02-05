import axios from "axios";
import React from "react";
import {useSelector, useDispatch} from "react-redux";
import {logged} from "../actions";

function Login() {


    const [email, setEmail] = React.useState(undefined)
    const [password, setPassword] = React.useState(undefined)
    const [loginErrors, setLoginErrors] = React.useState(undefined)

    const login = useSelector(state => state.logged)
    const dispatch = useDispatch()

    const handleChange = (event) => {
        event.preventDefault()
        switch (event.target.type) {
            case 'email':
                console.log(event.target.value)
                setEmail(event.target.value)
                break;
            case 'password':
                setPassword(event.target.value)
                break;

        }

    }

    const handleSubmit = (event) => {
        event.preventDefault()

        setEmail(event.target.email.value)
        setPassword(event.target.password.value)


        let config = {headers: {Accept: "application/json"}};
        let data = {

            email: email,
            password: password,

        }

        console.log(data);

        axios
            .post('http://localhost/api/login/', data, config)
            .then(function (response) {

                console.log(response.data)
                dispatch(logged(response.data))

            })
            .catch(function (error) {
                let css = "alert ";
                switch (error.response.status) {
                    case 422:
                        css += "alert-danger"
                        break;
                    case 403:
                        css += "alert-warning"
                        break;

                }

                let loginError = {
                    data: error.response.data,
                    errors: error.response.data.errors,
                    status: error.response.status,
                    headers: error.response.headers,
                    cssClass: css
                }


                setLoginErrors(loginError)
                console.log(loginError)

            });


    }


    const renderErrors = (loginErrors) => {
        let errors = loginErrors.data.errors

        if (errors !==undefined) {
            let Errors=[]
            errors.map(error => {
                console.log(error)
                Errors.push(
                    <div className={loginErrors.cssClass} role="alert">
                        {error}
                    </div>
                )
            })
            return Errors


        } else {
            return (<div className={loginErrors.cssClass} role="alert">
                {
                    loginErrors.data.message
                }
            </div>);
        }
    }


    return (
        <div className="p-5 mw-60">
            <form className="text-center" onSubmit={handleSubmit}>
                <h3 className={"text-white"}>Login</h3>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input type="email" className="form-control" id="email" aria-describedby="emailHelp"
                           placeholder="Enter email" onChange={handleChange}/>

                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input type="password" onChange={handleChange} className="form-control" minLength="8" id="password"
                           placeholder="Password"/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>

            {
                loginErrors !== undefined &&
                renderErrors(loginErrors)
            }
        </div>
    )
}


export default Login
