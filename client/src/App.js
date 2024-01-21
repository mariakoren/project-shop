import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Home from "./pages/home/Home";
import List from "./pages/list/List";
import Item from "./pages/item/Item";
import Login from "./pages/login/login";
import Register from "./pages/register/register";
import AllItems from "./pages/allitems/allitems";
import MyHistory from "./pages/myhistory/myhistory";
import Admin from "./pages/admin/admin";
import AddItem from "./pages/admin/additem";
import EditItem from "./pages/admin/edititem";
import UserInfo from "./pages/admin/userinfo";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/items" element={<List/>}/>
        <Route path="/items/:id" element={<Item/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/allitems" element={<AllItems/>}/>
        <Route path="/myhistory" element={<MyHistory/>}/>
        <Route path="/admin" element={<Admin/>}/>
        <Route path="/admin/additem" element={<AddItem/>}/>
        <Route path="/admin/edititem" element={<EditItem/>}/>
        <Route path="/admin/userinfo" element={<UserInfo/>}/>


      </Routes>
    </BrowserRouter>
  );
}

export default App;