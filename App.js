/*
After studying JavaScript and React
this was my solution for a simple List implementation.
*/

import './buttons.css';
import React, { useState, useEffect } from 'react';

function ListApp() {
  // VARIABLES
  const [items, setItems] = useState(JSON.parse(localStorage.getItem('LIST_ELEMENTS')) || []);
  const [newItem, setNewItem] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(JSON.parse(localStorage.getItem('IS_DARK')) || false);
  const [checkedItems, setCheckedItems] = useState(JSON.parse(localStorage.getItem('CHECKED_ITEMS')) || []);

  // METHODS

  // UseEffect for our items inside the list.
  useEffect(() => {
    localStorage.setItem('LIST_ELEMENTS', JSON.stringify(items));
  }, [items]);

  // UseEffect for keeping page in dark mode or not whenever the page is reloaded
  useEffect(() => {
    localStorage.setItem('IS_DARK', JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  // UseEffect to save checked state in local storage
  useEffect(() => {
    localStorage.setItem('CHECKED_ITEMS', JSON.stringify(checkedItems));
  }, [checkedItems]);

  // Add item to the list
  const addItem = () => {
    if (newItem !== '') {
      setItems([...items, newItem]);
      setCheckedItems([...checkedItems, false]);
      setNewItem('');
    }
  };

  // Delete item from the list
  const deleteItem = (index) => {
    const updatedItems = items.filter((_, i) => i !== index);
    const updatedCheckedItems = checkedItems.filter((_, i) => i !== index);
    setItems(updatedItems);
    setCheckedItems(updatedCheckedItems);
  };

  // Toggle the checked state for a specific item
  const toggleChecked = (index) => {
    const updatedCheckedItems = [...checkedItems];
    updatedCheckedItems[index] = !checkedItems[index];
    setCheckedItems(updatedCheckedItems);
  };

  // Set dark mode to !isDarkMode
  const darkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className='parent' style={{ backgroundColor: isDarkMode ? 'black' : 'white', color: isDarkMode ? 'white' : 'black', height: '100vh', width: '100%', position: 'static' }}>
      <h1><center>To-do list</center></h1>
      <div>
        <center>
          <input
            type="text"
            id='myText'
            style={{ marginBottom: '10px' }}
            placeholder="       Enter to-do list item"
            value={newItem}
            onChange={(event) => setNewItem(event.target.value)}
          />
        </center>
        <center>
          <button className='addItemBtn' onClick={addItem} style={{ cursor: 'pointer' }}>Add</button>
        </center>
      </div>
      <p>
        <button className='darkModeBtn' onClick={darkMode}>Change Mode</button>
      </p>
      <ul style={{ listStyleType: 'none' }}>
        {items.map((item, index) => (
          <li key={index}>
            <label style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
              <input
                type='checkbox'
                id={`checkItems-${index}`}
                checked={checkedItems[index]}
                onChange={() => toggleChecked(index)}
              />
              <span style={{ width: '300px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item}</span>
              <button className="deleteBtn" onClick={() => deleteItem(index)}>Delete</button>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListApp;
