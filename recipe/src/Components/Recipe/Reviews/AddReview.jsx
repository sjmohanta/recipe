import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuthInfo } from "../../../Utility/AuthUtility";
import appConfig from "../../../Utility/AppConfig";
import RatingInput from "../../Shared/RatingInput";

export default function AddReview({recipeId, aggregatedRating, reviewCount})
{
    const navigate = useNavigate();

    const [review, updateComment] = useState({
        rating: undefined,
        title: undefined,
        review: undefined,
        recipeId: recipeId,
        hasUserAlreadyRatedRecipe: true
    });

    const [reviewValidationState, updateReviewValidationState] = useState({
        isTitleEmpty: false,
        isRatingEmpty: false,
        isReviewEmpty: false,
    });

    const authInfo = getAuthInfo();
    const apiRootUrl = appConfig("ApiRootPath");

    function ratingChanged(ratingInput)
    {
        reviewValidationState.isRatingEmpty = false;
        updateReviewValidationState({...reviewValidationState});

        updateComment({...review, rating: ratingInput});
    }

    function reviewChanged(e)
    {
        const reviewBody = e.target.value;
        reviewValidationState.isReviewEmpty = (reviewBody.length === 0); 
        updateReviewValidationState({...reviewValidationState});

        updateComment({...review, review: reviewBody});
    }

    function titleChanged(e)
    {
        const reviewTitle = e.target.value;
        reviewValidationState.isTitleEmpty = (reviewTitle.length === 0);
        updateReviewValidationState({...reviewValidationState});

        updateComment({...review, title: reviewTitle});
    }

    function isReviewValid()
    {
        reviewValidationState.isTitleEmpty = (review.title === undefined || review.title.length === 0);
        reviewValidationState.isRatingEmpty = (review.rating === undefined || review.rating === 0);
        reviewValidationState.isReviewEmpty = (review.review === undefined || review.review.length === 0);    

        updateReviewValidationState({...reviewValidationState});

        return reviewValidationState.isTitleEmpty || reviewValidationState.isRatingEmpty || reviewValidationState.isReviewEmpty;
    }

    function submitComment()
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
                    // navigate(`/Recipe/${recipeId}`);
                }
            }
            catch(e)
            {
                console.warn(e);
            }
        }

        createReview();

        function updateAggregatedRating(recipeId, aggregatedRating, reviewCount, newRating)
        {
            const dataToPatch = {};
            dataToPatch.rating = ((aggregatedRating * reviewCount) + newRating) / (++reviewCount);
            dataToPatch.reviewCount = reviewCount;

            async function updateRecipeDetails() {
                await fetch(`${apiRootUrl}/recipes/${recipeId}`, {
                    method: 'PATCH',
                    headers: {'Content-Type' : 'application/json'},
                    body: JSON.stringify({...dataToPatch})
                });
            }

            updateRecipeDetails();
        }

        updateAggregatedRating(review.recipeId, aggregatedRating, reviewCount, review.rating);
    }

    function ReviewForm()
    {
        return <form>                
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
                    <button type="button" onClick={submitComment} className="btn btn-primary" disabled={authInfo ? false : true}>Submit Review</button>
                    {!authInfo && <span className="text-warning ms-2">You must login first to submit a review.</span>}
                </form>;
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
                        // disable comment for error
                        updateComment({...review, hasUserAlreadyRatedRecipe: false});
                    }
                    else{
                        var result = await response.json();
                        updateComment({...review, hasUserAlreadyRatedRecipe: result.length > 0});
                    } 
                }
                catch
                {
                    // disable comment for error
                    updateComment({...review, hasUserAlreadyRatedRecipe: false}); 
                }                       
            }

            getUserRatingForReview();
        }
        else{
            // disable comment for error
            updateComment({...review, hasUserAlreadyRatedRecipe: false});
        }
    }, []);

    return <>
        {(review.hasUserAlreadyRatedRecipe === false) && <ReviewForm></ReviewForm>}
        {review.hasUserAlreadyRatedRecipe && <div>
                <h4 className="text-warning">Rating already submitted</h4>
                <p>
                    You had already submitted your rating for this recipe.<br/>
                    Thanks, you!! 
                </p>
            </div>}
    </>;
}