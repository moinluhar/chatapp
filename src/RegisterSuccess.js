import React from "react";
import './chatapp.css'
import { Link } from "react-router-dom";

class RegisterSuccess extends React.Component {
    state = {}
    render() {
        return (<>
            <div className="container">
                <br /><br /><br />
                <div className="position-relative">
                    <h1 className="position-absolute top-0 start-50 translate-middle welcome-msg">Welcome to ChatApp</h1>
                </div>
                <div className="row justify-content-center mt-5">
                    <div className="col-lg-8 col-md-6 col-sm-6">
                        <div className="card shadow">
                            <div className="card-body">
                                <form>
                                    <div className="mb-4">
                                        <h4 className="text-center">Registration Successful</h4>
                                    </div>
                                    <div className="mb-4">
                                        <p className="text-center">Thank you for your registration</p>
                                    </div>
                                    <div className="mb-4">
                                        <p className="text-center"><Link to="/">Click to return to home page</Link></p>

                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>);
    }
}

export default RegisterSuccess;