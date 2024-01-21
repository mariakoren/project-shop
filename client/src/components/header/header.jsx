import "./header.css";
import {useContext, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPhone} from '@fortawesome/free-solid-svg-icons';
import {faInstagram} from '@fortawesome/free-brands-svg-icons'
import { SearchContext } from "../../context/SContext";




const Header = () => {

    const [item, setItem] = useState("");


    const navigate = useNavigate();

    const {dispatch} = useContext(SearchContext);


    const handleSearch = () => {
        dispatch({type:"NEW_SEARCH", payload:{item}})
        navigate("/items", {state: {item}})
    };
    return (
        <div className ="header">
            <div className="headerContainer">
                <div className="headerList">
                    <div className="headerListItem">
                        <FontAwesomeIcon icon={faPhone} /> 
                        <span>123456789</span>
                    </div>
                    <div className="headerListItem">
                        <FontAwesomeIcon icon={faInstagram} /> 
                        <span>shop</span>
                    </div>
                </div>
                <h1 className="headerTitle">Zapraszamy do naszego sklepu</h1>
                <div className="headerSearch">
                    <div className="headerSearchItem">
                        <input
                        type = " text"
                        placeholder="Jaki towar szukamy?"
                        className="headerSearchInput"
                        onChange={e=>setItem(e.target.value)}
                        />
                    </div>

                    <div className="headerSearchItem" >
                        <button className="headerBth" onClick={handleSearch}>Szukaj</button>
                    </div>
                    
                </div>
                
            </div>
        </div>
    )
}

export default Header;