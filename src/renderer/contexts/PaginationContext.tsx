import React, { createContext, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const PaginationContext = createContext(null);

export function PaginationProvider({ children }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(3); // Default to 3 pages
  const navigate = useNavigate();

  const goToPage = (page) => {
    setCurrentPage(page);
    switch (page) {
      case 1:
        navigate('/');
        break;
      case 2:
        navigate('/results');
        break;
      case 3:
        if (totalPages === 4) {
          navigate('/reading-results');
        } else {
          navigate('/final-results');
        }
        break;
      case 4:
        navigate('/final-results');
        break;
      default:
        break;
    }
  };

  return (
    <PaginationContext.Provider
      value={{ currentPage, totalPages, setTotalPages, goToPage }}
    >
      {children}
    </PaginationContext.Provider>
  );
}

export const usePagination = () => {
  const context = useContext(PaginationContext);

  if (context === null) {
    throw new Error(
      'usePagination must be used inside a pagination context provider',
    );
  }

  return context;
};
