import React, {useContext, useEffect, useState} from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import DeletePost from './Delete';
import { Container, Typography, Button, Box } from '@mui/material';
import {AuthContext} from "./AuthContext";
// import '../css/DetailPost.css';

function DetailPost() {
    const { user } = useContext(AuthContext);
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token')
        const fetchPost = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/posts/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setPost(response.data);
            } catch (error) {
                console.error('Failed to fetch post:', error);
                setError(error);
            }
        };

        fetchPost();
    }, [id]);

    if (error) {
        return <div>Failed to fetch post: {error.message}</div>;
    }

    if (!post) {
        return <div>Loading...</div>;
    }

    const imageUrl = post.IMAGE_PATH ? `http://localhost:3001${post.IMAGE_PATH}` : null;

    // 디버깅용 콘솔 로그
    console.log("User ID:", user ? user.id : "No User");
    console.log("Post Author ID:", post.AUTHOR_ID);

    const handleEdit = () => {
        navigate(`/edit/${post.ID}`);
    };

    return (
        <>
        <div className="header_box"></div>
        <Container className="detail-post-container">
            <Typography variant="h4" gutterBottom className="detail-post-title">
                {post.TITLE}
            </Typography>
            <Typography variant="body1" paragraph className="detail-post-content">
                {post.CONTENT}
            </Typography>
            {imageUrl && <img src={imageUrl} alt="Post" className="detail-post-image" />}
            {user && user.id === post.AUTHOR_ID && ( // 로그인한 유저의 ID와 작성자의 ID가 일치할 경우에만 버튼 활성화
                <Box mt={2} className="detail-post-buttons">
                    <Button variant="contained" color="primary" onClick={handleEdit} style={{ marginRight: '10px' }}>
                        수정
                    </Button>
                    <DeletePost postId={post.ID} onDelete={() => navigate('/posts')} />
                </Box>
            )}
        </Container>
            </>
    );
}

export default DetailPost;
