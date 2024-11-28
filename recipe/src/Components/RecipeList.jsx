import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import appConfig from "../Utility/AppConfig";
import { ServerError } from "./ServerError";
import RecipeCard from "./RecipeCard";

export default function RecipeList()
{
    const [recipeState, updateRecipeState] = useState({
        status: undefined,
        recepies: [],
    });    

    useEffect(() => {
        async function getRecipies() {
            const apiRootUrl = appConfig("ApiRootPath");
            var response = await fetch(`${apiRootUrl}/recipes`);

            try
            {
                if(response.ok){
                    var result = await response.json();                    
                    
                    updateRecipeState({
                        status: response.status,
                        recepies: result
                    });   
                }
                else 
                {                
                    updateRecipeState({
                        ...recipeState,
                        status: response.status
                    });
                }
            }
            catch(e)
            {
                updateRecipeState({
                    ...recipeState,
                    status: 500
                });

                console.warn(e);
            }
        }        

        getRecipies();
    }, []);

    var recipeCards = recipeState.recepies.map(function (recipe) {
        return <RecipeCard key={recipe.id} {...recipe}></RecipeCard>;
    });

    return <>
        <div className="continer-fluid">
            <h2 className="text-success">
                List of all recipies
            </h2>
            {!recipeState.status && <p><i class="fa-solid fa-spinner fa-spin"></i> Please wait while loading search results.</p>}
            {recipeState.status === 200 && recipeState.recepies.length && <div className="row">{recipeCards}</div>}
            {recipeState.status === 200 && !recipeState.recepies.length && <p>
                Looks like we don't have any recipes right now.<br/><br/>
                Do you wants to add a new recipe?<br/><br/>
                <Link to="/recipe/create" className="btn btn-outline-primary">Create Recipe</Link>
            </p>}
            {recipeState.status === 500 && <ServerError/>}
        </div>        
    </>;
}