import React, { useState } from 'react';
import axios from 'axios';


const AddItem = () => {
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    price: 0,
    desc: '',
    avaible: 0,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8800/api/items', formData, { withCredentials: true });

      console.log('Item added successfully:', response.data);
      setFormData({
        name: '',
        type: '',
        price: 0,
        desc: '',
        avaible: 0,
      });
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </label>
      <br />
      <label>
        Type:
        <input
          type="text"
          name="type"
          value={formData.type}
          onChange={handleChange}
          required
        />
      </label>
      <br />
      <label>
        Price:
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          required
        />
      </label>
      <br />
      <label>
        Description:
        <textarea
          name="desc"
          value={formData.desc}
          onChange={handleChange}
          required
        />
      </label>
      <br />
      <label>
        Available:
        <input
          type="number"
          name="avaible"
          value={formData.avaible}
          onChange={handleChange}
          required
        />
      </label>
      <br />
      <button type="submit">Add Item</button>
    </form>
  );
};

export default AddItem;