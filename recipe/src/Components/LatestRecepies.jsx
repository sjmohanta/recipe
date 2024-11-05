import {Constants} from "../Constants";
import { useState } from "react";
import { RecipeCard } from "./RecipeCard"; 

export default function LatestRecepies({message})
{
    const [{latestRecepieData, setLatestRecepis}] = useState({
        status: 0,
        recepies: [],
        message: message
    });
    
    debugger;
    fetch(`http://localhost:3000/recipes`).then(function (response) {        
        if(response.ok){
            response.json().then(function (result) {
                debugger;
                var latestRecipeList = result;
                latestRecepieData.status = 2;
                latestRecepieData.recepies = latestRecipeList;

                setLatestRecepis(latestRecepieData);
        });    
    }});

    return <div>
        <h2>Latest Recepies</h2>
        (latestRecepieData.status == 0 && <p>Please wait a while recipeies are being loaded.</p>)
        (latestRecepieData.status == 2 && !latestRecepieData.recepies.length && <p className="text-warning">
        No receipies were found. Be the first to add a recipe</p>)
        (latestRecepieData.status == 2 && latestRecepieData.recepies.length && 
        (latestRecepieData.recepies.map((recipe) function (params) {
            <RecipeCard {...recipe}></RecipeCard>
        }))
    </div>
}