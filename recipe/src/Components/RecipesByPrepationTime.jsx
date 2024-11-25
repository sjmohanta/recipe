import { useSearchParams } from "react-router-dom";
import TopNav from "./TopNav";
import { useState, useEffect } from "react";
import appConfig from "../Utility/AppConfig";
import { ServerError } from "./ServerError";
import RecipeCard from "./RecipeCard";

export default function RecipesByPreparationTime()
{
    const [searchParams] = useSearchParams();
    const seachedPreparationTime = searchParams.get('preparationTime');

    const [recipeState, updateRecipeState] = useState({
        status: undefined,
        recepies: [],
    });    

    useEffect(() => {
        async function getRecipies() {
            const apiRootUrl = appConfig("ApiRootPath");
            var response = await fetch(`${apiRootUrl}/recipes?prepTimeMinutes=${seachedPreparationTime}`);

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
        <TopNav></TopNav>
        <div className="continer-fluid">
            <p>
                Search results for recipes with preparation time of <strong>{seachedPreparationTime}</strong> minutes.
            </p>
            {!recipeState.status && <p><i class="fa-solid fa-spinner fa-spin"></i> Please wait while loading search results.</p>}
            {recipeState.status === 200 && recipeState.recepies.length && <div className="row">{recipeCards}</div>}
            {recipeState.status === 200 && !recipeState.recepies.length && <p>
                Looks like we don't have any recipes having preparation time of <strong>{seachedPreparationTime}</strong> minutes.<br/><br/>
                Do you wants to add a new recipe?<br/><br/>
                <link to="/recipe/create" className="btn btn-outline-primary">Create Recipe</link>
            </p>}
            {recipeState.status === 500 && <ServerError/>}
        </div>        
    </>;
}