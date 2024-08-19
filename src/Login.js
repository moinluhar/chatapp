import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import './chatapp.css'
import axios from "axios";

export default function Login() {
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const loginData = {
            email: e.target.elements.email.value,
            password: e.target.elements.password.value
        }
        console.log(loginData);
        try {
            const loginResponse = await axios.post("http://localhost:4000/login", loginData);
            console.log(loginResponse);
            if (loginResponse.status === 200) {
                const encodedEmail = encodeURIComponent(loginData.email)
                const userResponse = await axios.get(`http://localhost:4000/users/email/${encodedEmail}`);
                sessionStorage.setItem("userDetails", JSON.stringify(userResponse.data))
                navigate("/chatapp");
            }
            else {
                setErrorMessage(loginResponse.data.message);
            }
        } catch (error) {
            if (error.response && error.response.status === 401) {
                setErrorMessage(error.response.data.message);
            }
            else{
                console.error("Error: ", error)
            }
        }
    }
    return (<>
        <div className="container">
            <br /><br /><br />
            <div className="position-relative">
                <h1 className="position-absolute top-0 start-50 translate-middle welcome-msg">Welcome to ChatApp</h1>
            </div>
            <div className="row justify-content-center mt-5">
                <div className="col-lg-4 col-md-6 col-sm-6">
                    <div className="card shadow">
                        <div className="card-title text-center border-bottom">
                            <h2 className="p-3">Login</h2>
                        </div>
                        <div className="card-body">
                            <form action="#" onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input type="email" name="email" className="form-control" id="email" />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input type="password" name="password" className="form-control" id="password" />
                                </div>
                                {errorMessage && <p className="text-center" style={{ color: "red" }}>{errorMessage}</p>}
                                <div className="d-grid">
                                    <button href="home-page.html" type="submit" className="btn text-light main-bg">Login</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>);
}
