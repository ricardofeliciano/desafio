import React from 'react';
import styled from 'styled-components';

const ContentContainer = styled.div`
  flex-grow: 1;
  padding: 20px;
`;

function AdminContent({ children }) {
  return <ContentContainer>{children}</ContentContainer>;
}

export default AdminContent;
