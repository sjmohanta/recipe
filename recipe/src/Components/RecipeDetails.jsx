import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import appConfig from "../Utility/AppConfig";
import TopNav from "./TopNav";

export default function RecipeDetails()
{
    const { id } = useParams();

    const [recepieDetails, setRecepieDetails] = useState({
        status: 0,
        info: undefined
    });

    useEffect(() => {
        async function getRecipeDetail(recipeId) {
            const apiRootUrl = appConfig("ApiRootPath");

            try
            {
                var response = await fetch(`${apiRootUrl}/recipes/${recipeId}`);
                if (!response.ok)
                {
                    setRecepieDetails({
                        ...recepieDetails,
                        status: response.status
                    });
                }
                else{
                    var result = await response.json();
                    setRecepieDetails({
                        ...recepieDetails,
                        status: response.status,
                        info: result
                    });
                } 
            }
            catch
            {
                setRecepieDetails({
                    ...recepieDetails,
                    status: 500
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

    function ServerError()
    {
        return <div>
            <h4 className="text-danger">
                Unknown server error 
            </h4>
            <p>
                Looks like there is a server error.<br />
                Please let us know if the error persists.
            </p>
            <div>
                <Link className="btn btn-info" to="/Contact">
                    Contact Us
                </Link>
            </div>
        </div>;
    }

    function RecipeNotFound()
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
        </div>;
    }    

    function ShowRecipe({id, name, integrands, instructions, prepTimeMinutes, cookTimeMinutes, cuisine, tags, image, rating, reviewCount, mealType})
    {
        document.title = `${name} Recipe`;

        return <>
            <h1 className="text-primary">{name}</h1>
            <hr/>
            <h4 className="text-info">
                Integrends
            </h4>
            <ul>
                {integrands.map((ingredient) => {
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
        <TopNav></TopNav>
        {recepieDetails.status === 0 && <RecipeDetailsLoading />}
        {recepieDetails.status === 200 && <ShowRecipe {...recepieDetails.info} />}
        {recepieDetails.status === 404 && <RecipeNotFound />}
        {recepieDetails.status === 500 && <ServerError />}
    </div>
}