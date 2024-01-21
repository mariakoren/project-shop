import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useFetch from '../../hooks/useFetch';

const EditItem = () => {
  const { data, loading, error, reFetch } = useFetch('http://localhost:8800/api/items');
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    price: 0,
    desc: '',
    avaible: 0,
  });
  const [editMode, setEditMode] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleEditClick = (itemId) => {
    setEditMode(true);
    setSelectedItemId(itemId);
    const selectedItem = data.find(item => item._id === itemId);
    setFormData(selectedItem);
  };

  const handleDeleteClick = async (itemId) => {
    try {
      await axios.delete(`http://localhost:8800/api/items/${itemId}`, { withCredentials: true });
      reFetch();
      console.log('Usunięto pomyślnie');
    } catch (error) {
      console.error('Błąd podczas usuwania:', error);
    }
  };

  const handleSubmit = async () => {
    try {
      if (editMode) {
        await axios.put(`http://localhost:8800/api/items/${selectedItemId}`, formData, { withCredentials: true });
        setEditMode(false);
      }
      reFetch();
      setFormData({
        name: '',
        type: '',
        price: 0,
        desc: '',
        avaible: 0,
      });
    } catch (error) {
      console.error('Error adding/editing item:', error);
    }
  };

  return (
    <>
      <ul>
        {data.map((item) => (
          <li key={item._id}>
            <div>
              <h3>{item.name}</h3>
              <button onClick={() => handleEditClick(item._id)}>Edytuj</button>
              <button onClick={() => handleDeleteClick(item._id)}>Usuń</button>
            </div>
          </li>
        ))}
      </ul>

      {editMode && (
        <form>
          <div>
            <label htmlFor="name">Nazwa:</label>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} />
          </div>

          <div>
            <label htmlFor="type">Typ:</label>
            <input type="text" id="type" name="type" value={formData.type} onChange={handleChange} />
          </div>

          <div>
            <label htmlFor="price">Cena:</label>
            <input type="number" id="price" name="price" value={formData.price} onChange={handleChange} />
          </div>

          <div>
            <label htmlFor="desc">Opis:</label>
            <textarea id="desc" name="desc" value={formData.desc} onChange={handleChange} />
          </div>

          <div>
            <label htmlFor="avaible">Dostępność:</label>
            <input type="number" id="avaible" name="avaible" value={formData.avaible} onChange={handleChange} />
          </div>

          <div>
            <button type="button" onClick={handleSubmit}>
              Edytuj element
            </button>
          </div>
        </form>
      )}
    </>
  );
};

export default EditItem;