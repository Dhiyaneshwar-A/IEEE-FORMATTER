import React, { useState } from 'react';
import AuthorInput from './AuthorInput';
import TableInput from './TableInput';
import ImageUpload from './ImageUpload';

const InputForm = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [authors, setAuthors] = useState([]);
  const [abstract, setAbstract] = useState('');
  const [keywords, setKeywords] = useState('');
  const [sections, setSections] = useState([]);
  const [tables, setTables] = useState([]);
  const [images, setImages] = useState([]);
  const [sectionHeading, setSectionHeading] = useState('');
  const [sectionContent, setSectionContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      title,
      authors,
      abstract,
      keywords: keywords.split(',').map(k => k.trim()),
      sections,
      tables,
      images,
    };
    onSubmit(formData);
  };

  const addSection = () => {
    if (sectionHeading && sectionContent) {
      setSections([...sections, { heading: sectionHeading, content: sectionContent }]);
      setSectionHeading('');
      setSectionContent('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="container">
      <div className="form-group">
        <label>Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="form-control"
          required
        />
      </div>
      <AuthorInput authors={authors} setAuthors={setAuthors} />
      <div className="form-group">
        <label>Abstract</label>
        <textarea
          value={abstract}
          onChange={(e) => setAbstract(e.target.value)}
          className="form-control"
          required
        />
      </div>
      <div className="form-group">
        <label>Keywords (comma-separated)</label>
        <input
          type="text"
          value={keywords}
          onChange={(e) => setKeywords(e.target.value)}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label>Sections</label>
        <div className="input-group">
          <input
            type="text"
            placeholder="Section Heading"
            value={sectionHeading}
            onChange={(e) => setSectionHeading(e.target.value)}
            className="form-control"
          />
          <input
            type="text"
            placeholder="Section Content"
            value={sectionContent}
            onChange={(e) => setSectionContent(e.target.value)}
            className="form-control"
          />
          <button type="button" className="btn btn-primary" onClick={addSection}>
            Add Section
          </button>
        </div>
        <ul>
          {sections.map((section, index) => (
            <li key={index}><strong>{section.heading}:</strong> {section.content}</li>
          ))}
        </ul>
      </div>
      <TableInput tables={tables} setTables={setTables} />
      <ImageUpload images={images} setImages={setImages} />
      <button type="submit" className="btn btn-success">Generate LaTeX</button>
    </form>
  );
};

export default InputForm;
