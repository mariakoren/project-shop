import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { useContext, useState, useEffect } from "react";
import { SearchContext } from "../../context/SContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {AuthContext} from "../../context/AuthContext";

const Buy = ({ setOpen, itemId}) => {
  // const { data } = useFetch(`http://localhost:8800/api/services/${serviceId}/availability`);
//   const { item } = useContext(SearchContext);
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
        })
        .catch(error => {
          console.error('Error creating invoice:', error.response ? error.response.data : error.message);
        });

      navigate("/");     
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
        onChange={handleSelect}>
        </input>

        
         <button onClick={handleClick} className="rButton">
          Zarezerwuj teraz!
        </button>
      </div>
    </div>
  );
};

export default Buy;