import { useSearchParams } from "react-router-dom";
import TopNav from "./TopNav";
import { useState, useEffect } from "react";
import appConfig from "../Utility/AppConfig";
import { ServerError } from "./ServerError";
import RecipeCard from "./RecipeCard";

export default function RecipesByIntegrand()
{
    const [searchParams] = useSearchParams();
    const seachedIntegrand = searchParams.get('integrand');

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
                    var searchResult = result.filter((recipe) => {
                        return recipe.integrands.indexOf(seachedIntegrand) != -1;
                    });
                    
                    updateRecipeState({
                        status: response.status,
                        recepies: searchResult
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
                Search results for <strong>{seachedIntegrand}</strong>
            </p>
            {!recipeState.status && <p><i class="fa-solid fa-spinner fa-spin"></i> Please wait while loading search results.</p>}
            {recipeState.status === 200 && recipeState.recepies.length && <div className="row">{recipeCards}</div>}
            {recipeState.status === 200 && !recipeState.recepies.length && <p>
                Looks like we don't have any recipes for integrand <strong>{seachedIntegrand}</strong>.<br/><br/>
                Do you wants to add a new recipe?<br/><br/>
                <link to="/recipe/create" className="btn btn-outline-primary">Create Recipe</link>
            </p>}
            {recipeState.status === 500 && <ServerError/>}
        </div>        
    </>;
}