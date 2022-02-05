import {Link} from "react-router-dom";
import axios from "axios";
import {logged} from "../actions";
import {useSelector} from "react-redux";
import React from "react";

function Users() {
    const [users, setUsers] = React.useState([])


    const login = useSelector(state => state.logged)


    React.useEffect(() => {
        console.log(login)

        let config = {headers: {Accept: "application/json", Authorization: "Bearer " + login.token}};
        axios
            .get('http://localhost/api/users', config)
            .then(function (response) {

                console.log(response.data)
                setUsers(response.data)

            })
            .catch(function (errors) {
                console.log(errors.errors);

            });


    }, []);


    return (<div>

            {login.token == undefined ?
                <div className="alert alert-warning" role="alert">
                    User is not logged in
                </div> : null

            }
            <Link className="btn btn-primary" to='/register'>New User</Link>
            {
                users.length > 0  ?
                    users.map(item => {


                        return (
                            <div className="card my-1">
                                <div className="card-body hx-1">
                                    <div className="d-flex flex-row justify-content-evenly ">
                                        <h5 className=" mx-auto text-dark">{item.id}</h5>
                                        <h5 className=" mx-auto text-dark">{item.firstName}</h5>
                                        <h5 className=" mx-auto text-dark">{item.lastName}</h5>
                                        <h5 className=" mx-auto text-dark">{"test"}</h5>
                                        <h5 className=" mx-auto text-dark">{item.email}</h5>
                                        <h5 className=" mx-auto text-dark ">{item.type}</h5>
                                        <h5 className=" mx-auto text-dark ">{item.total_days_taken}/{item.total_days}</h5>
                                        <Link  to={"/user/"+item.id} className="btn btn-primary">Edit</Link>
                                        <div/>
                                    </div>
                                </div>
                            </div>)
                    }) : <div className=" mt-2 alert alert-primary" role="alert">
                        No Users Only Admin Ca
                    </div>
            }

        </div>
    )

}


export default Users
