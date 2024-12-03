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
        const apiRootUrl = appConfig("ApiRootPath");
        fetch(`${apiRootUrl}/recipes`)
        .then(function (response) {        
            if(response.ok){
                response.json().then(function (result) {                    
                    setLatestRecepis({
                        status: 200,
                        recepies: result,
                        message: null
                    });
                });    
            }
            else 
            {                
                setLatestRecepis({
                    status: 500,
                    recepies: [],
                    message: null
                });
            }
        });
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