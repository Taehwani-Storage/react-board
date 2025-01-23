import {React, useEffect, useReducer, useState} from 'react';
import {useParams} from "react-router";
import axios from "axios";

let initialState = {
    list: [],
    startPage: 0,
    endPage: 0,
    maxPage: 0,
    currentPage: 0
}

function ShowAll() {
    let [state, dispatch] = useReducer(null, initialState)

    let {pageNo} = useParams()
    let [list, setList] = useState([])
    let startPage: number
    let currentPage: number
    let endPage: number
    let maxPage: number

    useEffect(() => {
        axios.get(`http://localhost:8080/api/board/showAll/${pageNo}`)
            .then((resp) => {
                let {data} = resp
                if (data.result === 'success') {
                    setList(data.list)
                }
            }), []
    })

    return (
        <div>
            <h1>{pageNo}</h1>
        </div>
    )
}

export default ShowAll