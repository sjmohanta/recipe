import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuthInfo } from "../../../Utility/AuthUtility";
import appConfig from "../../../Utility/AppConfig";
import RatingInput from "../../Shared/RatingInput";
import { ServerError } from "../../Shared/ServerError";

export default function AddReview({recipeId, aggregatedRating, reviewCount})
{
    const navigate = useNavigate();

    const [review, updateReviewState] = useState({
        rating: undefined,
        title: undefined,
        review: undefined,
        recipeId: recipeId,
        hasUserAlreadyRatedRecipe: true
    });

    const [reviewValidationState, updateReviewValidationState] = useState({
        isTitleEmpty: undefined,
        isRatingEmpty: undefined,
        isReviewEmpty: undefined,
        isServerError: undefined
    });

    const authInfo = getAuthInfo();
    const apiRootUrl = appConfig("ApiRootPath");

    function ratingChanged(ratingInput)
    {
        reviewValidationState.isRatingEmpty = false;
        updateReviewValidationState({...reviewValidationState});

        updateReviewState({...review, rating: ratingInput});
    }

    function reviewChanged(e)
    {
        const reviewBody = e.target.value;
        reviewValidationState.isReviewEmpty = (reviewBody.length === 0); 
        updateReviewValidationState({...reviewValidationState});

        updateReviewState({...review, review: reviewBody});
    }

    function titleChanged(e)
    {
        const reviewTitle = e.target.value;
        reviewValidationState.isTitleEmpty = (reviewTitle.length === 0);
        updateReviewValidationState({...reviewValidationState});

        updateReviewState({...review, title: reviewTitle});
    }

    function isReviewValid()
    {
        reviewValidationState.isTitleEmpty = (review.title === undefined || review.title.length === 0);
        reviewValidationState.isRatingEmpty = (review.rating === undefined || review.rating === 0);
        reviewValidationState.isReviewEmpty = (review.review === undefined || review.review.length === 0);    

        updateReviewValidationState({...reviewValidationState});

        return reviewValidationState.isTitleEmpty || reviewValidationState.isRatingEmpty || reviewValidationState.isReviewEmpty;
    }

    function submitReview()
    {
        if (isReviewValid())
        {
            return;
        }

        async function createReview() {
            const dataToPost = {...review, userId: authInfo.uid, authorName: authInfo.name, createdOn: new Date()};

            try
            {
                var response = await fetch(`${apiRootUrl}/reviews`, {
                    method: 'POST',
                    headers: {'Content-Type' : 'application/json'},
                    body: JSON.stringify({...dataToPost})
                });
    
                if(response.ok){
                    await response.json();

                    // To-do : Add comment to state, show success message 
                    navigate(`/Recipe/${recipeId}`);
                }
                else{
                    updateReviewValidationState({...reviewValidationState, isServerError: true});
                }
            }
            catch(e)
            {
                updateReviewValidationState({...reviewValidationState, isServerError: true});
                console.warn(e);
            }
        }

        createReview();

        function updateAggregatedRating(recipeId, aggregatedRating, reviewCount, newRating)
        {
            const dataToPatch = {};
            dataToPatch.rating = ((aggregatedRating * reviewCount) + newRating) / (++reviewCount);
            dataToPatch.reviewCount = reviewCount;            

            async function updateRecipeRating() {
                try
                {
                    await fetch(`${apiRootUrl}/recipes/${recipeId}`, {
                        method: 'PATCH',
                        headers: {'Content-Type' : 'application/json'},
                        body: JSON.stringify({...dataToPatch})
                    });
                }
                catch(e)
                {
                    updateReviewValidationState({...reviewValidationState, isServerError: true});
                    console.warn(e);
                }
            }

            updateRecipeRating();
        }

        updateAggregatedRating(review.recipeId, aggregatedRating, reviewCount, review.rating);
    }

    useEffect(() => {
        if (authInfo)
        {
            async function getUserRatingForReview() {
                const apiRootUrl = appConfig("ApiRootPath");
    
                try
                {
                    var response = await fetch(`${apiRootUrl}/reviews?recipeId=${recipeId}&userId=${authInfo.uid}`);
                    if (!response.ok)
                    {
                        // disable review submit for error
                        updateReviewState({...review, hasUserAlreadyRatedRecipe: false});
                    }
                    else{
                        var result = await response.json();
                        updateReviewState({...review, hasUserAlreadyRatedRecipe: result.length > 0});
                    } 
                }
                catch(e)
                {
                    // disable review submit for error
                    updateReviewState({...review, hasUserAlreadyRatedRecipe: false}); 
                    console.warn(e);
                }                       
            }

            getUserRatingForReview();
        }
        else{
            // disable review submit for error
            updateReviewState({...review, hasUserAlreadyRatedRecipe: false});
        }
    }, []);

    return <>
        {(review.hasUserAlreadyRatedRecipe === false) && <form>                
                    <div className="mb-3">
                        <label className="form-label">Title Of Review <span className="text-danger">*</span></label>
                        <input className="form-control" placeholder="Title" onChange={titleChanged} />
                        {reviewValidationState.isTitleEmpty && <div className="invalid-feedback">
                            Please provide your review title.
                        </div>}
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Your rating <span className="text-danger">*</span></label><br></br>
                        <div className="h5">
                            <RatingInput onChange={ratingChanged}></RatingInput>
                        </div>
                        {reviewValidationState.isRatingEmpty && <div className="invalid-feedback">
                            Please provide your rating.
                        </div>}
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Review <span className="text-danger">*</span></label>
                        <textarea rows={4} className="form-control" placeholder="Review" onChange={reviewChanged}></textarea>
                        {reviewValidationState.isReviewEmpty && <div className="invalid-feedback">
                            Please provide your review details.
                        </div>}
                    </div>
                    <button type="button" onClick={submitReview} className="btn btn-primary" disabled={authInfo ? false : true}>Submit Review</button>
                    {!authInfo && <span className="text-warning ms-2">You must login first to submit a review.</span>}
                    {reviewValidationState.isServerError && <ServerError message="Something went wrong while adding your review." />}
                </form>}
        {review.hasUserAlreadyRatedRecipe && <div>
                <h4 className="text-warning">Rating already submitted</h4>
                <p>
                    You have already submitted your rating for this recipe.<br/>
                    Thanks, you!! 
                </p>
            </div>}
    </>;
}