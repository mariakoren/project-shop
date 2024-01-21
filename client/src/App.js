import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Home from "./pages/home/Home";
import List from "./pages/list/List";
import Item from "./pages/item/Item";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/items" element={<List/>}/>
        <Route path="/items/:id" element={<Item/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;