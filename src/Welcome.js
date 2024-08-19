import React from "react";
import './chatapp.css'
import { Link } from "react-router-dom";

export default class Welcome extends React.Component {

    render() {
        return (<>
            <div className="container">
                <br /><br /><br />
                <div className="position-relative">
                    <h1 className="position-absolute top-0 start-50 translate-middle welcome-msg">Welcome to ChatApp</h1>
                </div>
                <div className="row justify-content-center mt-5">
                    <div className="col-lg-4 col-md-6 col-sm-6">
                        <div className="card shadow">
                            <div className="card-body">
                                <form>
                                    <div className="mb-4">
                                        <h4 className="text-center">Existing User</h4>
                                        <div className="d-grid">
                                            <Link className="btn text-light main-bg" to="/login">Login</Link>
                                        </div>
                                    </div>
                                    <div className="mb-4">
                                        <h4 className="text-center">New User</h4>
                                        <div className="d-grid">
                                            <Link className="btn text-light main-bg" to="/register">Register</Link>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>)
    }
}