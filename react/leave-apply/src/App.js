import React from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route, useParams, Switch,
} from "react-router-dom";
import './App.css';
import Navbar from "./components/Navbar/Navbar";

import LeaveSubmissions from "./components/leaveSubmissions/LeaveSubmissions";

import LeaveSubmissionForm from "./components/leaveSubmissions/LeaveSubmissionForm";
import Login from "./components/login/login";
import Register from "./components/register/register";
import {useSelector} from "react-redux";
import Users from "./components/users/users";
import LeaveSubmissionsAdmin from "./components/leaveSubmissions/LeaveSubmissionsAdmin";
import ProfileAdmin from "./components/ProfileAdmin/ProfileAdmin";
import login from "./components/login/login";


function App() {

    const counter = useSelector(state => state.counter)
    const login = useSelector(state => state.logged)

    return (
        <Router>
            <div className="container ">

                <Navbar/>


                <Routes>
                    <Route path='/' element={<Home/>}/>
                    <Route path='/all-my-requests' element={<LeaveSubmissions/>}/>
                    <Route path='/new-request' element={<LeaveSubmissionForm/>}/>
                    <Route path='/login' element={<Login/>}/>
                    <Route path='/register' element={<Register/>}/>
                    <Route path='/users' element={<Users/>}/>
                    <Route path='/all-pending-requests' element={<LeaveSubmissionsAdmin/>}/>
                    <Route path="/user/:id" element={<UserProfile />} />
                </Routes>

            </div>

        </Router>
    );
}
function UserProfile() {
    const login = useSelector(state => state.logged)
    let { id } = useParams();

    if(login.isAdmin){
    return (
        <div>
            <ProfileAdmin user_id={id} />
        </div>
    );
    }else{return <Login/>}
}

function Home() {
    const login = useSelector(state => state.logged)


    if (login.token === undefined) {
        return (<Login/>)
    } else {
        return (<div className=" text-white row col-sm-12"><LeaveSubmissions/></div>)
    }
    ;
}



function NewRequest() {
    return <div className=" container text-white row col-sm-12"><LeaveSubmissionForm/></div>;
}



export default App;
