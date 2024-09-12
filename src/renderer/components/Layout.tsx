import React from 'react';
import { Outlet } from 'react-router-dom';
import '../styles/Layout.css'; // Add styles for header, footer, and layout

export default function Layout() {
  return (
    <div className="layout-container">
      <header className="header">
        <h1>CBSA</h1>
      </header>
      <main className="main-content">
        <Outlet />
      </main>
      <footer className="footer">
        <p>Footer Content</p>
      </footer>
    </div>
  );
}
