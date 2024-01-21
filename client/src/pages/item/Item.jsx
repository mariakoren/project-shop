import React , {useContext, useState} from 'react';
import NavBar from '../../components/navbar/navbar.jsx';
import useFetch from '../../hooks/useFetch.jsx';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext.jsx';
import Buy from '../../components/buy/buy.js';
import "./item.css";
import axios from 'axios';

const Item = () => {
    const location =useLocation();
    const id =location.pathname.split("/")[2];
    const [openModal, setOpenModal] = useState(false);
    const [content, setContent] = useState('');


    const {data, loading, error, reFetch} = useFetch(`http://localhost:8800/api/items/${id}`);
    const {data: dataCom, loading: loadingCom, error: errorCom, reFetch: reFetchCom} = useFetch(`http://localhost:8800/api/items/comments/${id}`);
    const {user} = useContext(AuthContext);
    const navigate = useNavigate();



    const handleClick = () => {
        if (user) {
            setOpenModal(true);
        } else {
            navigate("/login");
        }
    }

    const handleChange = (e) => {
        setContent(e.target.value);
      };

    const addComment = async () => {
        try {
            const comment = {
                content: content,
                username: user.username
            }
            await axios.post(`http://localhost:8800/api/comments/${id}`, comment, { withCredentials: true });
            reFetch();
            window.location.reload();
          } catch (error) { }

    }

    return (
        <div>
            <NavBar/>
            {loading ? "loading" : <div className="serviceContainer">

                <div className="serviceWrapper">
                    <button onClick={handleClick} className="bookNow">Kupuj teraz</button>
                    <h1 className="serviceTitle">{data.name}</h1>
                    <div className="servicePriceHighLight">
                        <span>{data.desc}</span>
                    </div>

                    <div className="serviceDetails">
                        <div className="serviceDetailsText">
                            {data.fullDesc}
                        </div>
                        <div className="serviceDetailsPrice">
                            <h2>
                                <b>{data.price}zł</b>
                            </h2>
                            <button onClick={handleClick} className="bookNow2">Kupuj teraz</button>
                        </div>
                        <div className="comments">
                            <label>Komentarze:</label>
                            {
                                dataCom.map((com) => (
                                    <div key={com._id} className='comment'>
                                        <b>{com.username}</b>
                                        <div>{com.content}</div>
                                    </div>
                                ))
                            }
                            {user ? 
                            <div>
                                <input type="text" value={content} onChange={handleChange}></input> 
                                <button onClick={addComment}>dodaj komentarz</button>
                            </div>
                            : <></>}
                        </div>
                    </div>
                </div>
            </div>}
            {openModal && <Buy setOpen={setOpenModal} itemId={id}/> }
        </div>
    )
}

export default Item;