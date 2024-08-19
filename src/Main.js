import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Nav from './Nav'
import Register from './Register'
import Welcome from './Welcome';
import Login from './Login';
import RegisterSuccess from './RegisterSuccess';
import GroupChat from './GroupChat';
import NotFound from './NotFound';
import ManageUsers from './ManageUser';
import EditUser from './EditUser';
import ManageDocuments from './ManageDocuments';
import LoginSuccess from './LoginSuccess';

class Main extends React.Component {
    render() {
        return <BrowserRouter>
            <Routes>
                <Route path="/chatapp" element={<Nav />}>
                    <Route path='' element={<LoginSuccess />} />
                    <Route path='groupchat' element={<GroupChat />} />
                    <Route path='manageusers' element={<ManageUsers />} />
                    <Route path='managedocuments' element={<ManageDocuments />} />
                    <Route path='edituser/:id' element={<EditUser />} />
                </Route>

                <Route path='/' element={<Welcome />} />
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path='/registersuccess' element={<RegisterSuccess />} />
                <Route path='*' element={<NotFound />} />

            </Routes>
        </BrowserRouter>
    }
}

export default Main;