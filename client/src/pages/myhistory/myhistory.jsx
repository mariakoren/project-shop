import useFetch from "../../hooks/useFetch";
import { AuthContext } from "../../context/AuthContext";
import { useContext, useState } from "react";
import axios from "axios";

const MyHistory = () => {
  const {user} = useContext(AuthContext);
  const {data: userdata} = useFetch(`http://localhost:8800/api/buy/find?id=${user._id}`)

  // const handleDelete = async (id) => {
  //   try {
  //     console.log(id);
  //     const response = await axios.delete(`http://localhost:8800/api/reservation/${id}`);
  //     console.log(`Rezerwacja ${response.data} została usunięta, a usługa zaktualizowana pomyślnie`);
  //   } catch (error) {
  //     console.error('Błąd podczas usuwania rezerwacji:', error.response.data);
  //   }
  // };
  
  return (
    <div >
      <h1>Twoja historia zakupów {user.username}</h1>
      {userdata.map((dane) => (
            <li key={dane._id}>
                <ItemData itemId={dane.itemDetails.itemId} quantity={dane.itemDetails.quantity}/>
                {/* {
                  dane.status === "made"?
                  <button onClick={() => handleDelete(dane._id)}>usuń</button>
                  : <></>
                } */}
            </li>
      ))}
    </div>
  );
};


const ItemData = ({itemId, quantity}) => {
    const {data} = useFetch(`http://localhost:8800/api/items/${itemId}`);
    return (
      <>
        masz {data.name} w ilości {quantity}
      </>
    )

}
export default MyHistory;