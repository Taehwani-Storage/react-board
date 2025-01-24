import React, {useState} from 'react';
import axios from "axios";

function ReplySection({boardId}) {
    let [repies, setReplis] = useState([])
    let [newReply, setNewReply] = useState("")

    useState(() => {
        axios.get(`https://localhost:8080/api/board/reply/${boardId}`)
            .then((resp) => {
                if (resp.data.result === 'success') {
                    console.log(resp.data)
                }
            })
    })
    return (
        <div></div>
    );
}

export default ReplySection;