import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { useContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {AuthContext} from "../../context/AuthContext";
import "./buy.css";

const Buy = ({ setOpen, itemId}) => {
  const {user} = useContext(AuthContext);
  const navigate = useNavigate();
  const [avaibleQuantity, setAvaibleQuantity] = useState(null);
  const [choosenQuantity, setChoosenQuantity] = useState(null);



  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8800/api/items/avaible/${itemId}`);
        setAvaibleQuantity(response.data);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          console.log(`Brak danych dla wybranej usługi`);
        } else {
          console.error('Błąd podczas pobierania danych:', error);
        }
      }
    };

    fetchData();
  });

  const handleSelect= (event) => {
    setChoosenQuantity(event.target.value);
  };

  const handleClick = async () => {
      const invoiceData = {
        userId: user._id,
        itemDetails: {
          itemId: itemId,
          quantity: choosenQuantity
        }
      };
      
      axios.post('http://localhost:8800/api/buy', invoiceData)
        .then(response => {
          console.log('Invoice created successfully');
          navigate("/");   
        })
        .catch(error => {
          console.error('Error creating invoice:', error.response ? error.response.data : error.message);
        });

        
  };

  return (
    <div className="reserve">
      <div className="rContainer">
        <FontAwesomeIcon
          icon={faCircleXmark}
          className="rClose"
          onClick={() => setOpen(false)}
        />
        <span>Wybierz ilość:</span>
        <span>Dostępno: {avaibleQuantity} </span>
        <input
        type="number"
        id="quantityInput"
        name="quantity"
        min={1} 
        max={avaibleQuantity} 
        onChange={handleSelect}
      />

        
         <button onClick={handleClick} className="rButton">
          Kupuj teraz!
        </button>
      </div>
    </div>
  );
};

export default Buy;