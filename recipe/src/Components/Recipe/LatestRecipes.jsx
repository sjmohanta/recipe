import  RecipeCard from "./RecipeCard"; 
import { useLoaderData } from "react-router-dom";

export default function LatestRecipes({message})
{
    const latestRecepieData = useLoaderData();

    var recipeCards = latestRecepieData.map(function (recipe) {
        return <RecipeCard key={recipe.id} {...recipe}></RecipeCard>;
    });

    return <div className="m-2">
                <h2 className="text-light">Recepies</h2>        
                <div className="row">                    
                    {!latestRecepieData.length && <p className="text-warning">
                    No receipies were found. Be the first to add a recipe</p>}
                    {latestRecepieData.length && recipeCards}
                </div>        
            </div>;
}