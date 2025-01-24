import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';

import {BrowserRouter, Route, Routes} from "react-router";
import Index from "./Index.tsx";
import React from "react";
import Register from "./user/Register.tsx";
import ShowAll from "./board/ShowAll.tsx";
import ShowOne from "./board/ShowOne.tsx";

/* Typescript 기초형식
interface User {
    id: number,
    name: string,
    isTrue: boolean
}*/

function App() {
    /* Typescript 형태
    let number:number;
    number = 4

    let value:{id:number, name:string, isTrue:boolean}
    value = {id: 3, name: '홍길동', isTrue: false}*/
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Index />}/>
                <Route path="/user/Register" element={<Register />}/>
                <Route path="/board/showAll/:pageNo" element={<ShowAll />}/>
                <Route path="/board/showOne/:id" element={<ShowOne />}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App
