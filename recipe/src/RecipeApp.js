import { RecipeRouter } from './Routes/RecipeRouter';
import { RouterProvider } from 'react-router-dom';
import AuthContextProvider from './Store/AuthContext';
import { ErrorProvider } from './Store/ErrorContext';

export default function RecipeApp()
{
    return <ErrorProvider>
        <AuthContextProvider>
        <RouterProvider router={RecipeRouter} />
        </AuthContextProvider>
    </ErrorProvider>;
}