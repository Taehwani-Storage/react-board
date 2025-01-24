import React, {useReducer} from "react";
import {Form, Button, Container, Card, Row, Col} from "react-bootstrap";
import {UserReducer} from "../reducers/UserReducer.tsx";
import axios from "axios";
import Swal from "sweetalert2";

const initialState = {
    inputs: {
        username: '',
        password: '',
        nickname: ''
    }
};

function Register() {
    const [state, dispatch] = useReducer(UserReducer, initialState);
    const {username, password, nickname} = state.inputs;

    const onChange = (e) => {
        const {name, value} = e.target;
        dispatch({
            type: 'ON_CHANGE',
            name,
            value
        });
    };

    const onRegister = () => {
        axios.post('http://localhost:8080/api/user/register', {
            username,
            password,
            nickname
        }).then((resp) => {
            const {data} = resp;
            if (data.result === 'fail') {
                Swal.fire({
                    icon: "error",
                    title: data.message
                });
            } else {
                Swal.fire({
                    icon: "success",
                    title: "회원가입 성공!!"
                }).then(() => {
                    location.href = '/';
                });
            }
        });
    };

    return (
        <Container className="d-flex justify-content-center align-items-center vh-100 bg-light">
            <Card className="shadow" style={{width: '100%', maxWidth: '500px'}}>
                <Card.Body>
                    <h1 className="text-center mb-4" style={{fontSize: "2rem", fontWeight: "bold"}}>
                        회원가입
                    </h1>
                    <p className="text-center text-muted mb-4">간단한 정보로 게시판을 이용하세요!</p>
                    <Form>
                        <Form.Group className="mb-3" controlId="formUsername">
                            <Form.Label>아이디</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="아이디를 입력하세요"
                                name="username"
                                value={username}
                                onChange={onChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formPassword">
                            <Form.Label>비밀번호</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="비밀번호를 입력하세요"
                                name="password"
                                value={password}
                                onChange={onChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-4" controlId="formNickname">
                            <Form.Label>닉네임</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="닉네임을 입력하세요"
                                name="nickname"
                                value={nickname}
                                onChange={onChange}
                                required
                            />
                        </Form.Group>
                        <Button variant="primary" className="w-100 mb-3" size="lg" onClick={onRegister}>
                            가입완료
                        </Button>
                    </Form>
                    <Row className="text-center">
                        <Col>
                            <p className="text-muted">이미 계정이 있으신가요? <a href="/" className="text-primary">로그인</a></p>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </Container>
    );
}

export default Register;
