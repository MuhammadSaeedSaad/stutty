/* eslint-disable react/button-has-type */
import React from 'react';
import { Outlet } from 'react-router-dom';
import { usePagination } from '../contexts/PaginationContext';
import { Flex, Layout } from 'antd';
import Button from 'antd/lib/button';
import RedoOutlined from '@ant-design/icons';

const { Header, Footer, Sider, Content } = Layout;

const headerStyle: React.CSSProperties = {
  textAlign: 'center',
  color: '#fff',
  height: 64,
  paddingInline: 48,
  lineHeight: '64px',
  backgroundColor: '#4096ff',
};

const contentStyle: React.CSSProperties = {
  textAlign: 'center',
  minHeight: 120,
  lineHeight: '120px',
  color: '#fff',
  backgroundColor: '#0958d9',
};

const siderStyle: React.CSSProperties = {
  textAlign: 'center',
  lineHeight: '120px',
  color: '#fff',
  backgroundColor: '#1677ff',
};

const footerStyle: React.CSSProperties = {
  textAlign: 'center',
  color: '#fff',
  backgroundColor: '#4096ff',
};

const layoutStyle = {
  borderRadius: 8,
  // overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
};

export default function MainLayout() {
  const { currentPage, totalPages, goToPage } = usePagination();

  return (
    <div className="layout-container">
      <header className="header">
        <h1>Computer Based Stuttering Analysis</h1>
        <div className="navbar">
          <Button type="primary" onClick={() => goToPage(1)}>
            <RedoOutlined color='red' />
          </Button>
        </div>
      </header>
      <main className="main-content">
        <Outlet />
      </main>
      <footer className="footer">
        <div className="pagination">
          <Button type="primary" disabled={currentPage <= 1} onClick={() => goToPage(currentPage - 1)}>Back</Button>
          <Button type="primary" disabled={currentPage >= totalPages} onClick={() => goToPage(currentPage + 1)}>Next</Button>
        </div>
      </footer>
    </div>
  );
  // return (
  //   <Layout style={layoutStyle}>
  //     <Header style={headerStyle}>
  //       <h1>Computer Based Stuttering Analysis</h1>
  //     </Header>
  //     <Content style={contentStyle}>
  //       <Outlet />
  //     </Content>
  //     <Sider style={siderStyle}>
  //       <Button type="primary" onClick={() => goToPage(1)}>
  //         Restart
  //       </Button>
  //     </Sider>
  //     <Footer style={footerStyle}>
  //       <div className="pagination">
  //         <Button type="primary" disabled={currentPage <= 1} onClick={() => goToPage(currentPage - 1)}>
  //           Back
  //         </Button>
  //         <Button type="primary" disabled={currentPage >= totalPages} onClick={() => goToPage(currentPage + 1)}>
  //           Next
  //         </Button>
  //       </div>
  //     </Footer>
  //   </Layout>
  // );
}
