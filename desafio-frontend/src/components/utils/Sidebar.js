import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import AuthContext from '../services/AuthContext';
import { useNavigate } from 'react-router-dom';
const SidebarContainer = styled.div`
  height: 100vh;
  width: ${props => (props.isOpen ? '200px' : '85px')};
  background-color: #2c3e50;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: ${props => (props.isOpen ? 'flex-start' : 'center')};
  padding: 10px;
  transition: width 0.3s;
`;

const ToggleButton = styled.button`
  background-color: #34495e;
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
  width: 100%;
  text-align: ${props => (props.isOpen ? 'left' : 'center')};
`;

const MenuItem = styled(Link)`
  color: white;
  text-decoration: none;
  padding: 10px;
  width: 100%;
  text-align: ${props => (props.isOpen ? 'left' : 'center')};
  display: block;
  box-sizing: border-box;
  border-radius: 4px;

  &:hover {
    background-color: #1abc9c;
  }
`;

function Sidebar() {
  const { logout } = useContext(AuthContext)
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  const logoutToken =async () => {
    try {
      await logout()
      navigate('/')
    } catch (error) {
      console.error('Failed to login', error);
    }
    
  }

  return (
    <SidebarContainer isOpen={isOpen}>
      <ToggleButton onClick={toggleSidebar} isOpen={isOpen}>
        {isOpen ? <MenuIcon /> : <MenuIcon />}
      </ToggleButton>
      <MenuItem to="/admin" isOpen={isOpen}>
        Novo Artigo
      </MenuItem>
      <MenuItem to="/admin/postlist/" isOpen={isOpen}>
        Lista de Artigos
      </MenuItem>
      <MenuItem to="/admin/category/" isOpen={isOpen}>
        Nova Categoria
      </MenuItem>
      <MenuItem to="/admin/category/list" isOpen={isOpen}>
        Listagem Categoria
      </MenuItem>
      <MenuItem to="/admin/tag/" isOpen={isOpen}>
        Nova Tag
      </MenuItem>
      <MenuItem to="/admin/tag/list" isOpen={isOpen}>
        Listagem Tag
      </MenuItem>
      <MenuItem to="#" isOpen={isOpen} onClick={() => logoutToken()}>
        Logout
      </MenuItem>
    </SidebarContainer>
  );
}

export default Sidebar;
