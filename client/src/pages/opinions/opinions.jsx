import axios from "axios";
import {  useContext, useState } from "react";
// import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import useFetch from "../../hooks/useFetch.jsx";



const Opinions = () => {
    const {data, reFetch} = useFetch('http://localhost:8800/api/opinions')
    const {user} = useContext(AuthContext);
     const [formData, setFormData] = useState({
        content: '',
        rating: 0
      });
    const [values, setValues] = useState({
        content: '',
        rating: 0,
      });

      const [selectedOpinionId, setSelectedOpinionId] = useState(null);
      const [editMode, setEditMode] = useState(false);
     
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues({
          ...values,
          [name]: value,
        });
      };

      const handleChangeEdit = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
      };

    const handleSubmit = async () => {
        try {
          await axios.post("http://localhost:8800/api/opinions", values);
          reFetch();
        } catch (err) {
            console.error(err);
          }
    }

    const handleEdit = (opinionId) => {
      setEditMode(true);
      setSelectedOpinionId(opinionId);
      const selectedOpinion = data.find(opinion => opinion._id === opinionId);
      setFormData(selectedOpinion);
    };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8800/api/opinions/${id}`, values);
      reFetch();
    } catch (err) {
        console.error(err);
      }
}
const handleSubmitEdit = async () => {
  try {
    if (editMode) {
      await axios.put(`http://localhost:8800/api/opinions/${selectedOpinionId}`, formData, { withCredentials: true });

      setEditMode(false);
    }
    reFetch();
    setFormData({
      content: "",
      rating: 0
    });
    
  } catch (error) {
    console.error('Error adding/editing user:', error);
  }
};
        return (
          <div >
            <form>
                <div>
                  <label htmlFor="content">Treść opinii:</label>
                  <textarea id="content" name="content" value={values.content} onChange={handleChange} />
                </div>
                <div>
                  <label htmlFor="rating">Ocena:</label>
                  <input type="number" id="rating" name="rating" value={values.rating} onChange={handleChange} />  
                </div>
                <div>
                  <button type="button" onClick={handleSubmit}>Dodaj opinię</button>
                </div>
                </form>
                <>
                    {data.map((dane) => (
                        <ul key = {dane._id}>
                            <li>
                                <div>
                                    <h3>{dane.date}</h3>
                                    <p>ocena: {dane.rating}</p>
                                    <p>{dane.content}</p>
                                    {user && user.username === "admin" ? 
                                        <div>
                                        <button onClick={() => handleEdit(dane._id)}>Edytuj</button>
                                        <button onClick={() => handleDelete(dane._id)}>Usuń</button>

                                      </div> : 
                                        <></> }

                                
                                      
                                </div>
                            </li>
                        </ul>
                    ))}

                    {editMode && (
                                        <form>
                                          <div>
                                            <label htmlFor="content">content:</label>
                                            <input type="text" id="content" name="content" value={formData.content} onChange={handleChangeEdit} />
                                          </div>
                                          <div>
                                            <label htmlFor="rating">rating:</label>
                                            <input type="number" id="rating" name="rating" value={formData.rating} onChange={handleChangeEdit} />
                                          </div>
                                

                                          <div>
                                            <button type="button" onClick={handleSubmitEdit}>
                                              Edytuj opinii
                                            </button>
                                          </div>
                                        </form>
                                      )}
                </>
          </div>
        );
};

export default Opinions;