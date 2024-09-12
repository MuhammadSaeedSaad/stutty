// Hello.tsx
import React, { useEffect, useState } from 'react';
import { handleFileSelect } from '../utils'; // Import the function from utils

export default function Hello() {
  const [results, setResults] = useState<any>(null); // State to hold results

  useEffect(() => {
    console.log('INSIDE USEEFFECT');
    // Function to handle the file-opened event
    const handleFileOpened = (
      event: { preventDefault: () => void; readonly defaultPrevented: boolean },
      fileData: { filePath: string; data: string },
    ) => {
      const result = handleFileSelect(event, fileData); // Process file data
      console.log('RESULTS:', result);
      setResults(result); // Update state with the results
    };

    // Listen for file-opened events
    window.electron.onFileOpened(handleFileOpened);

    // Clean up the listener on component unmount
    return () => {
      window.electron.onFileOpened((...args) => {}); // Remove the listener
    };
  }, []);

  return (
    <div>
      <h1>Hello World!</h1>
      {/* Render the results */}
      {results && (
        <div>
          <h2>Results:</h2>
          <pre>{JSON.stringify(results, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
