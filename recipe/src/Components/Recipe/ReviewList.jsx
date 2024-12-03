import { useState, useEffect } from "react";
import ShowRating from "../Shared/ShowRating";
import appConfig from "../../Utility/AppConfig";
import formatDate from "../../Utility/TimeUtility";
import { ServerError } from "../Shared/ServerError";

export default function ReviewList({recipeId})
{
    const [reviews, updateReviews] = useState({
        status: 0,
        result: []
    });

    useEffect(() => {
        async function getReviews(recipeId) {
            const apiRootUrl = appConfig("ApiRootPath");

            try
            {
                var response = await fetch(`${apiRootUrl}/reviews?recipeId=${recipeId}`);
                if (!response.ok)
                {
                    updateReviews({
                        ...reviews,
                        status: response.status
                    });
                }
                else{
                    var result = await response.json();
                    updateReviews({
                        status: response.status,
                        result: result
                    });
                } 
            }
            catch
            {
                updateReviews({
                    ...reviews,
                    status: 500
                });
            }                       
        }

        getReviews(recipeId);        
    }, []);

    function Review({review})
    {
        return <div className="mb-2 bb-1"> 
                    <ShowRating rating={review.rating}></ShowRating> <br/>         
                    <strong>{review.title}</strong>
                    <figure>
                        <blockquote className="blockquote">
                            <p>{review.review}</p>
                        </blockquote>
                        <figcaption className="blockquote-footer">
                            {review.authorName} on <cite title="Source Title">{formatDate(review.createdOn)}</cite>
                        </figcaption>
                    </figure>
            </div>;
    }

    return <>
        {reviews.status === 0 && <p>
            Loading Reviews...
            </p>}
        {reviews.status === 200 && reviews.result.map(review => <Review key={review.id} review={review}></Review>)}
        {reviews.status === 500 && <ServerError />}
    </>;
}