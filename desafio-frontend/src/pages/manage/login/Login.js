import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../../components/services/AuthContext';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f0f0;
  .content{
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 95%;
  }
  .content a{
    text-decoration: none;
    color: #000;
  }
`;

const Form = styled.form`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
`;

const Title = styled.h2`
  margin-bottom: 20px;
  text-align: center;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
`;

const Input = styled.input`
  width: 90%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  width: 95%;
  padding: 10px;
  background-color: #1abc9c;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;

  &:hover {
    background-color: #16a085;
  }
`;

function Login() {
  const { login } = useContext(AuthContext);
  const [email, setUserEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/admin')
    } catch (error) {
      console.error('Failed to login', error);
    }

  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Title>Login</Title>
        <Label htmlFor="username">Usuário</Label>
        <Input
          id="email"
          type="text"
          value={email}
          onChange={(e) => setUserEmail(e.target.value)}
        />
        <Label htmlFor="password">Senha</Label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit">Entrar</Button>
        <div className='content'>
          <a href="/admin/register">Criar um usuario</a>
          <a href="/">Blog</a>

        </div>

      </Form>
    </Container>
  );
}

export default Login;
