import { Route, Routes, BrowserRouter } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import './App.css';
import RecipeDetails from './Components/RecipeDetails';
import Home from './Components/Home';

export default function RecipeApp() {
  return (
    <div className="App">
        <BrowserRouter>
            <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/Recipe/:id' element={<RecipeDetails/>} />         
        </Routes>
        </BrowserRouter>         
    </div>
  );
}