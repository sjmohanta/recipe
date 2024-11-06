import Constants from "../Constants";
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
        fetch(`http://localhost:3000/recipes`)
        .then(function (response) {        
            if(response.ok){
                response.json().then(function (result) {
                    var latestRecipeList = result;
                    latestRecepieData.status = 200;
                    latestRecepieData.recepies = latestRecipeList;
                    setLatestRecepis(latestRecepieData);
            });    
        }
        else 
        {
            latestRecepieData.status = 500;
            latestRecepieData.recepies = [];
            setLatestRecepis(latestRecepieData);
        }
    });
      }, []);

    var recipeCards = latestRecepieData.recepies.map(function (recipe) {
        debugger;
        return <RecipeCard {...recipe}></RecipeCard>;
    });

    return <div>
        <h2 className="text-info">Latest Recepies</h2>
        <div className="row">
            {latestRecepieData.status == 0 && <p>Please wait a while recipeies are being loaded.</p>}
            {latestRecepieData.status == 200 && !latestRecepieData.recepies.length && <p className="text-warning">
            No receipies were found. Be the first to add a recipe</p>}
            {latestRecepieData.status == 200 && latestRecepieData.recepies.length && recipeCards}
            {latestRecepieData.status == 500 && <p className="text-danger">Something went wrong while getting recipies. Please check again later.</p>}
        </div>        
    </div>
}