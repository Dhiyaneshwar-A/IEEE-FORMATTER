import React from 'react';

const Preview = ({ latexCode }) => {
  const handleDownload = async () => {
    try {
      // Make API call to convert LaTeX to DOCX
      const response = await fetch('https://latextodocx.onrender.com/convert', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ latex: latexCode }),
      });

      // Check if the response is OK
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to convert LaTeX to DOCX: ${errorText}`);
      }

      // Create a blob from the response
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'document.docx'; // Name of the downloaded file
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading DOCX:', error);
      alert(`Error: ${error.message}`); // Display error to the user
    }
  };

  return (
    <div className="container d-flex flex-column align-items-center justify-content-center mt-5">
      <div className="preview-container border rounded p-4 bg-white shadow-sm" style={{ maxWidth: '800px', width: '100%' }}>
        <pre className="text-left" style={{ whiteSpace: 'pre-wrap', overflow: 'auto' }}>{latexCode}</pre>
        <button onClick={handleDownload} className="btn btn-primary mt-3">
          Download DOCX
        </button>
      </div>
    </div>
  );
};

export default Preview;
