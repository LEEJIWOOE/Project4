import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { TextField, Button, Box, Typography, Container } from '@mui/material';
import { AuthContext } from './AuthContext'; // AuthContext import 추가
import "../css/mypage.css"

function Mypage() {
    const { user } = useContext(AuthContext); // AuthContext에서 user 가져오기
    const [userInfo, setUserInfo] = useState({
        nickname: '',
        realname: '',
        mileage: 0
    });
    const [mileageAmount, setMileageAmount] = useState(0);

    const handleMileageChange = (event) => {
        setMileageAmount(event.target.value);
    };

    useEffect(() => {
        const fetchUserInfo = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('No token provided');
                return;
            }

            try {
                const response = await axios.get('http://localhost:3001/mypage', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setUserInfo({
                    nickname: response.data.NICKNAME,
                    realname: response.data.REALNAME,
                    mileage: response.data.MILEAGE
                });
            } catch (error) {
                console.error('Failed to fetch user info:', error.response ? error.response.data : error.message);
            }
        };

        fetchUserInfo();
    }, [user]);

    const handleUseMileage = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            console.error('No token provided');
            return;
        }

        try {
            const response = await axios.post('http://localhost:3001/mileage/use', { amount: mileageAmount }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (response.status === 200) {
                alert('Mileage used successfully!');
                const userInfoResponse = await axios.get('http://localhost:3001/mypage', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setUserInfo({
                    nickname: userInfoResponse.data.NICKNAME,
                    realname: userInfoResponse.data.REALNAME,
                    mileage: userInfoResponse.data.MILEAGE
                });
            }
        } catch (error) {
            console.error('Failed to use mileage:', error.response ? error.response.data : error.message);
            alert('Failed to use mileage.');
        }
    };

    return (
        <div>
            <div className="Mypage_header_box"></div>
            <Container maxWidth="sm">
                <Box sx={{ mt: 4 }}>
                    <Typography variant="h4" component="h1" gutterBottom>
                        My Page
                    </Typography>
                    <Box sx={{ mt: 2 }}>
                        <Typography variant="subtitle1">
                            Nickname: {userInfo.nickname}
                        </Typography>
                        <Typography variant="subtitle1">
                            Real Name: {userInfo.realname}
                        </Typography>
                        <Typography variant="subtitle1">
                            Mileage: {userInfo.mileage}
                        </Typography>
                    </Box>
                    <Box sx={{ mt: 4 }}>
                        <Typography variant="h6" component="h2" gutterBottom>
                            Mileage Management
                        </Typography>
                        <TextField
                            label="Amount"
                            type="number"
                            value={mileageAmount}
                            onChange={handleMileageChange}
                            fullWidth
                            sx={{ mb: 2 }}
                        />
                        <Button variant="contained" color="secondary" onClick={handleUseMileage}>
                            Use Mileage
                        </Button>
                    </Box>
                </Box>
            </Container>
        </div>
    );
}

export default Mypage;
