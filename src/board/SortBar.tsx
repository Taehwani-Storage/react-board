import React from 'react';
import {Nav} from 'react-bootstrap';

function SortBar({onSortChange}) {
    return (
        <Nav fill variant="tabs" className="bg-light mb-3">
            <Nav.Item>
                <Nav.Link onClick={() => onSortChange('all')} eventKey="all">전체글</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link onClick={() => onSortChange('general')} eventKey="general">일반</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link onClick={() => onSortChange('notice')} eventKey="notice">공지</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link onClick={() => onSortChange('question')} eventKey="question">질문</Nav.Link>
            </Nav.Item>
        </Nav>
    );
}

export default SortBar;
