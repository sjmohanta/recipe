import { Route, Routes, BrowserRouter } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import './App.css';
import RecipeDetails from './Components/RecipeDetails';
import Home from './Components/Home';
import Login from './Components/Auth/Login';
import Register from './Components/Auth/Register';
import CreateRecipe from './Components/CreateRecipe';
import RecipesByIntegrand from './Components/RecipesByIntegrand';

export default function RecipeApp() {
  return (
    <div className="App">
        <BrowserRouter>
            <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/Login' element={<Login/>} />
            <Route path='/Register' element={<Register/>} />
            <Route path='/Recipe/Create' element={<CreateRecipe/>} /> 
            <Route path='/Recipe/Integrand' element={<RecipesByIntegrand/>} />
            <Route path='/Recipe/:id' element={<RecipeDetails/>} />         
        </Routes>
        </BrowserRouter>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.0/css/all.min.css" 
        integrity="sha512-9xKTRVabjVeZmc+GUW8GgSmcREDunMM+Dt/GrzchfN8tkwHizc5RP4Ok/MXFFy5rIjJjzhndFScTceq5e6GvVQ==" 
        crossOrigin="anonymous" referrerPolicy="no-referrer" />
    </div>
  );
}