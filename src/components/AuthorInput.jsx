import React, { useState } from 'react';

const AuthorInput = ({ authors, setAuthors }) => {
  const [authorName, setAuthorName] = useState('');

  const addAuthor = () => {
    if (authorName.trim()) {
      setAuthors([...authors, authorName]);
      setAuthorName('');
    }
  };

  return (
    <div className="mb-3">
      <label className="form-label">Authors</label>
      <div className="input-group">
        <input
          type="text"
          className="form-control"
          value={authorName}
          onChange={(e) => setAuthorName(e.target.value)}
          placeholder="Enter author name"
        />
        <button type="button" className="btn btn-primary" onClick={addAuthor}>
          Add Author
        </button>
      </div>
      <ul className="list-group mt-2">
        {authors.map((author, index) => (
          <li key={index} className="list-group-item">
            {author}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AuthorInput;
