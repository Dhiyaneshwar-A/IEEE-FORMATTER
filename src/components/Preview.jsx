import React, { useState } from 'react';

const Preview = ({ latexCode }) => {
  const [loading, setLoading] = useState(false);

  const getTitleFromLatex = () => {
    const titleMatch = latexCode.match(/\\title{([^}]*)}/);
    return titleMatch ? titleMatch[1] : "Document";
  };

  const handleDownloadFiles = async () => {
    setLoading(true); // Start loading

    try {
      // Step 1: Generate PDF
      const pdfResponse = await fetch('https://latextopdf-v1.onrender.com/convert', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ latex: latexCode }),
      });

      if (!pdfResponse.ok) {
        const errorText = await pdfResponse.text();
        throw new Error(`Failed to convert LaTeX to PDF: ${errorText}`);
      }

      const pdfBlob = await pdfResponse.blob(); // Retrieve PDF as Blob

      // Step 2: Convert PDF to DOCX
      const fileReader = new FileReader();
      fileReader.onload = async (event) => {
        const base64Data = btoa(
          String.fromCharCode(...new Uint8Array(event.target.result)) // Convert ArrayBuffer to Base64
        );

        try {
          const response = await fetch('https://v2.convertapi.com/convert/pdf/to/docx', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer secret_K03VpOxYZYsgzm1G`, // Use your actual API key
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              Parameters: [
                {
                  Name: 'File',
                  FileValue: {
                    Name: 'ResultPDFtoDocX.pdf',
                    Data: base64Data,
                  },
                },
                {
                  Name: 'StoreFile',
                  Value: true,
                },
              ],
            }),
          });

          if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Failed to convert PDF to DOCX: ${errorText}`);
          }

          const data = await response.json();
          const docxFile = data.Files[0];
          const docxTitle = getTitleFromLatex(); // Use the same title for DOCX

          const docxBlob = await fetch(docxFile.Url).then(res => res.blob());

          // Step 3: Download both files
          downloadFile(pdfBlob, `${docxTitle}.pdf`); // Download PDF
          downloadFile(docxBlob, `${docxTitle}.docx`); // Download DOCX
        } catch (error) {
          alert(`Error: ${error.message}`);
        } finally {
          setLoading(false); // Stop loading after processing
        }
      };

      fileReader.readAsArrayBuffer(pdfBlob); // Read PDF blob as ArrayBuffer
    } catch (error) {
      alert(`Error: ${error.message}`);
      setLoading(false); // Stop loading on error
    }
  };

  const downloadFile = (blob, filename) => {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="preview-container border rounded p-4 bg-white shadow-sm">
      <pre className="text-center">{latexCode}</pre> {/* Centered LaTeX code */}

      {/* Button to generate PDF and DOCX */}
      <div className="d-flex justify-content-center mt-3">
        <button onClick={handleDownloadFiles} className="btn btn-primary" disabled={loading}>
          {loading ? (
            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
          ) : (
            'Generate PDF and DOCX'
          )}
        </button>
      </div>

      <div id="output" className="mt-3"></div>
    </div>
  );
};

export default Preview;
