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
        title: undefined,
        review: undefined,
        recipeId: recipeId
    });

    const authInfo = getAuthInfo();

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
        const apiRootUrl = appConfig("ApiRootPath");
        const dataToPost = {...review, userId: authInfo.uid, authorName: authInfo.name, createdOn: new Date()};

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
                    <label className="form-label">Your rating</label><br></br>
                    <AddRating onChange={ratingChanged}></AddRating>
                </div>
                <div className="mb-3">
                    <label className="form-label">Title Of Review</label>
                    <input className="form-control" placeholder="Title" onChange={titleChanged} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Review</label>
                    <textarea rows={4} className="form-control" placeholder="Review" onChange={reviewChanged}></textarea>
                </div>
                <button onClick={submitComment} className="btn btn-primary">Submit Review</button>
    </form>;
}