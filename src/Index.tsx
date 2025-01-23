import React, {useReducer} from "react"
import {UserReducer} from "./reducers/UserReducer.tsx";
import axios from "axios";
import Swal from "sweetalert2"

let initialState: { username: string, password: string } =
    {
        inputs: {
            username: '',
            password: ''
        }
    }

function Index() {
    let [state, dispatch] = useReducer(UserReducer, initialState)
    let {username, password} = state.inputs

    let onChange = (e) => {
        let {name, value} = e.target
        dispatch({
            type: 'ON_CHANGE',
            name,
            value

        })
    }

    let onLogIn = () => {
        // Axios, React에서 사용하는 비동기 통신 라이브러리.
        // Ajax와 동일한 기능을 하지만,
        // jQuery가 제공하는 기능이 아닌 React용 라이브러리.
        let result = axios
            .post(
                'http://localhost:8080/api/user/auth', {username: username, password: password}
            )
            .then((resp) => {
                // axios는 통신성공, 통신실패 에 대한 처리를 ajax처럼 객체 안의
                // 어트리뷰트로 처리하는 것이 나닌 지금과 같은 .then이라는 함수를 통해 실행.
                let {data} = resp
                if (data.result === 'success') {
                    location.href='/board/showAll/1'
                } else {
                    Swal.fire({
                        icon: "error",
                        title: data.message
                    })
                }
            }).catch((e) => console.log(e))
        let moveToRegister = () => {
            location.href = '/user/register'
        }
    }

    return (
        <div>
            <input name='username' value={username} onChange={onChange}/> <br/>
            <input type='password' name='password' value={password} onChange={onChange}/> <br/>
            <button onClick={onLogIn}>로그인</button>
            <button onClick={onLogIn}>회원가입</button>
        </div>
    )
}

export default Index