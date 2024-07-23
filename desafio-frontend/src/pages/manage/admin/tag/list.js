import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Sidebar from '../../../../components/utils/Sidebar';
import AdminContent from '../../../../components/utils/AdminContent';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import DataFormat from '../../../../components/utils/Date';
const Container = styled.div`
  display: flex;
  height: 100vh;

  .link{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    color: none;
    color: #000;
  }
 
`;

const Content = styled.div` 
  padding: 20px;
  flex-grow: 1;
  transition: margin-left 0.3s;
`;

const Title = styled.h2`
  margin-bottom: 20px;
  text-align: center;
  font-size: 2rem;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.th`
  background-color: #f4f4f4;
  padding: 10px;
  border: 1px solid #ddd;
`;

const TableCell = styled.td`
  padding: 10px;
  border: 1px solid #ddd;
  text-align: center;

  .icon{
    cursor: pointer;
  }
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f9f9f9;
  }
`;


const FilterInput = styled.input`
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 98%;
`;

function Taglist() {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [filter, setFilter] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const token = localStorage.getItem('token');
  useEffect(() => {
    getTag()

  }, []);
  const getTag = async () => {

    try {
      const response = await axios.get(`${process.env.REACT_APP_API}/api/tag/list`,{
        headers: {          
          'Authorization': `Bearer ${token}`
        },
      });

      if (response.status === 200) {
        const { data } = response
        await setPosts(data);
        await setFilteredPosts(data);
        
      }
    } catch (error) {
      console.error('Erro', error);
    }
  }

  const handleFilterChange = (event) => {
    const value = event.target.value.toLowerCase();
    setFilter(value);

    const filtered = posts.filter(post =>
      post.title.toLowerCase().includes(value)
    );
    setFilteredPosts(filtered);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`${process.env.REACT_APP_API}/api/tag/delete/${id}`,{
        headers: {          
          'Authorization': `Bearer ${token}`
        },
      });

      if (response.status === 201) {
        
        alert("Categoria apagado com sucesso!")
        await getTag()
      }
    } catch (error) {
      console.error('Erro', error);
    }

  }
  
  return (
    <Container>

      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <AdminContent>
        <Content isSidebarOpen={isSidebarOpen}>
          <Title>Listagem de Posts</Title>
          <FilterInput
            type="text"
            placeholder="Filtrar por nome..."
            value={filter}
            onChange={handleFilterChange}
          />
          <Table>
            <thead>
              <TableRow>
                <TableHeader>ID</TableHeader>
                <TableHeader>Título</TableHeader>
              
                <TableHeader>Criado em</TableHeader>
                <TableHeader>Editado em</TableHeader>
                <TableHeader>Apagar</TableHeader>
                <TableHeader>Editar</TableHeader>
              </TableRow>
            </thead>
            <tbody>
              {filteredPosts.map(post => (
                <TableRow key={post.id}>
                  
                  <TableCell><a className='link' href={`/admin/edit/tag/${post.id}`}>{post.id}</a></TableCell> 
                  <TableCell><a className='link' href={`/admin/edit/tag/${post.id}`}>{post.title}</a></TableCell>
                  <TableCell><a className='link' href={`/admin/edit/tag/${post.id}`}><DataFormat data={post.created_at}/></a></TableCell>
                  <TableCell><a className='link' href={`/admin/edit/tag/${post.id}`}><DataFormat data={post.updated_at}/></a></TableCell>

                  <TableCell><DeleteIcon className='icon' onClick={() => handleDelete(post.id)} /> </TableCell>
                  <TableCell><a className='link' href={`/admin/edit/tag/${post.id}`}> <EditIcon/></a></TableCell>
                </TableRow>
              ))}
            </tbody>
          </Table>
        </Content>
      </AdminContent>
    </Container>
  );
}

export default Taglist;
