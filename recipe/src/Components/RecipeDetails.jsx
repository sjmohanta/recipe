import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AppConfig from "../AppConfig";

export default function RecipeDetails()
{
    const { id } = useParams();

    const [recepieDetails, setRecepieDetails] = useState({
        status: 0,
        info: undefined
    });

    useEffect(() => {
        async function getRecipeDetail(recipeId) {
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
                    info: result
                });
            }            
        }

        getRecipeDetail(id);        
    }, []);

    function RecipeDetailsLoading()
    {
        return <p>
            Please wait...
            An awesome recipe is loading.
        </p>
    }

    function ShowRecipe({info})
    {
        if (!info)
        {
            return <div>
                <h4 className="text-warning">
                    Requested recipe not found.
                </h4>
                <p>
                    Opps! We don't have the requested recipe.<br />
                    Please follow below link to find available recipes and find awesome recipes.
                </p>
                <div>
                    <Link className="btn btn-info" to="/RecipeList">
                        Recipe List
                    </Link>
                </div>
            </div>
        }
        else{
            return <Recipe {...info}></Recipe>;
        }
    }

    function Recipe({id, name, ingredients, instructions, prepTimeMinutes, cookTimeMinutes, cuisine, tags, image, rating, reviewCount, mealType})
    {
        return <>
            <h1 className="text-primary">{name}</h1>
            <hr/>
            <h4 className="text-info">
                Integrends
            </h4>
            <ul>
                {ingredients.map((ingredient) => {
                    return <li>{ingredient}</li>
                })}
            </ul>
            <h4 className="text-info">
                Instructions
            </h4>
            <ol>
                {instructions.map((instruction) => {
                    return <li>{instruction}</li>
                })}
            </ol>
            <div>
                <img src={image}></img>
            </div>
            <h4 className="text-info">
                Rating
            </h4>
            <p>
                {rating} based on {reviewCount} reviews.<br/>
                Submit your rating.
            </p>
        </>;
    }

    return <div>
        {recepieDetails.status === 0 && <RecipeDetailsLoading />}
        {recepieDetails.status === 200 && <ShowRecipe {...recepieDetails} />}
    </div>
}