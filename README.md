다음은 업로드한 디렉토리 구조를 반영하여 **React(TypeScript) 게시판 미니 프로젝트**의 설명을 작성한 내용입니다. **Java Learning Guide** 스타일을 참고하여 구성했습니다.  

---

# 📌 React(TypeScript) 게시판 미니 프로젝트 가이드

## 1️⃣ 개요  
이 프로젝트는 **React + TypeScript**를 사용하여 간단한 게시판을 구현한 프론트엔드 애플리케이션입니다.  
게시글 목록 조회, 상세 보기, 글 작성 및 댓글 기능을 포함하고 있으며, Redux를 활용한 상태 관리를 적용했습니다.

---

## 2️⃣ 프로젝트 환경  
✅ **프레임워크**: React + Vite + TypeScript  
✅ **상태관리**: Redux (Reducer 활용)  
✅ **라우팅**: React Router  
✅ **API 통신**: Axios (RESTful API)  
✅ **스타일링**: CSS 적용  

---

## 3️⃣ 폴더 구조  
📂 프로젝트 폴더 구조는 다음과 같습니다.

```
src
 ├── assets
 │   └── react.svg             # React 로고 이미지
 │
 ├── board                     # 게시판 관련 컴포넌트
 │   ├── Banner.tsx            # 배너 UI 컴포넌트
 │   ├── ReplySection.tsx      # 댓글 섹션
 │   ├── ShowAll.tsx           # 게시글 목록 조회
 │   ├── ShowOne.tsx           # 게시글 상세 보기
 │   ├── SortBar.tsx           # 정렬 바 UI
 │   ├── Write.tsx             # 게시글 작성 폼
 │
 ├── reducers                  # Redux Reducer 폴더
 │   ├── BoardReducer.tsx      # 게시판 상태 관리
 │   ├── UserReducer.tsx       # 사용자 상태 관리
 │
 ├── user                      # 사용자 관련 컴포넌트
 │   ├── Register.tsx          # 회원가입 컴포넌트
 │
 ├── App.css                   # 전역 스타일
 ├── App.tsx                   # 메인 앱 컴포넌트
 ├── Index.tsx                 # React 엔트리 포인트
 ├── index.css                 # 글로벌 스타일 파일
 ├── main.tsx                  # Vite 엔트리 포인트
 ├── vite-env.d.ts             # Vite 타입 설정
 ├── README.md                 # 프로젝트 설명 파일
```

---

## 4️⃣ 주요 기능  

### 📜 4.1 게시글 목록 조회 (ShowAll.tsx)  
게시글 목록을 API에서 불러와 화면에 출력합니다.

```tsx
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

interface Post {
  id: number;
  title: string;
}

const ShowAll = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    axios.get("/api/posts")
      .then(response => setPosts(response.data))
      .catch(error => console.error("게시글을 불러오는 중 오류 발생:", error));
  }, []);

  return (
    <div>
      <h1>📜 게시글 목록</h1>
      <ul>
        {posts.map(post => (
          <li key={post.id}>
            <Link to={`/posts/${post.id}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShowAll;
```

---

### 📝 4.2 게시글 작성 (Write.tsx)  
새로운 게시글을 작성하고 저장할 수 있습니다.

```tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Write = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("/api/posts", { title, content });
      navigate("/");
    } catch (error) {
      console.error("게시글 저장 중 오류 발생:", error);
    }
  };

  return (
    <div>
      <h2>📝 새 게시글 작성</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="제목" value={title} onChange={(e) => setTitle(e.target.value)} />
        <textarea placeholder="내용" value={content} onChange={(e) => setContent(e.target.value)} />
        <button type="submit">작성 완료</button>
      </form>
    </div>
  );
};

export default Write;
```

---

### 🔍 4.3 게시글 상세 보기 (ShowOne.tsx)  
게시글 상세 정보를 API에서 가져와 출력합니다.

```tsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

interface Post {
  id: number;
  title: string;
  content: string;
}

const ShowOne = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    axios.get(`/api/posts/${id}`)
      .then(response => setPost(response.data))
      .catch(error => console.error("게시글 불러오기 실패:", error));
  }, [id]);

  if (!post) return <p>게시글을 불러오는 중...</p>;

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </div>
  );
};

export default ShowOne;
```

---

### 💬 4.4 댓글 기능 (ReplySection.tsx)  
댓글을 조회하고 화면에 표시합니다.

```tsx
import { useEffect, useState } from "react";
import axios from "axios";

interface Comment {
  id: number;
  text: string;
  author: string;
}

const ReplySection = ({ postId }: { postId: number }) => {
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    axios.get(`/api/posts/${postId}/comments`)
      .then(response => setComments(response.data))
      .catch(error => console.error("댓글 불러오기 실패:", error));
  }, [postId]);

  return (
    <div>
      <h3>💬 댓글</h3>
      <ul>
        {comments.map(comment => (
          <li key={comment.id}>
            {comment.text} - {comment.author}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReplySection;
```

---

## 5️⃣ Redux 상태 관리 (reducers/BoardReducer.tsx)
게시판 관련 전역 상태를 관리합니다.

```tsx
import { createSlice } from "@reduxjs/toolkit";

interface BoardState {
  posts: { id: number; title: string; content: string }[];
}

const initialState: BoardState = {
  posts: [],
};

const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    setPosts: (state, action) => {
      state.posts = action.payload;
    },
  },
});

export const { setPosts } = boardSlice.actions;
export default boardSlice.reducer;
```

---

## 🚀 결론  
이 프로젝트는 **React + TypeScript + Redux**를 활용하여 게시판을 구현한 프론트엔드 애플리케이션입니다.  
추가적으로 **페이징 처리, 좋아요 기능, 사용자 인증** 등을 확장하여 발전시킬 수 있습니다.  
🔥 완성도를 높이며 성장하는 개발자가 되어 보세요! 🎉  
