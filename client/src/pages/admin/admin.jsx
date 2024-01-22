import React from 'react';
import { useNavigate } from "react-router-dom";

const Admin = () =>{
    const navigate = useNavigate()
    return (
        <div>
            <div className="adminContainer">
                <button onClick={()=>navigate("/admin/additem")}>Dodać produkt</button>
                <button onClick={()=>navigate("/admin/edititem")}>Edytować produkt</button>
                <button onClick={()=>navigate("/admin/userinfo")}>Informacja o użytkownikach</button>
                <button onClick={()=>navigate("/admin/allinvoices")}>Informacja o wszystkich zakupach</button>
                <button onClick={()=>navigate("/")}>Na główną stronę</button>
            </div>
        </div>

    )
}

export default Admin;