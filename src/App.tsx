import React, { useState } from 'react';
import { PDFSigner } from './components/PDFSigner';
import './App.css';

function App() {
  const [error, setError] = useState<string | null>(null);

  return (
    <div className="App">
      {error && (
        <div className="error-banner">
          {error}
          <button onClick={() => setError(null)}>×</button>
        </div>
      )}
      <PDFSigner onError={setError} />
    </div>
  );
}

export default App;