import { useLoaderData, Link, Await } from "react-router-dom";
import { Suspense } from "react";
import ShowRating from "../Shared/ShowRating";
import AddReview from "./Reviews/AddReview";
import ReviewList from "./Reviews/ReviewList";

export default function RecipeDetails()
{    
    const { recipeDetails, recipeReviews } = useLoaderData();       

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
        </>;
    }

    return <>
        <div className="container-fluid mb-3">
            <div className="row">
                <div className="col-12">      
                    <Suspense>
                        <Await resolve={recipeDetails}>
                            {(recipeInfo) => <ShowRecipe {...recipeInfo} />}
                        </Await>
                    </Suspense>                    
                </div>
                <div className="col-12">                    
                    <div className="row">
                        <div className="col-12 col-md-6">
                            <Suspense fallback={<p>Loading reviews...</p>}>
                                <Await resolve={recipeReviews}>
                                    {(reviews) => <ReviewList reviews={reviews} />}
                                </Await>
                            </Suspense>                            
                        </div>
                        <div className="col-12 col-md-6">
                            <div className="border-start border-2 border-info-subtle p-2">
                                <h4 className="text-secondary">Add your review</h4>
                                {/* <AddReview recipeId={id} aggregatedRating={rating} reviewCount={reviewCount}></AddReview> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>        
    </>
}