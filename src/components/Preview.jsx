import React from 'react';

const Preview = ({ latexCode }) => {
  return (
    <div className="preview-container border rounded p-4 bg-white shadow-sm">
      <pre className="text-left">{latexCode}</pre>
    </div>
  );
};

export default Preview;
