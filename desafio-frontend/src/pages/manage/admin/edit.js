import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import Sidebar from '../../../components/utils/Sidebar';
import AdminContent from '../../../components/utils/AdminContent';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';

const Container = styled.div`
  display: flex;
  height: 100vh;
`;

const Title = styled.h2`
  margin-bottom: 20px;
  text-align: center;
  font-size: 2rem;
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Label = styled.label`
  margin-bottom: 10px;
  font-size: 1.2rem;
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const Input = styled.input`
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
  @media (max-width: 768px) {
    padding: 8px;
    font-size: 0.9rem;
  }
`;

const Textarea = styled.textarea`
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
  @media (max-width: 768px) {
    padding: 8px;
    font-size: 0.9rem;
  }
`;

const Select = styled.select`
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
  @media (max-width: 768px) {
    padding: 8px;
    font-size: 0.9rem;
  }
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
  display: flex;
  align-items: center;

  svg {
    cursor: pointer;
    margin-left: 15px;
  }
`;

const CommentForm = styled.form`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #61dafb;
  border: none;
  border-radius: 4px;
  color: white;
  cursor: pointer;
  font-size: 1rem;

  &:hover {
    background-color: #21a1f1;
  }

  @media (max-width: 768px) {
    padding: 8px 16px;
    font-size: 0.9rem;
  }
`;

function EditAdmin() {
  const { register, handleSubmit, watch, setValue } = useForm();
  const navigate = useNavigate();
  const { id } = useParams();
  const image = watch('image');
  const [comments, setComments] = useState([]);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const token = localStorage.getItem('token');
  useEffect(() => {
    getArticle();
    fetchCategories();
    fetchTags();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API}/api/category/list`,{
        headers: {          
          'Authorization': `Bearer ${token}`
        },
      });
      if (response.status === 200) {
        setCategories(response.data);
      }
    } catch (error) {
      console.error('Erro ao buscar categorias', error);
    }
  };

  const fetchTags = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API}/api/tag/list`,{
        headers: {          
          'Authorization': `Bearer ${token}`
        },
      });
      if (response.status === 200) {
        setTags(response.data);
      }
    } catch (error) {
      console.error('Erro ao buscar tags', error);
    }
  };

  const getArticle = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API}/api/articles/edit/${id}`,{
        headers: {          
          'Authorization': `Bearer ${token}`
        },
      });
      if (response.status === 200) {
        const { data } = response.data;
        setValue('title', data.title);
        setValue('image', data.image);
        setValue('description', data.description);
        if (data.category_id) {
          setValue('category', data.category_id);
        }
        if (data.tags) {
          setValue('tags', data.tags.map(tag => tag.id));
        }
        await getComments();
      } else {
        console.error('Erro ao buscar o artigo');
      }
    } catch (error) {
      console.error('Erro ao buscar o artigo', error);
    }
  };

  const getComments = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API}/api/article/comments/${id}`,{
        headers: {          
          'Authorization': `Bearer ${token}`
        },
      });
      if (response.status === 200) {
        setComments(response.data);
      }
    } catch (error) {
      console.error('Erro ao buscar comentários', error);
    }
  };

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('image', data.image[0]);
    formData.append('category_id', data.category);
    formData.append('tags', data.tags.join(','));

    try {
      const response = await axios.post(`${process.env.REACT_APP_API}/api/articles/edit/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        },
      });

      if (response.status === 201) {
        alert('Artigo editado com sucesso');
       navigate('/admin/postlist/');
      } else {
        alert('Erro ao editar o artigo');
      }
    } catch (error) {
      console.error('Erro ao enviar o formulário', error);
    }
  };

  const handleDeleteComments = async (id_comments) => {
    try {
      const response = await axios.delete(`${process.env.REACT_APP_API}/api/comments/${id_comments}`,{
        headers: {          
          'Authorization': `Bearer ${token}`
        },
      });
      if (response.status === 201) {
        alert('Comentário deletado com sucesso');
        await getComments();
      } else {
        alert('Erro ao deletar o comentário');
      }
    } catch (error) {
      console.error('Erro ao deletar o comentário', error);
    }
  };

  return (
    <Container>
      <Sidebar />
      <AdminContent>
        <Title>Editar Artigo</Title>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Label htmlFor="title">Título</Label>
          <Input id="title" {...register('title', { required: true })} />

          <Label htmlFor="image">Imagem</Label>
          <Input id="image" type="file" {...register('image', { required: true })} />

          <Label htmlFor="description">Descrição</Label>
          <Textarea id="description" rows="5" {...register('description', { required: true })} />

          <Label htmlFor="category">Categoria</Label>
          <Select id="category" {...register('category', { required: true })}>
            <option value="">Selecione uma categoria</option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.title}
              </option>
            ))}
          </Select>

          <Label htmlFor="tags">Tags</Label>
          <Select id="tags" multiple {...register('tags')}>
            {tags.map(tag => (
              <option key={tag.id} value={tag.id}>
                {tag.title}
              </option>
            ))}
          </Select>

          <Button type="submit">Editar</Button>
        </Form>
        <CommentsSection>
          <h3>Comentários</h3>
          <CommentList>
            {comments.map(comment => (
              <CommentItem key={comment.id}>
                {comment.content} <DeleteIcon className='icon' onClick={() => handleDeleteComments(comment.id)} />
              </CommentItem>
            ))}
          </CommentList>
        </CommentsSection>
      </AdminContent>
    </Container>
  );
}

export default EditAdmin;
