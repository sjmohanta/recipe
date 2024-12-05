import { createBrowserRouter } from 'react-router-dom';

import RecipeDetails from '../Components/Recipe/RecipeDetails';
import CreateRecipe from '../Components/Recipe/CreateRecipe';
import RecipesByIntegrand from '../Components/Recipe/Search/RecipesByIntegrand';
import RecipesByPreparationTime from '../Components/Recipe/Search/RecipesByPrepationTime';
import RecipesByRating from '../Components/Recipe/Search/RecipesByRating';
import RecipeList from '../Components/Recipe/RecipeList';
import Home from '../Components/Home';
import Login from '../Components/Auth/Login';
import Logout from '../Components/Auth/Logout';
import Register from '../Components/Auth/Register';
import RootLayout from '../Components/Layout/Layout';

export const RecipeRouter = createBrowserRouter([
    { 
      path: '/', 
      element: <RootLayout />,
      children: [
        {
          path: '/',
          element: <Home />
        },
        { path: '/Login', element: <Login /> },
        { path: '/Register', element: <Register /> },
        { path: '/Logout', element: <Logout /> },
        { path: '/Recipe/Create', element: <CreateRecipe /> },
        { path: '/Recipes', element: <RecipeList /> },
        { path: '/Recipes/Integrand', element: <RecipesByIntegrand /> },
        { path: '/Recipes/PreparationTime', element: <RecipesByPreparationTime /> },
        { path: '/Recipes/Rating', element: <RecipesByRating /> },
        { path: '/Recipe/:id', element: <RecipeDetails /> }
      ]
    }
  ]);