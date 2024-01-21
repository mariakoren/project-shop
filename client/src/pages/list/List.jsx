import React, { useState} from 'react';
import {useLocation} from  'react-router-dom';
import NavBar from '../../components/navbar/navbar.jsx';
import SearchItem from '../../components/searchItem/searchItem.jsx';
import useFetch from '../../hooks/useFetch.jsx';
import "./list.css";

const List = () => {
    const location = useLocation();
    const [item, setItem] = useState(location.state.item);
    const {data, loading, error, reFetch} = useFetch(`http://localhost:8800/api/items/find/${item}`);    
    const handleClick = ()=> {
        reFetch()
    }
    return (
        <div>
            <NavBar/>
            <div className="listContainer">
                <div className="listWrapper">
                    <div className="listSearch">
                        <h1 className="lsTitle">Search</h1>
                        <div className="lsItem">
                            <label>Nazwa produktu</label>
                            <input
                              type="text"
                              placeholder={item}
                              onChange={(e) => setItem(e.target.value)}
                            />
                        </div>
                        <button onClick={handleClick}>Szukaj</button>
            
                    </div>
                    <div className="listResult">
                        {loading ? "loading" : <>
                            {data.map(item => (
                                <SearchItem item={item} key={item._id}/>
                            ))}
                        </>}
                    </div>
                </div>
            </div>
        </div>
    )     
}

export default List;