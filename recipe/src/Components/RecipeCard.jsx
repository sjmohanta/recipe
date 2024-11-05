export default function RecipeCard({name, image, cuisine, prepTimeMinutes})
{
    return <div className="card">
        <div className="card-header">
            {name}
        </div>
        <div className="card-body">
            <img src="{image}" alt="Cover image"></img>
        </div>
        <div className="card-footer">
            {cuisine} {prepTimeMinutes} min
        </div>
    </div>;
}