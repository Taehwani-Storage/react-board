import React, {useReducer} from "react"
import {UserReducer} from "../reducers/UserReducer.tsx";
import axios from "axios";
import Swal from "sweetalert2";


let initialState = {
    inputs: {
        username: '',
        password: '',
        nickname: ''
    }
}

function Register() {
    let [state, dispatch] = useReducer(UserReducer, initialState)
    let {username, password, nickname} = state.inputs

    let onChange = (e) => {
        let {name, value} = e.target
        dispatch({
            type: 'ON_CHANGE',
            name,
            value
        })
    }

    let onRegister = () => {
        axios.post('http://localhost:8080/api/user/register',
            {username:username, password:password, nickname:nickname}
        ).then((resp) => {
            let {data} = resp
            if(data.result === 'fail') {
                Swal.fire({
                    icon: "error",
                    title: data.message
                })
            } else {
                Swal.fire({
                    icon: "success",
                    title: "회원가입 성공!!"
                }).then(() => {
                    location.href='/'
                })
            }
        })
    }

    return (
        <div>
            <input type='text' placeholder='아이디' name='username' value={username} onChange={onChange}/> <br/>
            <input type='password' placeholder='비밀번호' name='password' value={password} onChange={onChange}/> <br/>
            <input name='nickname' placeholder='닉네임' value={nickname} onChange={onChange}/> <br/>
            <br/>
            <button onClick={onRegister}>가입하기</button>
        </div>
    )
}

export default Register

