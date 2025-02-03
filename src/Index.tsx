import React, {useReducer} from "react";
import {UserReducer} from "./reducers/UserReducer.tsx";
import axios from "axios";
import Swal from "sweetalert2";
import {Container, Form, Button, Card, Row, Col} from "react-bootstrap";

let initialState: { inputs: { username: string, password: string } } = {
    inputs: {
        username: '',
        password: ''
    }
};

function Index() {
    let [state, dispatch] = useReducer(UserReducer, initialState);
    let {username, password} = state.inputs;

    let onChange = (e) => {
        let {name, value} = e.target;
        dispatch({
            type: 'ON_CHANGE',
            name,
            value
        });
    };

    let onLogIn = () => {
        // Axios, React에서 사용하는 비동기 통신 라이브러리.
        // Ajax와 동일한 기능을 하지만,
        // jQuery가 제공하는 기능이 아닌 React용 라이브러리.
        axios
            .post('http://localhost:8080/api/user/auth', {username: username, password: password})
            .then((resp) => {
                // axios는 통신성공, 통신실패 에 대한 처리를 ajax처럼 객체 안의
                // 어트리뷰트로 처리하는 것이 나닌 지금과 같은 .then이라는 함수를 통해 실행.
                let {data} = resp;
                if (data.result === 'success') {
                    sessionStorage.setItem('token', data.token)
                    location.href = '/board/showAll/1';
                } else {
                    Swal.fire({
                        icon: "error",
                        title: data.message
                    });
                }
            }).catch((e) => console.log(e));
    };

    let moveToRegister = () => {
        location.href = '/user/register';
    };

    return (
        <Container className="d-flex justify-content-center align-items-center" style={{minHeight: "100vh"}}>
            <Card style={{width: "100%", maxWidth: "400px"}} className="p-4 shadow">
                <Card.Body>
                    {/* 로고 */}
                    <div className="text-center mb-4">
                        <h1 className="display-4 fw-bold" style={{color: "dark"}}>
                            REACT BOARD
                        </h1>
                        <p className="text-muted">리액트 + 스프링 게시판</p>
                    </div>

                    {/* 로그인 폼 */}
                    <Form>
                        <Form.Group className="mb-3" controlId="username">
                            <Form.Label>아이디</Form.Label>
                            <Form.Control
                                type="text"
                                name="username"
                                value={username}
                                onChange={onChange}
                                placeholder="아이디를 입력하세요"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="password">
                            <Form.Label>비밀번호</Form.Label>
                            <Form.Control
                                type="password"
                                name="password"
                                value={password}
                                onChange={onChange}
                                placeholder="비밀번호를 입력하세요"
                            />
                        </Form.Group>
                        <Button variant="primary" className="w-100" onClick={onLogIn}>
                            로그인
                        </Button>
                    </Form>

                    {/* 회원가입 및 외부 로그인 */}
                    <div className="mt-4 text-center">
                        <Button variant="secondary" className="w-100 mb-2" onClick={moveToRegister}>
                            회원가입
                        </Button>
                        <Row>
                            <Col>
                                <Button variant="outline-success" className="w-100">
                                    네이버 로그인
                                </Button>
                            </Col>
                            <Col>
                                <Button variant="outline-warning" className="w-100">
                                    카카오 로그인
                                </Button>
                            </Col>
                        </Row>
                    </div>
                </Card.Body>
            </Card>
        </Container>
    );
}

export default Index;
