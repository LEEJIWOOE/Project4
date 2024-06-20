import React from 'react';
import { Routes, Route } from 'react-router-dom';

import { AuthProvider } from "./context/AuthContext";
import Register from './components/Register';
import Login from './components/Login';
import Home from './pages/Home';

function App() {
    return (
        <div className="App">
            <AuthProvider>
                <Routes>
                    <Route path="/register" element={<Register/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/" element={<Home/>}/>
                </Routes>
            </AuthProvider>
        </div>
    );
}

export default App;