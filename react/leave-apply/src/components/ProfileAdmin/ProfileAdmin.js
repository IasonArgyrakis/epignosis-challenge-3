import React from 'react';
import PropTypes from 'prop-types';
import {useSelector} from "react-redux";
import axios from "axios";
import {useParams} from "react-router-dom";


const ProfileAdmin = () => {
    let {id} = useParams();





    const [email, setEmail] = React.useState(undefined)
    const [firstName, setFirstName] = React.useState(undefined)
    const [lastName, setLastName] = React.useState(undefined)
    const [userType, setUserType] = React.useState("")
    const [totalDays, setTotalDays] = React.useState(undefined)
    const [totalDaysTaken, setTotalDaysTaken] = React.useState(undefined)
    const [userId, setUserId] = React.useState(undefined)



    const login = useSelector(state => state.logged)

    const getCurrentUser = (userId) => {
        let config = {headers: {Accept: "application/json", Authorization: "Bearer " + login.token}};

        let url="http://localhost/api/user/"+userId

        axios
            .get(url, config)
            .then(function (response) {




                setEmail(response.data.email)
                setFirstName(response.data.firstName)
                setLastName(response.data.lastName)
                setUserType(response.data.type)
                setUserId(response.data.id)
                setTotalDays(response.data.total_days)
                setTotalDaysTaken(response.data.total_days_taken)


            })
            .catch(function (errors) {
                console.log(errors.errors);

            });

    }

    const handleChange = (event) => {
        event.preventDefault()
        switch (event.target.id) {
            case 'firstName':
                setFirstName(event.target.value)
                break;
            case 'lastName':
                setLastName(event.target.value)
                break;
            case 'email':
                setEmail(event.target.value)
                break;
            case 'userType':
                setUserType(event.target.value)
                break;

            case 'total_days':
                setTotalDays(event.target.value)
                break;
            case 'total_days_taken':
                setTotalDaysTaken(event.target.value)
                break;
        }


    }
    const handleSubmit=(event)=>{
        event.preventDefault()
        let config = {headers: {Accept: "application/json", Authorization: "Bearer " + login.token}};



        let data = {
            id:event.target.userId.value,
            firstName:event.target.firstName.value,
            lastName:event.target.lastName.value,
            email:event.target.email.value,
            type:event.target.userType.value,
            total_days:event.target.total_days.value,
            total_days_taken:event.target.total_days_taken.value

        }
        let url="http://localhost/api/user/"+data.id
        console.log(url,data)

        axios
            .put(url,data, config)
            .then(function (response) {




                setEmail(response.data.email)
                setFirstName(response.data.firstName)
                setLastName(response.data.lastName)
                setUserType(response.data.userType)
                console.log(response.data);
                getCurrentUser(response.data.id)


            })
            .catch(function (errors) {
                console.log(errors.errors);

            });
    }

    React.useEffect(() => {
        getCurrentUser(id)

    }, []);


    return (<div>


            <form onSubmit={handleSubmit}>
                <input type="number" id={"userId"} defaultValue={userId}
                      className="d-none"/>


                <div className="mb-1">
                    <label  className="form-label text-white">First Name</label>
                    <input type="text" id={"firstName"} defaultValue={firstName}
                           onChange={handleChange} className="form-control"/>

                </div>
                <div className="mb-1">
                    <label  className="form-label text-white">Last Name</label>
                    <input type="text" className="form-control" id={"lastName"} defaultValue={lastName}
                           onChange={handleChange}/>

                </div>

                <div className="mb-1">
                    <label  className="form-label text-white">days Available</label>
                    <input type="text" className="form-control" id={"total_days"} defaultValue={totalDays}
                           onChange={handleChange}/>

                </div>
                <div className="mb-1">
                    <label  className="form-label text-white">days taken</label>
                    <input type="text" className="form-control" id={"total_days_taken"} defaultValue={totalDaysTaken}
                           onChange={handleChange}/>

                </div>
                <div className="mb-1">
                    <label  className="form-label text-white">Email address</label>
                    <input type="email" className="form-control" id={"email"} defaultValue={email}
                           onChange={handleChange}/>

                    <label  className="form-label text-white">User Type</label>
                    <select id="userType" className="mt-1 form-select form-select-sm"
                            aria-label=".form-select-sm example" value={userType} onChange={handleChange}>
                        <option value="admin">Administrator</option>
                        <option value="employee">Employee</option>

                    </select>
                </div>


                <button type="submit" className="btn btn-primary">Submit</button>
            </form>

        </div>
    )


};

ProfileAdmin.propTypes = {};

ProfileAdmin.defaultProps = {};

export default ProfileAdmin;
