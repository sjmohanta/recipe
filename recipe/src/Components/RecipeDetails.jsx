import { useParams } from "react-router-dom";

export default function RecipeDetails()
{
    debugger;

    const { id } = useParams();
    return <p>
        Recipe Details for {id}
    </p>
}