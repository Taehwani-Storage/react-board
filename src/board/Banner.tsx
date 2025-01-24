import React from 'react';
import {Container, Button, Navbar} from 'react-bootstrap';

function Banner({nickname}) {
    let handleLogout = () => {
        // 로그아웃 로직 추가
        alert("로그아웃되었습니다.");
    };

    return (
        <Navbar bg="dark" className="py-3" style={{borderBottom: "1px solid #dee2e6"}}>
            <Container className="d-flex justify-content-between align-items-center">
                {/* 제목과 문구를 가운데 정렬 */}
                <div className="text-center w-100 text-white">
                    <h1 className="display-5">전체 게시판</h1>
                    <p className="mb-0">다양한 게시글을 확인하고, 의견을 공유해보세요!</p>
                </div>
                {/* 로그인 정보와 로그아웃 버튼 */}
                <div className="text-right text-white" style={{position: "absolute", right: "20px", top: "20px"}}>
                    <p className="mb-2">로그인 중: <strong>{nickname}</strong></p>
                    <Button variant="outline-light" size="sm" onClick={handleLogout}>
                        로그아웃
                    </Button>
                </div>
            </Container>
        </Navbar>
    );
}

export default Banner;
