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
      </Routes>
    </BrowserRouter>
  );
}

export default App;