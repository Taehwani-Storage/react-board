import {React, useReducer} from "react";
import {reducer} from "../reducers/BoardReducer.tsx";
import axios from "axios";

let initialState = {
    inputs: {
        title: '',
        content: ''
    }
}

function Write() {
    let [state, dispatch] = useReducer(reducer, initialState)
    let {title, content} = state.inputs

    let token = sessionStorage.getItem('token')
    let onChange = (e) => {
        let {name, value} = e.target

        dispatch({
            type: 'ON_CHANGE',
            name,
            value
        })
    }

    let onWrite = () => {
        axios.post('http://localhost:8080/api/board/write',
            {
                title: title, content: content
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                },

            }).then(resp => {
                let {data} = resp
                if(data.result === 'success') {
                    location.href = `/board/showOne/${data.boardDTO.id}`
                }
        })
    }

    return (
        <>
            제목: <input type='text' placeholder='제목' name='title' value={title} onChange={onChange}/>
            내용:<textarea placeholder='내용' name='content' value={content} onChange={onChange}/>
            <button onClick={onWrite}>글 등록하기</button>
        </>
    )
}

export default Write