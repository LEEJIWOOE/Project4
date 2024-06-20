import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import authService from '../services/authService';
import '../assets/styles/components/LoginModal.css';

const LoginModal = ({ isOpen, onClose }) => {
    const { login } = useContext(AuthContext);
    const [isLoginView, setIsLoginView] = useState(true);
    const [formData, setFormData] = useState({ userid: '', password: '', nickname: '', realname: '' });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isLoginView) {
            await login(formData.userid, formData.password);
        } else {
            await authService.register(formData);
            await login(formData.userid, formData.password);
        }
        onClose();
    };

    return isOpen ? (
        <div className="modal">
            <div className="modal-content">
                <button onClick={onClose} className="close-button">X</button>
                <h2>{isLoginView ? '로그인' : '회원가입'}</h2>
                <form onSubmit={handleSubmit}>
                    <input type="text" name="userid" placeholder="User ID" value={formData.userid} onChange={handleChange} required />
                    <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
                    {!isLoginView && (
                        <>
                            <input type="text" name="nickname" placeholder="Nickname" value={formData.nickname} onChange={handleChange} required />
                            <input type="text" name="realname" placeholder="Real Name" value={formData.realname} onChange={handleChange} required />
                        </>
                    )}
                    <button type="submit">{isLoginView ? 'Login' : 'Register'}</button>
                </form>
                <button onClick={() => setIsLoginView(!isLoginView)}>
                    {isLoginView ? '또는 회원가입' : '또는 로그인'}
                </button>
            </div>
        </div>
    ) : null;
};


export default LoginModal;
