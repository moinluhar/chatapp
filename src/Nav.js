import { useEffect } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom"
import { checkLogin } from "./CheckLogin";
import './nav.css';

export default function Nav() {
    const navigate = useNavigate();
    const userDetails = sessionStorage.getItem("userDetails");
    console.log(userDetails);

    useEffect(() => {
        checkLogin(navigate)
    }, [navigate])

    const handleLogout = async (e) => {
        e.preventDefault();
        console.log("Inside")
        sessionStorage.removeItem("userDetails");
        navigate("/login");
    }
    return (<>
        <nav className="navbar bg-primary navbar-expand-lg">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">ChatApp</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <ul className="navbar-nav">
                            <li className="nav-item active">
                                <Link className="nav-link active" to="/chatapp/groupchat">Group Chat</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/chatapp/manageusers">Manage Users</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/chatapp/managedocuments">Manage Documents</Link>
                            </li>
                            <li className="nav-item">
                                <Link onClick={handleLogout} className="nav-link">Logout</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
        <div className="container">
            <Outlet />
        </div>
    </>)
}