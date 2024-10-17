/* eslint-disable react/button-has-type */
import React from 'react';
import { Outlet } from 'react-router-dom';
import { usePagination } from '../contexts/PaginationContext';
// import '../styles/Layout.css';

export default function Layout() {
  const { currentPage, totalPages, goToPage } = usePagination();

  return (
    <div className="layout-container">
      <header className="header">
        <h1>Computer Based Stuttering Analysis</h1>
      </header>
      <main className="main-content">
        <Outlet />
      </main>
      <footer className="footer">
        <div className="pagination">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              className={currentPage === index + 1 ? 'active' : ''}
              onClick={() => goToPage(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </footer>
    </div>
  );
}
