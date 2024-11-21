import RatingInput from "./RatingInput";
import { useState } from "react";
import { getAuthInfo } from "../Utility/AuthUtility";
import { useNavigate } from "react-router-dom";
import appConfig from "../Utility/AppConfig";

export default function AddComment({recipeId, aggregatedRating, reviewCount})
{
    const navigate = useNavigate();

    const [review, updateComment] = useState({
        rating: undefined,
        title: undefined,
        review: undefined,
        recipeId: recipeId
    });

    const authInfo = getAuthInfo();
    const apiRootUrl = appConfig("ApiRootPath");

    function ratingChanged(ratingInput)
    {
        updateComment({...review, rating: ratingInput});
    }

    function reviewChanged(e)
    {
        updateComment({...review, review: e.target.value});
    }

    function titleChanged(e)
    {
        updateComment({...review, title: e.target.value});
    }

    function submitComment()
    {
        const dataToPost = {...review, userId: authInfo.uid, authorName: authInfo.name, createdOn: new Date()};

        fetch(`${apiRootUrl}/reviews`, {
            method: 'POST',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify({...dataToPost})
        })
        .then(function (response) {
            if(response.ok){
                response.json().then(function (result) {                    
                    navigate(`/Recipe/${recipeId}`);
                });
            }
        });

        function updateAggregatedRating(recipeId, aggregatedRating, reviewCount, newRating)
        {
            const dataToPatch = {};
            dataToPatch.rating = ((aggregatedRating * reviewCount) + newRating) / (++reviewCount);
            dataToPatch.reviewCount = reviewCount;

            async function updateRecipeDetails() {
                fetch(`${apiRootUrl}/recipes/${recipeId}`, {
                    method: 'PATCH',
                    headers: {'Content-Type' : 'application/json'},
                    body: JSON.stringify({...dataToPatch})
                });
            }

            updateRecipeDetails();
        }

        updateAggregatedRating(review.recipeId, aggregatedRating, reviewCount, review.rating);
    }

    return <form>
                <div className="mb-3">
                    <label className="form-label">Your rating</label><br></br>
                    <RatingInput onChange={ratingChanged}></RatingInput>
                </div>
                <div className="mb-3">
                    <label className="form-label">Title Of Review</label>
                    <input className="form-control" placeholder="Title" onChange={titleChanged} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Review</label>
                    <textarea rows={4} className="form-control" placeholder="Review" onChange={reviewChanged}></textarea>
                </div>
                <button type="button" onClick={submitComment} className="btn btn-primary">Submit Review</button>
    </form>;
}