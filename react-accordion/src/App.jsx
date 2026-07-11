// src/App.jsx
import { useState } from 'react';
import data from './data';
import './App.css';

function App() {
  const [selected, setSelected] = useState(null);
  const [enableMultiSelection, setEnableMultiSelection] = useState(false);
  const [multiple, setMultiple] = useState([]);

  // Handles selecting a single item
  function handleSingleSelection(getCurrentId) {
    setSelected(getCurrentId === selected ? null : getCurrentId);
  }

  // Handles multi-selection tracking
  function handleMultiSelection(getCurrentId) {
    let copyMultiple = [...multiple];
    const findIndexOfCurrentId = copyMultiple.indexOf(getCurrentId);

    if (findIndexOfCurrentId === -1) {
      copyMultiple.push(getCurrentId);
    } else {
      copyMultiple.splice(findIndexOfCurrentId, 1);
    }

    setMultiple(copyMultiple);
  }

  return (
    <div className="wrapper">
      {/* Toggle Button */}
      <button 
        className={`btn-toggle ${enableMultiSelection ? 'active' : ''}`}
        onClick={() => {
          setEnableMultiSelection(!enableMultiSelection);
          // Clear states when switching modes for clean UI transitions
          setSelected(null);
          setMultiple([]);
        }}
      >
        {enableMultiSelection ? "Disable Multi Selection" : "Enable Multi Selection"}
      </button>

      {/* Accordion Container */}
      <div className="accordion">
        {data && data.length > 0 ? (
          data.map((dataItem) => (
            <div key={dataItem.id} className="item">
              <div
                onClick={
                  enableMultiSelection
                    ? () => handleMultiSelection(dataItem.id)
                    : () => handleSingleSelection(dataItem.id)
                }
                className="title"
              >
                <h3>{dataItem.question}</h3>
                <span>
                  {enableMultiSelection 
                    ? multiple.includes(dataItem.id) ? '-' : '+' 
                    : selected === dataItem.id ? '-' : '+'}
                </span>
              </div>
              
              {/* Render answer if conditions are met */}
              {enableMultiSelection
                ? multiple.includes(dataItem.id) && (
                    <div className="content">{dataItem.answer}</div>
                  )
                : selected === dataItem.id && (
                    <div className="content">{dataItem.answer}</div>
                  )}
            </div>
          ))
        ) : (
          <div>No data found!</div>
        )}
      </div>
    </div>
  );
}

export default App;