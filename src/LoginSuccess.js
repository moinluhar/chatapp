import React from "react";
import { Link } from "react-router-dom";

function LoginSuccess() {
    const userDetails = sessionStorage.getItem("userDetails");
    return (<>
        <div className="container">
            <div className="row justify-content-center mt-5">
                <div className="col-lg-8 col-md-6 col-sm-6">
                    <div className="card shadow">
                        <div className="card-body">
                            <form>
                                <div className="mb-4">
                                    <h4 className="text-center">Login Successful</h4>
                                </div>
                                <div className="mb-4">
                                    <p className="text-center"><b>Welcome!</b> {JSON.parse(userDetails).email} </p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>);
}

export default LoginSuccess;