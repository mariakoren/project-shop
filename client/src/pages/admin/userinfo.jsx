import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useFetch from '../../hooks/useFetch';

const UserInfo = () => {
  const { data, loading, error, reFetch } = useFetch('http://localhost:8800/api/users');
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [formData, setFormData] = useState({
    username: ''
  });
  const [editMode, setEditMode] = useState(false);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleEditClick = (userId) => {
    setEditMode(true);
    setSelectedUserId(userId);
    const selectedUser = data.find(user=> user._id === userId);
    setFormData(selectedUser);
  };

  const handleDeleteClick = async (userId) => {
    try {
      await axios.delete(`http://localhost:8800/api/users/${userId}`, { withCredentials: true });
      reFetch();
      console.log('Usunięto pomyślnie');
    } catch (error) {
      console.error('Błąd podczas usuwania:', error);
    }
  };

  const handleSubmit = async () => {
    try {
      if (editMode) {
        await axios.put(`http://localhost:8800/api/users/${selectedUserId}`, formData, { withCredentials: true });

        setEditMode(false);
      }
      reFetch();
      setFormData({
        username: ""
      });
      
    } catch (error) {
      console.error('Error adding/editing user:', error);
    }
  };

  return (
    <>
      <ul>
        {data.map((user) => (
          <li key={user._id}>
            <div>
              <h3>{user.username}</h3>
              <button onClick={() => handleEditClick(user._id)}>Edytuj</button>
              <button onClick={() => handleDeleteClick(user._id)}>Usuń</button>
            </div>
          </li>
        ))}
      </ul>

      {editMode && (
        <form>
          <div>
            <label htmlFor="username">username:</label>
            <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} />
          </div>

          
          <div>
            <button type="button" onClick={handleSubmit}>
              Edytuj użytkownika
            </button>
          </div>
        </form>
      )}
    </>
  );
};

export default UserInfo;