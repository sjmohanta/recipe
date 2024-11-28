import { Route, Routes, BrowserRouter } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import './App.css';
import RecipeDetails from './Components/RecipeDetails';
import Home from './Components/Home';
import Login from './Components/Auth/Login';
import Logout from './Components/Auth/Logout';
import Register from './Components/Auth/Register';
import CreateRecipe from './Components/CreateRecipe';
import RecipesByIntegrand from './Components/RecipesByIntegrand';
import RecipesByPreparationTime from './Components/RecipesByPrepationTime';
import RecipesByRating from './Components/RecipesByRating';
import RecipeList from './Components/RecipeList';
import TopNav from './Components/TopNav'; 

export default function RecipeApp() {
  return (
    <div className="App">
      <BrowserRouter>
        <TopNav></TopNav>
          <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/Login' element={<Login/>} />
            <Route path='/Register' element={<Register/>} />
            <Route path='/Logout' element={<Logout/>} />
            <Route path='/Recipe/Create' element={<CreateRecipe/>} /> 
            <Route path='/Recipes' element={<RecipeList/>} />
            <Route path='/Recipes/Integrand' element={<RecipesByIntegrand/>} />
            <Route path='/Recipes/PreparationTime' element={<RecipesByPreparationTime/>} />
            <Route path='/Recipes/Rating' element={<RecipesByRating/>} />
            <Route path='/Recipe/:id' element={<RecipeDetails/>} />         
        </Routes>
      </BrowserRouter>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.0/css/all.min.css" 
        integrity="sha512-9xKTRVabjVeZmc+GUW8GgSmcREDunMM+Dt/GrzchfN8tkwHizc5RP4Ok/MXFFy5rIjJjzhndFScTceq5e6GvVQ==" 
        crossOrigin="anonymous" referrerPolicy="no-referrer" />
    </div>
  );
}