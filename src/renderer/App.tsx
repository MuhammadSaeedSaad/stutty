import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { useState } from 'react';
import ResultsPane from './components/ResultsPane';
import Layout from './components/Layout';
import Question from './components/Question';
import FinalResults from './components/FinalResults';

export default function App() {
  const [hasReadingResults, setHasReadingResults] = useState(false);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            path="/"
            element={<Question setHasReadingResults={setHasReadingResults} />}
          />
          <Route path="/results" element={<ResultsPane />} />
          {hasReadingResults && (
            <Route path="/reading-results" element={<ResultsPane />} />
          )}
          <Route path="/final-results" element={<FinalResults />} />
        </Route>
      </Routes>
    </Router>
  );
}
