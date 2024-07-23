import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import Sidebar from '../../../../components/utils/Sidebar';
import AdminContent from '../../../../components/utils/AdminContent';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
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

function EditCategory() {
  const { register, handleSubmit, watch, setValue } = useForm();
  const navigate = useNavigate();
  const token = localStorage.getItem('token'); 
  const { id } = useParams();
  useEffect(() => {
    getCategory()

  }, []);
  const getCategory = async () => {

    const response = await axios.get(`${process.env.REACT_APP_API}/api/category/edit/${id}`,{
      headers: {          
        'Authorization': `Bearer ${token}`
      },
    });

    if (response.status === 200) {
      const { data } = response
      setValue('title', data.title);  
    } else {
      console.error('Erro ao publicar o artigo');
    }


  }

  const onSubmit = async (data) => {
  
    const formData = new FormData();
    formData.append('title', data.title);

    try {
      const response = await axios.post(`${process.env.REACT_APP_API}/api/category/update/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        },
      });

      if (response.status === 201) {
        alert('Categoria editada com sucesso');
        navigate('/admin/categorylist/')
      } else {
        alert('Erro ao editado o categoria');
      }
    } catch (error) {
      console.error('Erro ao enviar o formulário', error);
    }
  };  
  return (
    <Container>
      <Sidebar />
      <AdminContent>
        <Title>Editar Categoria</Title>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Label htmlFor="title">Título</Label>
          <Input id="title" {...register('title', { required: true })} />
          <Button type="submit">Editar</Button>
        </Form>       
      </AdminContent>
    </Container>
  );
}

export default EditCategory;
