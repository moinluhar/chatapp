import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import './chatapp.css'

export default function Register() {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    }

    const validatePassword = (e) => {
        if (password !== confirmPassword) {
            setErrorMessage("Password do not match!");
        }
        else {
            setErrorMessage("");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("Password Mismatch!");
            return false;
        }

        const userData = {
            name: e.target.elements.fullname.value,
            email: e.target.elements.email.value,
            password: e.target.elements.password.value
        }

        console.log(JSON.stringify(userData));

        try {
            const response = await axios.post('http://localhost:4000/register', userData)
            console.log(response);
            if (response.status === 201) {
                console.log("navigating");
                navigate("/registersuccess")
            }
            else if (response.status === 200) {
                alert(response.data.message);
            }
            else {
                alert("Unable to register User");
            }
        } catch (error) {
            console.error("Error: ", error)
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
                            <h2 className="p-3">Register</h2>
                        </div>
                        <div className="card-body">
                            <form action="#" onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <label htmlFor="fullname" className="form-label">Full Name</label>
                                    <input type="text" placeholder="Full Name" name="fullname" className="form-control" id="fullname" required />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input type="email" placeholder="Email" name="email" className="form-control" id="email" required />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input type="password" placeholder="Password" name="password" className="form-control" onChange={handlePasswordChange} onBlur={validatePassword} value={password} id="password" required />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="confirm-password" className="form-label">Confirm Password</label>
                                    <input type="password" placeholder="Confirm Password" name="confirmPassword" onChange={handleConfirmPasswordChange} onBlur={validatePassword} value={confirmPassword} className="form-control" id="confirm-password" required />
                                </div>
                                {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
                                <div className="d-grid">
                                    <button type="submit" className="btn text-light main-bg">Register</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>)
}
