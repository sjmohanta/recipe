import ShowRating from "../../Shared/ShowRating";
import formatDate from "../../../Utility/TimeUtility";

export default function ReviewList({reviews})
{
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
        {reviews.map(review => <Review key={review.id} review={review}></Review>)}
    </>;
}