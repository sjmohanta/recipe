import { Link } from "react-router-dom";
import ShowRating from "../Shared/ShowRating";

function RecipeCard({id, name, image, prepTimeMinutes, rating, reviewCount})
{
    return <div key={id} className="col-md-2 col-sm-6">
                <div className="card">
                    <div className="card-o-text">
                        <Link to={`/Recipes/Rating?rating=${rating}`}>
                            <span title={`${rating?.toFixed(1)} of 5 (${reviewCount} votes)`}><ShowRating rating={rating}></ShowRating></span> 
                        </Link>
                        <Link to={`/Recipes/PreparationTime?preparationTime=${prepTimeMinutes}`}>
                            <span className="float-end text-success"><i className="fa fa-clock"></i> {prepTimeMinutes} min</span>
                        </Link>                        
                    </div>
                    <Link title={`Show details of recipe ${name}`} className="text-decoration-none text-info" to={`/Recipe/${id}`}>
                        <img className="card-img-top" src={image} alt="Cover image" />
                    </Link>                    
                    <div className="card-footer bg-dark">
                        <h5 className="h6 m-0">
                            <Link title={`Show details of recipe ${name}`} className="text-decoration-none text-info" to={`/Recipe/${id}`}>
                                {name}
                            </Link>
                        </h5>                        
                    </div>
                </div>
        </div>;
}

export default RecipeCard;