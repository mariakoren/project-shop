import {Link} from "react-router-dom";
import "./searchItem.css";
const SearchItem = ({item}) => {
    return(
        <div className="searchItem">
            <div className="siDesc">
                <h1 className='siTitle'>{item.name}</h1>
                <span className="siAbout">{item.desc}</span>
            </div>
            <div className="siDetails">
                <div className="siDetailText">
                    <span className="siPrice">{item.price} zł</span>
                </div>
                <Link to={`http://localhost:3000/services/${item._id}`}>
                        <button className='siCheckButton'>zobacz dostępność</button>
                </Link>
            </div>
        </div>
    )

}

export default SearchItem;