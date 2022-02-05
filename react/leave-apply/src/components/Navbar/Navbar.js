import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import {logged} from "../actions";
import React from "react";

function Navbar() {

    const dispatch = useDispatch()
    const login = useSelector(state => state.logged)
    const [loggedIn, setloggedIn] = React.useState(login)
    const perfomrmLogout = () => {
        let config = {headers: {Accept: "application/json", Authorization: "Bearer " + login.token}};
        axios
            .post('http://localhost/api/logout', config)
            .then(function (response) {

                console.log(response.data)

                dispatch(logged(false))
                setloggedIn(false)

            })
            .catch(function (errors) {
                dispatch(logged(false))
                setloggedIn(false)


            });

    }
    const renderLogout = () => {


        return (
            <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                    <a className="nav-link" onClick={perfomrmLogout}>Logout </a>
                </li>
            </ul>)


    }
    const renderAuthRoute = () => {
        return (
            <ul className="navbar-nav mr-auto">
                <li><Link className="nav-link" to='/login'>Login </Link></li>
                <li><Link className="nav-link" to='/register'>Register</Link></li>
            </ul>)

    }
    const renderUserRoutes = () => (
        <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
                <Link className="nav-link" to='/all-my-requests'>my Requests </Link>

            </li>
        </ul>
    )
    const renderAdminRoutes = () => {
        return (<ul className="navbar-nav mr-auto">
            <li className="nav-item">
                <Link className="nav-link" to='/all-pending-requests'>All Pending Requests </Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to='/users'>Users </Link>

            </li>
        </ul>)
    }
    return (
        <nav className="navbar-dark  navbar-expand-lg navbar-light bg-dark">
            <a className="navbar-brand" href="/">Leave Apply 🍹</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                    aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse " id="navbarNav">

                {login.token !== undefined &&
                    renderUserRoutes()


                }
                {login.isAdmin === true &&
                    renderAdminRoutes()
                }
                <div className="px-5">
                    {login.token === undefined ?
                        renderAuthRoute()
                        : renderLogout()

                    }
                </div>

                <a target="_blank" href="http://localhost:8025">to TEST MAIL</a>
            </div>
        </nav>
    )
}

export default Navbar
