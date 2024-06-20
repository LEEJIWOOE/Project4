import React, {useState, useEffect, useContext} from 'react';
import axios from 'axios';
import { Container, Grid, Card, CardContent, Typography, Button, Link as MuiLink } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import '../css/post.css'
import {AuthContext} from "./AuthContext";

function decodeHtml(html) {
    const txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value;
}

function formatDate(dateString) {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
        return 'Invalid Date';
    }
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return date.toLocaleDateString('ko-KR', options);
}

function Posts() {
    const { user } = useContext(AuthContext); // AuthContext에서 user 가져오기
    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(10);
    const navigate = useNavigate();

    useEffect(() => {
        fetchPosts();
    }, [user]);

    const fetchPosts = async () => {
        const token = localStorage.getItem('token')
        try {
            const response = await axios.get('http://localhost:3001/posts',{
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            console.log('Fetched Posts:', response.data); // 데이터 확인
            setPosts(response.data);
        } catch (error) {
            console.error('Failed to fetch posts:', error);
        }
    };

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

    const paginate = pageNumber => setCurrentPage(pageNumber);

    const handleCreatePost = () => {
        navigate('/create');
    };

    return (
        <>
            <div className="Post_header_box"></div>
        <Container style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: "blue" }}>
            <Typography variant="h4" gutterBottom>
                게시판
            </Typography>
            <Grid container spacing={4} style={{ flex: 1 }}>
                {currentPosts.map((post) => (
                    <Grid item key={post.ID} xs={12}>
                        <Card>
                            <CardContent>
                                <Typography variant="h5">
                                    <MuiLink component={Link} to={`/posts/${post.ID}`} color="textPrimary">
                                        {decodeHtml(post.TITLE)}
                                    </MuiLink>
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    {formatDate(post.CREATED_AT)}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 'auto' }}>
                {user && (
                    <Button variant="contained" color="primary" onClick={handleCreatePost}>
                        글 작성
                    </Button>
                )}
            </div>
            <div>
                {[...Array(Math.ceil(posts.length / postsPerPage)).keys()].map(number => (
                    <Button key={number} onClick={() => paginate(number + 1)}>
                        {number + 1}
                    </Button>
                ))}
            </div>
        </Container>
            </>
    );
}

export default Posts;
