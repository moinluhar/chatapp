import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { checkLogin } from "./CheckLogin";
import axios from "axios";

export default function EditUser() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [user, setUser] = useState({ fullname: '', email: '' });

    useEffect(() => {
        checkLogin(navigate)
        fetchUser()
    }, [navigate]);

    const fetchUser = async () => {
        // Fetch the user details when the component mounts
        try {
            const response = await axios.get(`http://localhost:4000/users/id/${id}`);
            const { fullname, email } = response.data;
            setUser({ fullname, email });
        } catch (error) {
            console.error('Error fetching user:', error)
        }
    };


    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            console.log(user);
            const response = await axios.put(`http://localhost:4000/users/id/${id}`, user)
            console.log(response.data);
            if (response.status === 200) {
                console.log("navigating");
                navigate("/chatapp/manageusers")
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

    return <>
        <div className="mt-4">
            <div className="card">
                <div className="card-header bg-primary text-white">
                    <h4>Edit Users</h4>
                </div>
                <div className="card-body chat-body" style={{ height: '500px', overflowY: 'scroll' }}>
                    <div className="d-flex justify-content-center mt-4">
                        <div className="col-md-6">
                            <form action="#" onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <label htmlFor="fullname" className="form-label">Full Name</label>
                                    <input type="text" placeholder="Full Name" name="fullname" value={user.fullname} onChange={handleChange} className="form-control" id="fullname" required />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input type="email" placeholder="Email" name="email" value={user.email} onChange={handleChange} className="form-control" id="email" required />
                                </div>
                                <div className="d-grid">
                                    <button type="submit" className="btn text-light main-bg">Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>;
}

