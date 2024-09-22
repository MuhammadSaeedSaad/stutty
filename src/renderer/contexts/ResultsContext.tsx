/* eslint-disable react/jsx-no-constructed-context-values */
import React, { createContext, useState, useContext } from 'react';
import { TotalResults } from '../utils';

const ResultsContext = createContext<{
  totalResults: TotalResults;
  setTotalResults: React.Dispatch<React.SetStateAction<TotalResults>>;
}>(null);

export function ResultsContextProvider({ children }) {
  const [totalResults, setTotalResults] = useState<TotalResults>({});

  return (
    <ResultsContext.Provider
      value={{
        totalResults,
        setTotalResults,
      }}
    >
      {children}
    </ResultsContext.Provider>
  );
}

export const useResultsContext = (): {
  totalResults: TotalResults;
  setTotalResults: React.Dispatch<React.SetStateAction<TotalResults>>;
} => {
  const context = useContext(ResultsContext);

  if (context === null) {
    throw new Error(
      'useResultsContext must be used inside a Results context provider',
    );
  }

  return context;
};
