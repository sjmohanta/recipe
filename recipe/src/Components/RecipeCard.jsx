function RecipeCard({name, image, cuisine, prepTimeMinutes})
{
    return <div className="col-md-4 col-sm-6">
                <div className="card">
                    <h5 className="card-header text-primary">
                        {name}
                    </h5>
                    <img className="card-img-top" src={image} alt="Cover image"></img>                    
                    <div className="card-body">
                        
                    </div>
                <div className="card-footer">
                <span className="badge text-bg-success">{cuisine}</span>
                <span className="float-end d-inline-block">{prepTimeMinutes} min</span>
                         
                </div>
            </div>
        </div>;
}

export default RecipeCard;