import {React, useEffect, useReducer, useState} from 'react';
import {useNavigate, useParams} from "react-router";
import axios from "axios";
import {reducer} from "../reducers/BoardReducer.tsx";
import {Button, Form, Table} from "react-bootstrap";
import ReplySection from "./ReplySection.tsx";

function ShowOne() {
    let {id} = useParams()
    let [state, dispatch] = useReducer(reducer, {})
    let [isUpdating, setIsUpdating] = useState(false)
    let [updateContent, setUpdateContent] = useState("")
    let navigate = useNavigate()

    useEffect(() => {
        axios.get(`http://localhost:8080/api/board/showOne/${id}`)
            .then((resp) => {
                let {data} = resp
                if (data.result === 'success') {
                    dispatch({
                        type: 'ON_SHOW_ONE_LOAD',
                        item: data.boardDTO
                    })
                }
            })
    }, [])

    let handleUpdate = () => {
        setIsUpdating(true)
        setUpdateContent(state.content)
    }

    let handleSave = () => {
        axios.put(`https://localhost:8080/api/board/update/${id}`, {content: updateContent})
            .then((resp) => {
                if (resp.data.result === 'success') {
                    setIsUpdating(false)
                    dispatch({
                        type: 'ON_SHOW_ONE_EDIT',
                        content: updateContent
                    })
                }
            })
    }

    let handleDelete = () => {
        if (window.confirm('정말 삭제하시겠습니까?')) {
            axios.delete(`https://localhost:8080/api/board/delete/${id}`)
                .then((resp) => {
                    if (resp.data.result === 'success') {
                        alert("삭제 완료!!")
                        navigate('/board/showAll/1')
                    }
                })
        }
    }

    return (
        <div>
            <Table>
                <thead/>
                <tbody>
                <tr>
                    <td>글 번호</td>
                    <td>{state.id}</td>
                </tr>
                <tr>
                    <td>작성자</td>
                    <td>{state.nickname}</td>
                </tr>
                <tr>
                    <td>작성일</td>
                    <td>{state.formattedEntryDate}</td>
                </tr>
                <tr>
                    <td>수정일</td>
                    <td>{state.formattedModifyDate}</td>
                </tr>
                <tr>
                    <td colSpan={2}>내용</td>
                </tr>
                <tr>
                    <td colSpan={2}>
                        {isUpdating ? (
                            <Form.Control
                                as="textarea"
                                value={updateContent}
                                onChange={(e) =>
                                    setUpdateContent(e.target.value)}
                            />
                        ) : (
                            state.content
                        )}
                    </td>
                </tr>
                </tbody>
            </Table>
            <div>
                {isUpdating ? (
                    <Button variant="success" onClick={handleSave}>저장</Button>
                ) : (
                    <Button variant="primary" onClick={handleUpdate}>수정</Button>
                )}
                <Button variant="danger" onClick={handleDelete}>삭제</Button>
            </div>
            <hr/>
            <ReplySection boardId={id}/>
        </div>
    )
}

export default ShowOne