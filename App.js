/*
After studying JavaScript and React
this was my solution for a simple List implementation.
*/

import './buttons.css' // Button layout: https://alvarotrigo.com/blog/css-round-button
import React, { useState, useEffect } from 'react';  //   https://www.youtube.com/watch?v=4pO-HcG2igk&ab_channel=NetNinja


function ListApp() {

  // VARIABLES
  const [items, setItems] = useState(
    JSON.parse(localStorage.getItem('LIST_ELEMENTS')) || []
  );
  const [newItem, setNewItem] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(JSON.parse(localStorage.getItem('IS_DARK')) || false);
  const [isChecked, setIsChecked] = useState(JSON.parse(localStorage.getItem('IS_CHECKED')) || {});

  // METHODS

  // UseEffect for our items inside the list.
  useEffect(()=> {
    localStorage.setItem('LIST_ELEMENTS', JSON.stringify(items));
  }, [items])
  
  // UseEffect for keeping page in the darkmode or not whenever page is reloaded
  useEffect(()=> {
    localStorage.setItem('IS_DARK', JSON.stringify(isDarkMode));
  }, [isDarkMode])
  
  // UseEffect for checkboxes]
  useEffect(()=>{
    localStorage.setItem('IS_CHECKED', JSON.stringify(isChecked));
  }, [isChecked])

  // Add item to the list
  const addItem = () => {
    if (newItem !== '') {
      setItems([...items, newItem]);
      setNewItem('');
    }
  };

  // Delete item from the list
  const deleteItem = (index) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
  };
  
  // Update checkbox state in useState(JSON.parse(localStorage.getItem('IS_CHECKED'))
  const Togglecheckbox = (index) => {
    const updatedCheckboxValues = { ...isChecked };
    updatedCheckboxValues[index] = !updatedCheckboxValues[index];
    setIsChecked(updatedCheckboxValues); 
  }
  const darkMode = () => {
    setIsDarkMode(!isDarkMode);
  };


  

  return (
    <div className='parent' style={{ backgroundColor: isDarkMode ? 'black' : 'white', color: isDarkMode ? 'white' : 'black', height: '100vh', width: '100%', position: 'static' }}>
      <h1><center>To do list</center></h1>
      <div>
        <center>
          <input
            type="text"
            id='myText'
            style={{marginBottom: '10px'}}
            placeholder="       Enter to-do list item"
            value={newItem}
            onChange={(event) => setNewItem(event.target.value)}
          />
        </center>
        <center>
          <button className='addItemBtn'  onClick={addItem} style={{cursor: 'pointer'}}>Add</button>
        </center>
      </div>
      <p>
        <button className='darkModeBtn' onClick={darkMode}>Change Mode</button>
      </p>
      <ul style={{listStyleType: 'none'}}>
        {items.map((item, index) => (
          <li key={index}>
            <label style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}
            onClick={(e) => {
              // Don't let the state of the checkbox change, unless the cursor is on the top of the checkbox
              // I also added that it just counts for the checkbox with ID checkItems-${index},
              // so we can keep this "feature" for other checkboxes if needed
              // not sure if there is an easier way to do this... another way would be
              //getting x and y positon of your mouse and comparing with the x and y position of checkbox
              if (!e.target.matches(`input[type="checkbox"]`) && !e.target.matches(`input[id="checkItems-${index}"]`)) {
                e.preventDefault();
              }
            }}
            >
                <input type='checkbox' id={`checkItems-${index}`}  checked={isChecked[index] || false} onChange={() => Togglecheckbox(index)}/>
              <span style={{width: '300px', whiteSpace: 'nowrap', overflow:'hidden', textOverflow:'ellipsis'}}>{item}</span>
              <button className="deleteBtn"  onClick={() => deleteItem(index)}>Delete</button>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListApp;
