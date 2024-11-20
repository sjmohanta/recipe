import AddRating from "./AddRating";

export default function AddComment()
{
    return <form>
                <div className="mb-3">
                    <label className="form-label">Rating</label><br></br>
                    <AddRating></AddRating>
                </div>
                <div className="mb-3">
                    <label className="form-label">Comment</label>
                    <textarea rows={4} className="form-control" placeholder="Commnet"></textarea>
                </div>
                <button className="btn btn-primary">Submit Review</button>
    </form>;
}