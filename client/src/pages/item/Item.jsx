import React , {useContext, useState} from 'react';
import NavBar from '../../components/navbar/navbar.jsx';
import useFetch from '../../hooks/useFetch.jsx';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext.jsx';
// import Reserve from '../../components/reserve/reserve.jsx';
import "./item.css";

const Item = () => {
    const location =useLocation();
    const id =location.pathname.split("/")[2];
    const [openModal, setOpenModal] = useState(false);


    const {data, loading, error, reFetch} = useFetch(`http://localhost:8800/api/items/${id}`);
    const {user} = useContext(AuthContext);
    const navigate = useNavigate();



    const handleClick = () => {
        if (user) {
            setOpenModal(true);

        } else {
            navigate("/login");
        }
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
                    </div>


                </div>
            </div>}
            {/* {openModal && <Reserve setOpen={setOpenModal} serviceId={id}/> } */}
        </div>
    )
}

export default Item;