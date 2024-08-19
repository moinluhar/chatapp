import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { checkLogin } from "./CheckLogin";
import axios from "axios";

export default function ManageUsers() {
    const navigate = useNavigate();
    const [users, setUsers] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [userToDelete, setUserToDelete] = useState(null);

    useEffect(() => {
        checkLogin(navigate)
        fetchUsers();
    }, [navigate]);

    const fetchUsers = async (e) => {
        try {
            const response = await axios.get("http://localhost:4000/users");
            setUsers(response.data.map(element => ({ id: element.id, name: element.fullname, email: element.email })));
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    }

    const handleDelete = (id) => {
        setUserToDelete(id);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setUserToDelete(null);
    }

    const handleConfirmDelete = async () => {
        try {
            const response = await axios.delete(`http://localhost:4000/users/id/${userToDelete}`);
            setShowModal(false);
            setUserToDelete(null);
            setUsers(users.filter(user => user.id !== userToDelete));
        } catch (error) {
            console.error('Error deleting user:', error)
        }

    }

    return <>
        <div className="mt-4">
            <div className="card">
                <div className="card-header bg-primary text-white">
                    <h4>Manage Users</h4>
                </div>
                <div className="card-body chat-body" style={{ height: '500px', overflowY: 'scroll' }}>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user => (
                                <tr key={user.id}>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>
                                        <Link to={`/chatapp/edituser/${user.id}`} className="btn btn-primary btn-sm me-2">Edit</Link>
                                        <button onClick={() => handleDelete(user.id)} className="btn btn-danger btn-sm" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="staticBackdropLabel">Confirm User Deletion</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" onClick={handleCloseModal} aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            Are you sure?
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={handleConfirmDelete}>Ok</button>
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={handleCloseModal}>Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>;
}