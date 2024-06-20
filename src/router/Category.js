import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';  // URL 매개변수 가져오기 위해 사용
import { Modal, Button, Carousel, Form } from 'react-bootstrap';
import axios from 'axios';
import "../css/App_border.css";

function Category() {
    const { category } = useParams();  // URL 매개변수에서 카테고리 가져오기
    const [data, setData] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [editModal, setEditModal] = useState(false);
    const [newTitle, setNewTitle] = useState("");

    const handleOpenModal = (item) => {
        setSelectedItem(item);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setSelectedItem(null);
        setShowModal(false);
    };

    const handleEditModal = (item) => {
        setSelectedItem(item);
        setNewTitle(item.title);
        setEditModal(true);
    };

    const handleEditClose = () => {
        setSelectedItem(null);
        setEditModal(false);
    };

    const handleSave = async () => {
        try {
            await axios.post(`http://localhost:3001/b_${category}/update`, {
                ID: selectedItem.ID,
                TITLE: newTitle,
            });
            setData((prevData) =>
                prevData.map((item) =>
                    item.ID === selectedItem.ID ? { ...item, TITLE: newTitle } : item
                )
            );
            handleEditClose();
        } catch (error) {
            console.error('Error updating data:', error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/b_${category}`);
                setData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [category]);

    return (
        <div className="container_border">
            <div className="header_box"></div>
            <div className="row">
                {data.map((item, index) => (
                    <Card key={index} item={item} onOpenModal={handleOpenModal} onEditModal={handleEditModal} />
                ))}
            </div>

            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>{selectedItem && selectedItem.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Carousel>
                        {selectedItem && Object.keys(selectedItem).filter(key => key.startsWith('IMG')).map((key, index) => (
                            selectedItem[key] && (
                                <Carousel.Item key={index}>
                                    <img
                                        className="d-block w-100"
                                        src={`data:image/png;base64,${selectedItem[key]}`}
                                        alt={`${selectedItem.TITLE} ${index + 1}`}
                                    />
                                </Carousel.Item>
                            )
                        ))}
                    </Carousel>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
                </Modal.Footer>
            </Modal>

            <Modal show={editModal} onHide={handleEditClose}>
                <Modal.Header closeButton>
                    <Modal.Title>제목 수정</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formTitle">
                            <Form.Label>새로운 제목</Form.Label>
                            <Form.Control
                                type="text"
                                value={newTitle}
                                onChange={(e) => setNewTitle(e.target.value)}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleEditClose}>Close</Button>
                    <Button variant="primary" onClick={handleSave}>Save changes</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

function Card({ item, onOpenModal, onEditModal }) {
    return (
        <div className="col-md-4 data_border">
            <Button onClick={() => onOpenModal(item)} variant="link">
                <img src={`data:image/png;base64,${item.IMG1}`} alt={item.TITLE} />
            </Button>
            <h5>{item.TITLE}</h5>
            {/*<p>{item.description}</p>*/}
            <Button variant="warning" onClick={() => onEditModal(item)}>Edit</Button>
        </div>
    );
}

export default Category;
