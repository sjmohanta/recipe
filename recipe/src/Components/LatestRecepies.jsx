import appConfig from "../Utility/AppConfig";
import { useState, useEffect } from "react";
import  RecipeCard from "./RecipeCard"; 

export default function LatestRecepies({message})
{
    const [latestRecepieData, setLatestRecepis] = useState({
        status: 0,
        recepies: [],
        message: message
    });

    useEffect(() => {
        const apiRootUrl = AppConfig("ApiRootPath");
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
        return <RecipeCard {...recipe}></RecipeCard>;
    });

    return <div>
        <h2 className="text-info">Latest Recepies</h2>
        <hr></hr>
        <div className="row">
            {latestRecepieData.status == 0 && <p>{latestRecepieData.message}</p>}
            {latestRecepieData.status == 200 && !latestRecepieData.recepies.length && <p className="text-warning">
            No receipies were found. Be the first to add a recipe</p>}
            {latestRecepieData.status == 200 && latestRecepieData.recepies.length && recipeCards}
            {latestRecepieData.status == 500 && <p className="text-danger">Something went wrong while getting recipies. Please check again later.</p>}
        </div>        
    </div>
}