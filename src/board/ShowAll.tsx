import React, {useEffect, useReducer} from 'react';
import {useParams} from "react-router";
import axios from "axios";
import {reducer} from "../reducers/BoardReducer.tsx";
import {Pagination, Card, Container, Row, Col, Table} from "react-bootstrap";
import Banner from "./Banner.tsx";
import SortBar from "./SortBar.tsx";

let initialState = {
    list: [],
    startPage: 1,
    endPage: 0,
    maxPage: 0,
    currentPage: 0
};

function ShowAll() {
    let [state, dispatch] = useReducer(reducer, initialState);
    let {pageNo} = useParams();

    useEffect(() => {
        axios.get(`http://localhost:8080/api/board/showAll/${pageNo}`)
            .then((resp) => {
                let {data} = resp;
                if (data.result === 'success') {
                    dispatch({
                        type: 'ON_SHOWALL_LOAD',
                        temp: {
                            list: data.list,
                            startPage: data.startPage,
                            currentPage: data.currentPage,
                            endPage: data.endPage,
                            maxPage: data.maxPage
                        }
                    });
                }
            });
    }, [pageNo]);

    const handleSortChange = (category) => {
        alert(`정렬 기준 변경: ${category}`);
        // 정렬 로직 추가
    };

    return (
        <div>
            {/* 상단 배너 */}
            <Banner nickname="홍길동"/>

            {/* 정렬 탭 배너 */}
            <SortBar onSortChange={handleSortChange}/>

            {/* 게시판 카드 */}
            <Container>
                <Row className="gy-4">
                    {state.list.map((board) => (
                        <Col md={4} key={board.id}>
                            <Table onClick={() => (location.href = `/board/showOne/${board.id}`)}
                                   style={{cursor: "pointer"}}>
                                <p>{board.title}</p>
                                <p className="mb-2 text-muted">
                                    작성자: {board.nickname}
                                </p>
                                <p>
                                    작성일: {board.formattedEntryDate}
                                </p>
                                <p>
                                    수정일: {board.formattedModifyDate}
                                </p>
                            </Table>
                        </Col>
                    ))}
                </Row>

                {/* 페이지네이션 */}
                <div className="d-flex justify-content-center mt-4">
                    <Pagination>
                        <Pagination.Item key={1} href={'/board/showAll/1'}>
                            {'<<'}
                        </Pagination.Item>
                        {[...Array(state.endPage - state.startPage + 1).keys()].map(i => (
                            <Pagination.Item key={i + state.startPage}
                                             active={i + state.startPage === state.currentPage}
                                             href={`/board/showAll/${i + state.startPage}`}>
                                {i + state.startPage}
                            </Pagination.Item>
                        ))}
                        <Pagination.Item key={state.maxPage} href={`/board/showAll/${state.maxPage}`}>
                            {'>>'}
                        </Pagination.Item>
                    </Pagination>
                </div>
            </Container>
        </div>
    );
}

export default ShowAll;
