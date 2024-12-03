import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import appConfig from "../../Utility/AppConfig";
import ShowRating from "../Shared/ShowRating";
import AddReview from "./AddReview";
import ReviewList from "./ReviewList";
import { ServerError } from "../Shared/ServerError";

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
            Please wait...<br/>
            An awesome recipe is loading.
        </p>
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

    function ShowRecipe({id, name, integrands, instructions, image, rating, reviewCount, prepTimeMinutes})
    {
        document.title = `${name} Recipe`;

        return <>
            <h2 className="text-info">{name}</h2>
            <span>
                <i className="fa fa-clock"></i> Preparation time: 
                 <Link className="ms-2" to={`/Recipes/PreparationTime?preparationTime=${prepTimeMinutes}`}>{prepTimeMinutes} minutes</Link>
            </span>
            <hr/>
            <div className="col-12 col-md-4">
                <img src={image} className="img-thumbnail" alt="Recipe photo" />
            </div>            
            <h4 className="text-info">
                Integrends
            </h4>
            <ul>
                {integrands.map((ingredient) => {
                    return <li key={ingredient}>
                        <Link to={`/Recipes/Integrand?integrand=${ingredient}`}>
                            {ingredient}
                        </Link>                        
                    </li>
                })}
            </ul>
            <h4 className="text-info">
                Instructions
            </h4>
            <ol>
                {instructions.map((instruction) => {
                    return <li key={instruction}>{instruction}</li>
                })}
            </ol>
            
            <h2 className="text-info">
                Reviews
            </h2>
            <div>
                <ShowRating rating={rating}></ShowRating>
                <span className="ms-3"><Link to={`/Recipes/Rating?rating=${rating}`}>{rating?.toFixed(1)}</Link> based on {reviewCount} reviews.</span>                
            </div>
            <hr/>               
            <div className="row">
                <div className="col-12 col-md-6">
                    <ReviewList recipeId={id}></ReviewList>
                </div>
                <div className="col-12 col-md-6">
                    <div className="border-start border-2 border-info-subtle p-2">
                        <h4 className="text-secondary">Add your review</h4>
                        <AddReview recipeId={id} aggregatedRating={rating} reviewCount={reviewCount}></AddReview>
                    </div>
                </div>
            </div>     
        </>;
    }

    return <>
        <div className="container-fluid mb-3">
            <div className="row">
                <div className="col-12">
                    {recepieDetails.status === 0 && <RecipeDetailsLoading />}
                    {recepieDetails.status === 200 && <ShowRecipe {...recepieDetails.info} />}
                    {recepieDetails.status === 404 && <RecipeNotFound />}
                    {recepieDetails.status === 500 && <ServerError />}
                </div>
            </div>
        </div>        
    </>
}