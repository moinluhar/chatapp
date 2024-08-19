import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { checkLogin } from "./CheckLogin";
import axios from "axios";
import './customtable.css'

export default function ManageDocuments() {
    const navigate = useNavigate();
    const userDetails = sessionStorage.getItem("userDetails");
    const [documents, setDocuments] = useState([])
    const [documentToDelete, setDocumentToDelete] = useState(null);
    const [documentToEdit, setDocumentToEdit] = useState(null);
    const [filename, setFilename] = useState('');
    const [filelabel, setFilelabel] = useState('')
    const [file, setFile] = useState(null);

    useEffect(() => {
        checkLogin(navigate)
        fetchDocuments();
    }, [navigate]);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFilename(file.name);
            setFile(file);
        }
    }

    const handleFilelabel = (e) => {
        setFilelabel(e.target.value)
    }

    const handleDelete = (id) => {
        setDocumentToDelete(id);
    };

    const handleEdit = (document) => {
        console.log(document);
        setDocumentToEdit(document);

    };

    const handleCloseModal = () => {
        setDocumentToEdit(null);
        setDocumentToDelete(null);
    }

    const handleOnChangeEdit = (e) => {
        const { name, value } = e.target;
        setDocumentToEdit({ ...documentToEdit, [name]: value });
    };

    const fetchDocuments = async (e) => {
        try {
            const response = await axios.get("http://localhost:4000/documents");
            setDocuments(response.data.map(element => ({ id: element.id, filelabel: element.filelabel, filename: element.filename })));
        } catch (error) {
            console.error('Error fetching documents:', error);
        }
    }

    const handleConfirmUpload = async (e) => {
        const document = {
            "user_id": JSON.parse(userDetails).id,
            "filelabel": filelabel,
            "filename": filename
        }
        console.log(document);
        try {
            const response = await axios.post("http://localhost:4000/documents", document);
            if (response.status === 201) {
                fetchDocuments();
            }
            else {
                alert("Unable to register User");
            }
        } catch (error) {
            console.error('Error adding document:', error);
        }
        setFilelabel('');
        setFilename('');
        setFile(null);
    }

    const handleConfirmEdit = async (e) => {
        try {
            // const filedescription = { "filelabel": e.target.elements.editfiledescription.value };
            // console.log(filedescription)
            console.log(documentToEdit)
            await axios.put(`http://localhost:4000/documents/id/${documentToEdit.id}`, documentToEdit);
            setDocuments(documents.map(document => document.id === documentToEdit.id ? documentToEdit : document));
            setDocumentToEdit(null);
            // setDocuments(documents.filter(documents => documents.id !== documentToDelete));
        } catch (error) {
            console.error('Error editing document:', error)
        }
    }

    const handleConfirmDelete = async () => {
        try {
            await axios.delete(`http://localhost:4000/documents/id/${documentToDelete}`);
            setDocumentToDelete(null);
            setDocuments(documents.filter(documents => documents.id !== documentToDelete));
        } catch (error) {
            console.error('Error deleting document:', error)
        }

    }

    return <>
        <div className="mt-4">
            <div className="card">
                <div className="card-header bg-primary text-white">
                    <h4>Manage Documents</h4>
                </div>
                <div className="card-body chat-body" style={{ height: '500px', overflowY: 'scroll' }}>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Label</th>
                                <th>File Name</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {documents.map(document => (
                                <tr key={document.id}>
                                    <td>{document.filelabel}</td>
                                    <td>{document.filename}</td>
                                    <td>
                                        <button onClick={() => handleEdit(document)} className="btn btn-primary btn-sm me-2" data-bs-toggle="modal" data-bs-target="#editStaticBackdrop">Edit</button>
                                        <button onClick={() => handleDelete(document.id)} className="btn btn-danger btn-sm" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <button type="file" className="btn btn-info" data-bs-toggle="modal" data-bs-target="#uploadStaticBackdrop">+ Add Upload</button>
                </div>
            </div>

            <div className="modal fade" id="uploadStaticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="uploadStaticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="uploadStaticBackdropLabel">Confirm User Deletion</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" onClick={handleCloseModal} aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="row g-3 align-items-center mt-2">
                                <table className="custom-table table">
                                    <tbody>
                                        <tr>
                                            <td>
                                                <label htmlFor="filedescription" className="col-form-label">File Description</label>
                                            </td>
                                            <td>
                                                <input type="text" id="filedescription" onChange={handleFilelabel} value={filelabel} className="form-control" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <label htmlFor="fileupload" className="col-form-label">File Upload</label>
                                            </td>
                                            <td>
                                                <input type="file" id="fileupload" onChange={handleFileChange} className="form-control" />
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={handleConfirmUpload}>Ok</button>
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={handleCloseModal}>Cancel</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal fade" id="editStaticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="editStaticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="editStaticBackdropLabel">Edit Document</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" onClick={handleCloseModal} aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="row g-3 align-items-center mt-2">
                                <table className="custom-table table">
                                    <tbody>
                                        <tr>
                                            <td>
                                                <label htmlFor="filedescription" className="col-form-label">File Description</label>
                                            </td>
                                            <td>
                                                <input type="text" name="filelabel" id="filedescription" value={documentToEdit?.filelabel || ''} onChange={handleOnChangeEdit} className="form-control" />
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={handleConfirmEdit}>Save</button>
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={handleCloseModal}>Cancel</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="staticBackdropLabel">Confirm Document Deletion</h1>
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

    </>
}