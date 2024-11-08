import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import AppConfig from "../AppConfig";

export default function RecipeDetails()
{
    debugger;

    const { id } = useParams();

    const [recepieDetails, setRecepieDetails] = useState({
        status: 0,
        recepeDetails: undefined
    });

    useEffect(() => {
        async function GetRecipeDetail(recipeId) {
            const apiRootUrl = AppConfig("ApiRootPath");
            var response = await fetch(`${apiRootUrl}recipes/${recipeId}`);
            if (!response.ok)
            {
                setRecepieDetails({
                    ...recepieDetails,
                    status: 500
                });
            }
            else{
                var result = await response.json();
                setRecepieDetails({
                    ...recepieDetails,
                    status: 200,
                    recepeDetails: result
                });
            }            
        }

        GetRecipeDetail(id);        
    }, []);

    return <p>
        Recipe Details for {JSON.stringify(recepieDetails)}
    </p>
}