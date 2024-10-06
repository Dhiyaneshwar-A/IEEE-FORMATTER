import React, { useState } from 'react';
import './inputform.css'; // Import the CSS file
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
  const [currentSection, setCurrentSection] = useState('');

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
      setSections([...sections, { heading: sectionHeading, content: sectionContent, subsections: [] }]);
      setSectionHeading('');
      setSectionContent('');
    }
  };

  const addSubsection = () => {
    if (currentSection && sectionHeading && sectionContent) {
      setSections(prevSections =>
        prevSections.map(section =>
          section.heading === currentSection
            ? {
                ...section,
                subsections: [
                  ...(section.subsections || []),
                  { heading: sectionHeading, content: sectionContent },
                ],
              }
            : section
        )
      );
      setSectionHeading('');
      setSectionContent('');
    }
  };

  const handleTextareaResize = (e) => {
    const textarea = e.target;
    textarea.style.height = 'auto'; // Reset height
    textarea.style.height = `${textarea.scrollHeight}px`; // Set height based on scroll height
  };

  return (
    <form onSubmit={handleSubmit} className="formContainer">
      <label className="label">Title</label>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="input"
        required
      />

      <AuthorInput authors={authors} setAuthors={setAuthors} />

      <label className="label">Abstract</label>
      <textarea
        value={abstract}
        onChange={(e) => {
          setAbstract(e.target.value);
          handleTextareaResize(e);
        }}
        className="textarea"
        required
        rows={3}
      />

      <label className="label">Keywords (comma-separated)</label>
      <input
        type="text"
        value={keywords}
        onChange={(e) => setKeywords(e.target.value)}
        className="input"
      />

      <label className="label">Sections</label>
      <input
        type="text"
        placeholder="Section Heading"
        value={sectionHeading}
        onChange={(e) => setSectionHeading(e.target.value)}
        className="input"
      />
      <textarea
        placeholder="Section Content"
        value={sectionContent}
        onChange={(e) => {
          setSectionContent(e.target.value);
          handleTextareaResize(e);
        }}
        className="textarea"
        rows={3}
      />
      <button type="button" onClick={addSection} className="button">
        Add Section
      </button>

      <ul className="sectionList">
        {sections.map((section, index) => (
          <li key={index} className="sectionItem">
            <strong>{section.heading}:</strong> {section.content}
          </li>
        ))}
      </ul>

      <label className="label">Add Subsections to Section:</label>
      <select onChange={(e) => setCurrentSection(e.target.value)} className="input">
        <option value="">Select Section</option>
        {sections.map((section, index) => (
          <option key={index} value={section.heading}>
            {section.heading}
          </option>
        ))}
      </select>

      <input
        type="text"
        placeholder="Subsection Heading"
        value={sectionHeading}
        onChange={(e) => setSectionHeading(e.target.value)}
        className="input"
      />
      <textarea
        placeholder="Subsection Content"
        value={sectionContent}
        onChange={(e) => {
          setSectionContent(e.target.value);
          handleTextareaResize(e);
        }}
        className="textarea"
        rows={3}
      />
      <button type="button" onClick={addSubsection} className="button">
        Add Subsection
      </button>

      {currentSection && (
        <div>
          <h4>{currentSection} Subsections:</h4>
          <ul className="subsectionList">
            {sections.find(section => section.heading === currentSection)?.subsections.map((subsection, index) => (
              <li key={index}>
                <strong>{subsection.heading}:</strong> {subsection.content}
              </li>
            ))}
          </ul>
        </div>
      )}

      <TableInput tables={tables} setTables={setTables} />
      <ImageUpload images={images} setImages={setImages} />

    <div className="col text-center">
    <button type="submit" className="btn btn-primary">
      SUBMIT PAPER
    </button>
  </div>
    </form>
  );
};

export default InputForm;
