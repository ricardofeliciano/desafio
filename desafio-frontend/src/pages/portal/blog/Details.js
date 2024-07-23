import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import DataFormat from '../../../components/utils/Date';

const Container = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
`;

const Title = styled.h2`
  margin-bottom: 20px;
  text-align: center;
  font-size: 2rem;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const PostImage = styled.img`
  width: 100%; 
  height: auto;
  border-radius: 4px;
  margin-bottom: 20px;
`;

const PostDescription = styled.p`
  font-size: 1.2rem;
  line-height: 1.6;
`;

const CommentsSection = styled.div`
  margin-top: 40px;
`;

const CommentList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const CommentItem = styled.li`
  border-bottom: 1px solid #ccc;
  padding: 10px 0;
`;

const CommentForm = styled.form`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
`;

const CommentTextArea = styled.textarea`
  padding: 10px;
  font-size: 1rem;
  margin-bottom: 10px;
  border-radius: 4px;
  border: 1px solid #ccc;
`;

const CommentButton = styled.button`
  align-self: flex-end;
  padding: 10px 20px;
  font-size: 1rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;
const Content = styled.div`
  width: 100%;
  display: flex;
  position: relative;
`;

const PostDate = styled.span`
  margin: 0;
  color: #000;
  position: absolute;
  right: 0;
 
`;
function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    getArticle();
   
  }, [id]);



  const getArticle = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API}/api/articles/list/${id}`);
      if (response.status === 200) {
        const { data } = response;
        await setPost(data);
        getComments(data.id);
      }
    } catch (error) {
      console.error('Erro', error);
    }
  };

  const getComments = async (postId) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API}/api/article/comments/${postId}`);
      if (response.status === 200) {
        setComments(response.data);
      }
    } catch (error) {
      console.error('Erro', error);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_API}/api/comments`, {
        article_id: post.id,
        content: newComment,
      });
      if (response.status === 201) {
        setNewComment('');
        getArticle();
      }
    } catch (error) {
      console.error('Erro', error);
    }
  };

  if (!post) return <p>Carregando...</p>;

  return (
    <Container>
      <Title>{post.title}</Title>
      <PostImage src={`${process.env.REACT_APP_API}` + post.image} alt={post.title} />
      <Content>
        <PostDate ><DataFormat data={post.created_at} /></PostDate>

      </Content>
      <PostDescription>{post.description}</PostDescription>

      <CommentsSection>
        <h3>Comentários</h3>
        <CommentList>
          {comments.map(comment => (
            <CommentItem key={comment.id}>
              {comment.content}
            </CommentItem>
          ))}
        </CommentList>

        <CommentForm onSubmit={handleCommentSubmit}>
          <CommentTextArea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Adicione um comentário..."
          />
          <CommentButton type="submit">Comentar</CommentButton>
        </CommentForm>
      </CommentsSection>
    </Container>
  );
}

export default PostDetail;
