import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SERVER_URL } from '../constants.js';

// changed courseTitle to courseId throughout code so assignment would add to MySQL even though error toast msg appears
// need to update in backend but was not part of the assignment

const AddAssignment = () => {
  const history = useHistory();
  const [assignmentName, setAssignmentName] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [courseId, setCourseId] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch(`${SERVER_URL}/gradebook`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        assignmentName,
        dueDate,
        courseId,
      }),
    })
      .then((response) => response.json())
      .then((responseData) => {
        // Handle the response data or display a success message
        toast.success('Assignment added successfully', {
          position: toast.POSITION.BOTTOM_LEFT,
        });
        history.push('/'); // Navigate back to the assignment list page
      })
      .catch((err) => {
        toast.error('Failed to add assignment', {
          position: toast.POSITION.BOTTOM_LEFT,
        });
        console.error(err);
      });
  };

  return (
    <div>
      <h2>Add New Assignment</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Assignment Name:
          <input
            type="text"
            value={assignmentName}
            onChange={(e) => setAssignmentName(e.target.value)}
          />
        </label>
        <br />
        <label>
          Due Date:
          <input
            type="text"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </label>
        <br />
        <label>
          Course Id:
          <input
            type="text"
            value={courseId}
            onChange={(e) => setCourseId(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Add Assignment</button>
      </form>
      <ToastContainer autoClose={1500} />
    </div>
  );
};

export default AddAssignment;
