import appConfig from "../../Utility/AppConfig";
import { useState, useEffect } from "react";
import  RecipeCard from "./RecipeCard"; 
import { ServerError } from "../Shared/ServerError";

export default function LatestRecipes({message})
{
    const [latestRecepieData, setLatestRecepis] = useState({
        status: 0,
        recepies: [],
        message: message
    });

    useEffect(() => {
        async function getLatestRecipes()
        {
            const apiRootUrl = appConfig("ApiRootPath");
            var response = await fetch(`${apiRootUrl}/recipes`);

            try
            {
                if (response.ok)
                {
                    var result = await response.json();
                    setLatestRecepis({
                        status: 200,
                        recepies: result,
                        message: null
                    });
                }
                else
                {
                    setLatestRecepis({
                        ...latestRecepieData,
                        status: 500
                    });
                }
            }
            catch(e)
            {
                setLatestRecepis({
                    ...latestRecepieData,
                    status: 500
                });
                console.warn(e);
            }
        }

        getLatestRecipes();        
    }, []);

    var recipeCards = latestRecepieData.recepies.map(function (recipe) {
        return <RecipeCard key={recipe.id} {...recipe}></RecipeCard>;
    });

    return <div className="m-2">
                <h2 className="text-light">Recepies</h2>        
                <div className="row">
                    {latestRecepieData.status == 0 && <p>{latestRecepieData.message}</p>}
                    {latestRecepieData.status == 200 && !latestRecepieData.recepies.length && <p className="text-warning">
                    No receipies were found. Be the first to add a recipe</p>}
                    {latestRecepieData.status == 200 && latestRecepieData.recepies.length && recipeCards}
                    {latestRecepieData.status == 500 && <ServerError />}
                </div>        
            </div>;
}