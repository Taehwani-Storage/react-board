# 📝 리액트 게시판 미니 프로젝트 (프론트엔드 - TypeScript)

이 프로젝트는 **React (TypeScript)** 를 활용하여 백엔드(Spring)에서 구현된 게시판의 프론트엔드를 담당합니다.  
사용자는 **게시글 목록 조회, 게시글 작성, 수정, 삭제, 댓글 기능**을 웹 UI를 통해 사용할 수 있습니다.  

## 📌 프로젝트 환경
- **프레임워크**: React (TypeScript 기반, `.tsx` 확장자 사용)
- **상태관리**: React Hooks (useState, useEffect)
- **라우팅**: React Router
- **스타일링**: Tailwind CSS
- **API 통신**: Axios (RESTful API)
- **아이콘**: Lucide-react
- **타입 정의**: TypeScript 인터페이스 활용

## 📂 프로젝트 폴더 구조
```
/src
 ├── components  # UI 컴포넌트 폴더
 │   ├── PostList.tsx  # 게시글 목록
 │   ├── PostDetail.tsx  # 게시글 상세 보기
 │   ├── PostForm.tsx  # 게시글 작성/수정 폼
 │   ├── CommentList.tsx  # 댓글 목록
 │   └── CommentForm.tsx  # 댓글 작성 폼
 ├── pages
 │   ├── Home.tsx  # 메인 페이지
 │   ├── PostPage.tsx  # 게시글 페이지
 │   ├── EditPostPage.tsx  # 게시글 수정 페이지
 │   └── NotFound.tsx  # 404 페이지
 ├── api
 │   ├── postApi.ts  # 게시판 관련 API 요청
 │   └── commentApi.ts  # 댓글 관련 API 요청
 ├── types
 │   ├── post.ts  # 게시글 타입 정의
 │   ├── comment.ts  # 댓글 타입 정의
 ├── App.tsx  # 메인 컴포넌트
 ├── index.tsx  # 진입점
 └── styles.css  # 스타일링
```

## 📌 게시글 목록 보기 (PostList.tsx)
```tsx
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Post } from "../types/post";

const PostList = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    axios.get<Post[]>("/api/posts")
      .then(response => setPosts(response.data))
      .catch(error => console.error("게시글을 불러오는 중 오류 발생:", error));
  }, []);

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">📜 게시글 목록</h1>
      <ul>
        {posts.map(post => (
          <li key={post.id} className="border p-4 my-2">
            <Link to={`/posts/${post.id}`} className="text-xl text-blue-500">
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostList;
```

## 🖊️ 게시글 작성 및 수정 (PostForm.tsx)
```tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Post } from "../types/post";

type PostFormProps = {
  post?: Post;
};

const PostForm: React.FC<PostFormProps> = ({ post }) => {
  const [title, setTitle] = useState(post?.title || "");
  const [content, setContent] = useState(post?.content || "");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const postData = { title, content };

    try {
      if (post) {
        await axios.put(`/api/posts/${post.id}`, postData);
      } else {
        await axios.post("/api/posts", postData);
      }
      navigate("/");
    } catch (error) {
      console.error("게시글 저장 중 오류 발생:", error);
    }
  };

  return (
    <div className="container mx-auto">
      <h2 className="text-xl font-bold">{post ? "✏️ 게시글 수정" : "📝 새 게시글 작성"}</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="text"
          placeholder="제목을 입력하세요"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border p-2 my-2"
        />
        <textarea
          placeholder="내용을 입력하세요"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full border p-2 my-2"
        />
        <button type="submit" className="bg-blue-500 text-white p-2">
          {post ? "수정 완료" : "작성 완료"}
        </button>
      </form>
    </div>
  );
};

export default PostForm;
```

## 🗑️ 게시글 삭제 기능
```tsx
import axios from "axios";

const deletePost = async (postId: number) => {
  if (window.confirm("정말 삭제하시겠습니까?")) {
    try {
      await axios.delete(`/api/posts/${postId}`);
      alert("삭제되었습니다.");
      window.location.reload();
    } catch (error) {
      console.error("삭제 중 오류 발생:", error);
    }
  }
};
```

## 🌐 RESTful API 연동
```ts
import axios from "axios";
import { Post } from "../types/post";

export const getPosts = () => axios.get<Post[]>("/api/posts");
export const getPostById = (id: number) => axios.get<Post>(`/api/posts/${id}`);
export const createPost = (data: Post) => axios.post("/api/posts", data);
export const updatePost = (id: number, data: Post) => axios.put(`/api/posts/${id}`, data);
export const deletePost = (id: number) => axios.delete(`/api/posts/${id}`);
```

## 🚀 결론
이 게시판 프론트엔드 프로젝트는 **React (TypeScript), Axios, Tailwind CSS**를 활용하여 직관적이고 간결한 UI를 제공합니다.  
RESTful API를 통해 백엔드와 연동되며, 게시글 및 댓글 CRUD 기능을 포함하고 있습니다.  
🔥 더욱 완성도 높은 프로젝트를 위해 발전시켜 보세요! 🎉
