import { Link } from "react-router-dom";
import ShowRating from "./ShowRating";

function RecipeCard({id, name, image, cuisine, rating, reviewCount})
{
    return <div key={id} className="col-md-4 col-sm-6">
                <div className="card">
                    <h5 className="card-header text-primary">
                        <Link to={`/Recipe/${id}`}>
                            {name}
                        </Link>
                    </h5>
                    <img className="card-img-top" src={image} alt="Cover image"></img>                    
                    <div className="card-body">
                    </div>
                    <div className="card-footer">
                        <ShowRating rating={rating}></ShowRating>
                        <span className="badge text-bg-warning">{rating} / 5</span> ({reviewCount} votes)
                    </div>
                </div>
        </div>;
}

export default RecipeCard;