import { useContext, useEffect } from "react";
import ShowRating from "../../Shared/ShowRating";
import appConfig from "../../../Utility/AppConfig";
import formatDate from "../../../Utility/TimeUtility";
import { ServerError } from "../../Shared/ServerError";
import { ReviewsContext } from "../../../Store/ReviewsContext";

export default function ReviewList({recipeId})
{
    const { reviews, status, setReviews } = useContext(ReviewsContext);    

    useEffect(() => {
        async function getReviews(recipeId) {
            const apiRootUrl = appConfig("ApiRootPath");

            try
            {
                var response = await fetch(`${apiRootUrl}/reviews?recipeId=${recipeId}`);
                if (!response.ok)
                {
                    setReviews({
                        type: 'SET',
                        status: response.status
                    });
                }
                else{
                    var result = await response.json();
                    setReviews({
                        type: 'SET',
                        reviews: result,
                        status: response.status
                    });
                } 
            }
            catch
            {
                setReviews({
                    type: 'SET',
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
        {status === 0 && <p>
            Loading Reviews...
            </p>}
        {status === 200 && reviews.map(review => <Review key={review.id} review={review}></Review>)}
        {status === 500 && <ServerError />}
    </>;
}