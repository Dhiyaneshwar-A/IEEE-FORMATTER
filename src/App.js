import React, { useState } from 'react';
import InputForm from './components/Inputform';
import Preview from './components/Preview';
import { formatLatex } from './utils/formatLatex';
import './App.css';

function App() {
  const [latexCode, setLatexCode] = useState('');

  const handleFormSubmit = (data) => {
    const latexString = formatLatex(data);
    setLatexCode(latexString);
  };

  return (
    <div className="App">
      <h1 className="text-center">IEEE Formatter</h1>
      <InputForm onSubmit={handleFormSubmit} />
      <h2 className="text-center">LaTeX Preview</h2>
      <Preview latexCode={latexCode} />
    </div>
  );
}

export default App;
