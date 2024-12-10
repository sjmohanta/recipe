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
import { latestRecipiesLoader } from '../Components/Recipe/Loader/RecipeLoaders';
import CustomError from './CustomError';

export const RecipeRouter = createBrowserRouter([
    { 
      path: '/', 
      element: <RootLayout />,
      errorElement: <CustomError />,
      children: [
        {
          index: true,
          element: <Home />,
          loader: latestRecipiesLoader
        },
        { path: '/Login', element: <Login /> },
        { path: '/Register', element: <Register /> },
        { path: '/Logout', element: <Logout /> },
        { path: '/Recipe/Create', element: <CreateRecipe /> },
        { path: '/Recipes', element: <RecipeList /> },
        { path: '/Recipes/Integrand', element: <RecipesByIntegrand /> },
        { path: '/Recipes/PreparationTime', element: <RecipesByPreparationTime /> },
        { path: '/Recipes/Rating', element: <RecipesByRating /> },
        { path: '/Recipes/:id', element: <RecipeDetails /> }
      ]
    }
  ]);