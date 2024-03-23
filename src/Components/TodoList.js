import React, { useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';

const TodoList = () => {
   const [textValue, setTextValue] = useState('');
   const [stringArray, setStringArray] = useState([]);
   const [editIndex, setEditIndex] = useState(null);

   const changeTextValue = (event) => {
      setTextValue(event.target.value);
   }

   const handleKeyDown = (event) => {
      if (event.key === 'Enter') {
         addOrUpdateItem();
      }
   }

   const addOrUpdateItem = () => {
      if (textValue.trim() === '') {
         // Show alert if textValue is empty
         alert('Please enter a valid item');
         return;
      }

      if (editIndex !== null) {
         setStringArray((prevArray) => {
            const updatedArray = [...prevArray];
            updatedArray[editIndex] = textValue;
            return updatedArray;
         });
         setEditIndex(null);
      } else {
         setStringArray((prevArray) => [...prevArray, textValue]);
      }

      setTextValue('');
   }


   // const deleteItem = (index) => {
   //    setStringArray((prevArray) => prevArray.filter((_, i) => i !== index));
   // }

   const deleteItem = (index) => {
      const isConfirmed = window.confirm('Are you sure you want to delete this item?');
   
      if (isConfirmed) {
         setStringArray((prevArray) => {
            const updatedArray = [...prevArray];
            updatedArray.splice(index, 1);
            return updatedArray;
         });
      }
   }
   

   const editItem = (index) => {
      setEditIndex(index);
      setTextValue(stringArray[index]);
   }

   return (
      <div className='container-fluid text-white bg-secondary'>
         <div className='row text-center'>
            <div className='col-6 offset-3'>
               <h3> To Do List </h3>
               <input
                  type='text'
                  value={textValue}
                  // onChange={(event) => changeTextValue(event)}
                  onChange={(event) => changeTextValue(event)}
                  onKeyDown={(event) => handleKeyDown(event)}
                  className='form-control'
                  placeholder='Enter List Items...'
               />
            </div>
         </div>
         <div className='row text-center m-2'>
            <div className='col-6 offset-3'>
               <button
                  className={`btn ${editIndex !== null ? 'btn-primary' : 'btn-success'} mx-2`}
                  onClick={addOrUpdateItem}
               >
                  {editIndex !== null ? 'Update' : 'Add'}
               </button>

            </div>
         </div>
         <div className='row text-center'>
            <div className='col-6 offset-3'>
               <table className='table'>
                  <thead>
                     <tr>
                        <th>Item</th>
                        <th>Action</th>
                     </tr>
                  </thead>
                  <tbody>
                     {stringArray.map((item, index) => (
                        <tr key={index}>
                           <td>{item}</td>
                           <td>
                              <button
                                 className='btn btn-warning mx-2'
                                 onClick={() => editItem(index)}
                                 style={{ background: 'none', border: 'none' }}
                              >
                                 <FaEdit style={{ color: 'blue' }} />
                              </button>
                              <button
                                 className='btn btn-danger mx-2'
                                 onClick={() => deleteItem(index)}
                                 style={{ background: 'none', border: 'none' }}
                              >
                                 <FaTrash style={{ color: 'red' }} />
                              </button>
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
         </div>
      </div>
   );
}

export default TodoList;






