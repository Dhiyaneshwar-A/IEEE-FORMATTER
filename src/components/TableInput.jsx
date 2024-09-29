import React, { useState } from 'react';

const TableInput = ({ tables, setTables }) => {
  const [columns, setColumns] = useState(['']);
  const [rows, setRows] = useState([]);
  const [newRowValues, setNewRowValues] = useState({});

  const handleAddColumn = () => {
    setColumns([...columns, '']);
  };

  const handleColumnChange = (index, value) => {
    const updatedColumns = [...columns];
    updatedColumns[index] = value;
    setColumns(updatedColumns);
  };

  const handleAddRow = () => {
    if (columns.every(col => newRowValues[col] !== undefined)) {
      setRows([...rows, newRowValues]);
      setNewRowValues({});
    }
  };

  const handleRowChange = (column) => (event) => {
    setNewRowValues({
      ...newRowValues,
      [column]: event.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTables([...tables, { columns, rows }]);
    // Resetting columns and rows after submission
    setColumns(['']);
    setRows([]);
  };

  return (
    <div className="mb-4">
      <h4>Table Input</h4>
      <div>
        <h5>Columns</h5>
        {columns.map((col, index) => (
          <input
            key={index}
            type="text"
            value={col}
            onChange={(e) => handleColumnChange(index, e.target.value)}
            placeholder={`Column ${index + 1}`}
            className="form-control mb-2"
          />
        ))}
        <button type="button" onClick={handleAddColumn} className="btn btn-info mb-3">Add Column</button>
      </div>

      <div>
        <h5>Rows</h5>
        {columns.map((col, index) => (
          <input
            key={index}
            type="text"
            value={newRowValues[col] || ''}
            onChange={handleRowChange(col)}
            placeholder={`Value for ${col}`}
            className="form-control mb-2"
          />
        ))}
        <button type="button" onClick={handleAddRow} className="btn btn-primary mb-3">Add Row</button>
      </div>

      <button type="submit" onClick={handleSubmit} className="btn btn-success mt-3">Submit Table</button>

      <div className="mt-4">
        <h5>Current Table Preview</h5>
        {rows.length > 0 && (
          <table className="table table-bordered">
            <thead>
              <tr>
                {columns.map((col, index) => (
                  <th key={index}>{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {columns.map((col, colIndex) => (
                    <td key={colIndex}>{row[col]}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default TableInput;
