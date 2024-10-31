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
        <div className="navbar">
          <button type="button" onClick={() => goToPage(1)}>
            Restart
          </button>
        </div>
      </header>
      <main className="main-content">
        <Outlet />
      </main>
      <footer className="footer">
        {/* <div className="pagination">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              className={currentPage === index + 1 ? 'active' : ''}
              onClick={() => goToPage(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div> */}
        <div className="pagination">
          <button onClick={() => goToPage(currentPage - 1)}>Back</button>
          <button onClick={() => goToPage(currentPage + 1)}>Next</button>
        </div>
      </footer>
    </div>
  );
}
