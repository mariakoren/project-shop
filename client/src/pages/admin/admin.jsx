import React from 'react';
import { useNavigate } from "react-router-dom";

const Admin = () =>{
    const navigate = useNavigate()
    return (
        <div>
            <div className="adminContainer">
                <button onClick={()=>navigate("/admin/additem")}>Dodać produkt</button>
                <button onClick={()=>navigate("/admin/edititem")}>Edytować produkt</button>
            </div>
        </div>

    )
}

export default Admin;