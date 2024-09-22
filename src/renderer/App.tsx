import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import ResultsPane from './components/ResultsPane';
import Layout from './components/Layout';
import Question from './components/Question';
import FinalResults from './components/FinalResults';
import { PaginationProvider } from './contexts/PaginationContext';
import { ResultsContextProvider } from './contexts/ResultsContext';
import ReadingResultsPane from './components/ReadingResultsPane';

export default function App() {
  return (
    <Router>
      <ResultsContextProvider>
        <PaginationProvider>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="/" element={<Question />} />
              <Route path="/results" element={<ResultsPane />} />
              <Route path="/reading-results" element={<ReadingResultsPane />} />
              <Route path="/final-results" element={<FinalResults />} />
            </Route>
          </Routes>
        </PaginationProvider>
      </ResultsContextProvider>
    </Router>
  );
}
