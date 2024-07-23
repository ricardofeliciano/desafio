import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Container = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h2`
  margin-bottom: 20px;
  text-align: center;
  font-size: 2rem;

  
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const PostList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;

const PostItem = styled.div`
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 15px;
  background-color: #f9f9f9;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: calc(33.333% - 46px); /* 3 items per row with gaps */

  @media (max-width: 1024px) {
    width: calc(50% - 20px); /* 2 items per row for tablets */
  }

  @media (max-width: 768px) {
    width: 100%; /* 1 item per row for mobile */
  }
`;

const PostTitle = styled.h3`
  margin: 0;
`;

const PostImage = styled.img`
  height: auto;
  border-radius: 4px;
  margin: 10px 0;
`;

const PostDescription = styled.p`
  margin: 10px 0;
`;

const ReadMoreLink = styled(Link)`
  color: #1abc9c;
  text-decoration: none;
  font-weight: bold;
  &:hover {
    text-decoration: underline;
  }
`;

const FilterInput = styled.input`
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 98%;
`;

const Select = styled.select`
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 98%;
`;

const LinkTo = styled(Link)`
    padding: 10px 20px;
    background-color: #1abc9c;
    border: none;
    border-radius: 4px;
    color: white;
    cursor: pointer;
    font-size: 1rem;
    max-width: 50px;
    margin: 10px 0;
    width: 100%;
    text-decoration: none;

  &:hover {
    background-color:  #16a085;
  }`;
function PublicPosts() {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [filter, setFilter] = useState('');
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);

  useEffect(() => {
    getArticles();
  }, []);

  const getArticles = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API}/api/articles/index`);
      if (response.status === 200) {
        const data = response.data;
        if (Array.isArray(data)) {
          const categories = [...new Set(data.map(post => post.category?.title || ''))];
          const tags = [...new Set(data.flatMap(post => post.tags?.map(tag => tag.title) || []))];

          setPosts(data);
          setFilteredPosts(data);
          setCategories(categories);
          setTags(tags);
        }
      }
    } catch (error) {
      console.error('Erro', error);
    }
  };

  const handleFilterChange = (event) => {
    const value = event.target.value.toLowerCase();
    setFilter(value);
    applyFilters(value, selectedCategory, selectedTags);
  };

  const handleCategoryChange = (event) => {
    const value = event.target.value;
    setSelectedCategory(value);
    applyFilters(filter, value, selectedTags);
  };

  const handleTagsChange = (event) => {
    const options = event.target.options;
    const value = Array.from(options).filter(option => option.selected).map(option => option.value);
    setSelectedTags(value);
    applyFilters(filter, selectedCategory, value);
  };

  const applyFilters = (titleFilter, categoryFilter, tagsFilter) => {
    const filtered = posts.filter(post => {
      const titleMatch = post.title?.toLowerCase().includes(titleFilter);
      const categoryMatch = !categoryFilter || post.category?.title === categoryFilter;
      const tagsMatch = tagsFilter.length === 0 || post.tags?.some(tag => tagsFilter.includes(tag.title));

      return titleMatch && categoryMatch && tagsMatch;
    });
    setFilteredPosts(filtered);
  };

  return (
    <Container>
      <Title>Artigos</Title>
      <FilterInput
        type="text"
        placeholder="Filtrar por nome..."
        value={filter}
        onChange={handleFilterChange}
      />
      <Select
        value={selectedCategory}
        onChange={handleCategoryChange}
      >
        <option value="">Todas as Categorias</option>
        {categories.map((category, index) => (
          <option key={index} value={category}>
            {category}
          </option>
        ))}
      </Select>
      <Select
        multiple
        value={selectedTags}
        onChange={handleTagsChange}
      >
        {tags.map((tag, index) => (
          <option key={index} value={tag}>
            {tag}
          </option>
        ))}
      </Select>
      <PostList>
        {filteredPosts.map(post => (
          <PostItem key={post.id}>
            <PostTitle>{post.title}</PostTitle>
            <PostImage width={100} src={`${process.env.REACT_APP_API}` + post.image} alt={post.title} />
           
            <PostDescription>{post.description}</PostDescription>
            <ReadMoreLink to={`/details/${post.title}`}>Leia mais</ReadMoreLink>
          </PostItem>
        ))}
      </PostList>
      <LinkTo to="/admin/login">Login</LinkTo>
    </Container>
  );
}

export default PublicPosts;
