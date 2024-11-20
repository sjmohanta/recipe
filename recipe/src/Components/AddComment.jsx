import AddRating from "./AddRating";
import { useState } from "react";
import { getAuthInfo } from "../Utility/AuthUtility";
import { useNavigate } from "react-router-dom";
import appConfig from "../Utility/AppConfig";

export default function AddComment({recipeId})
{
    const navigate = useNavigate();

    const [review, updateComment] = useState({
        rating: undefined,
        comment: undefined,
        recipeId: recipeId
    });

    const authInfo = getAuthInfo();

    function ratingChanged(ratingInput)
    {
        updateComment({...review, rating: ratingInput});
    }

    function commentChanged(e)
    {
        updateComment({...review, comment: e.target.value});
    }

    function submitComment()
    {
        const apiRootUrl = appConfig("ApiRootPath");
        const dataToPost = {...review, userId: authInfo.uid};

        fetch(`${apiRootUrl}/reviews`, {
            method: 'POST',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify({...dataToPost})
        })
        .then(function (response) {      
            
            if(response.ok){
                response.json().then(function (result) {                    
                    debugger;
                    navigate(`/Recipe/${result.id}`);
                });
            }
            else
            {
                debugger;
            }
        });
    }

    return <form>
                <div className="mb-3">
                    <label className="form-label">Rating</label><br></br>
                    <AddRating onChange={ratingChanged}></AddRating>
                </div>
                <div className="mb-3">
                    <label className="form-label">Comment</label>
                    <textarea rows={4} className="form-control" placeholder="Commnet" onChange={commentChanged}></textarea>
                </div>
                <button onClick={submitComment} className="btn btn-primary">Submit Review</button>
    </form>;
}