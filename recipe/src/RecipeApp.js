import { Route, Routes, BrowserRouter } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import './App.css';

import TopNav from './Components/Helper/TopNav';
import AuthContextProvider from './Store/Auth-Context';
import RecipeDetails from './Components/Recipe/RecipeDetails';
import CreateRecipe from './Components/Recipe/CreateRecipe';
import RecipesByIntegrand from './Components/Recipe/Search/RecipesByIntegrand';
import RecipesByPreparationTime from './Components/Recipe/Search/RecipesByPrepationTime';
import RecipesByRating from './Components/Recipe/Search/RecipesByRating';
import RecipeList from './Components/Recipe/RecipeList';
import Home from './Components/Home';
import Login from './Components/Auth/Login';
import Logout from './Components/Auth/Logout';
import Register from './Components/Auth/Register';

export default function RecipeApp() {
  return (
      <div className="App">
        <AuthContextProvider>
          <BrowserRouter>
            <TopNav></TopNav>
            <Routes>
              <Route path='/' element={<Home/>} />
              <Route path='/Login' element={<Login />} />
              <Route path='/Register' element={<Register />} />
              <Route path='/Logout' element={<Logout />} />
              <Route path='/Recipe/Create' element={<CreateRecipe/>} /> 
              <Route path='/Recipes' element={<RecipeList/>} />
              <Route path='/Recipes/Integrand' element={<RecipesByIntegrand/>} />
              <Route path='/Recipes/PreparationTime' element={<RecipesByPreparationTime/>} />
              <Route path='/Recipes/Rating' element={<RecipesByRating/>} />
              <Route path='/Recipe/:id' element={<RecipeDetails/>} />         
            </Routes>
          </BrowserRouter>
        </AuthContextProvider>        
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.0/css/all.min.css" 
          integrity="sha512-9xKTRVabjVeZmc+GUW8GgSmcREDunMM+Dt/GrzchfN8tkwHizc5RP4Ok/MXFFy5rIjJjzhndFScTceq5e6GvVQ==" 
          crossOrigin="anonymous" referrerPolicy="no-referrer" />
    </div>
  );
}