import { useRef, useState } from "react";
import TopNav from "./TopNav";

export default function CreateRecipe()
{
    const [recipe, updateRecipe] = useState({
        Name: undefined,
        NoOfintegrands: 4,
        Integrends: [],
        NoOfSteps: 6,
        Steps: []
    });

    return <>
        <TopNav></TopNav>
        <h1 className="text-primary">
            Create Recipe
        </h1>
        <form className="col-8">
            <div class="mb-3">
                <label for="txtRecipeName" class="form-label">Name</label>
                <input class="form-control" id="txtRecipeName" placeholder="Recipe Name" required />
            </div>            
            <div class="mb-3">
                <label class="form-label">Integrends</label>
                {
                    [...Array(recipe.NoOfintegrands).keys()].map(key => <input id={`txtIntegrend${key + 1}`} className="form-control mb-1" 
                        placeholder={`Integrend ${key + 1}`} required />)
                }                
            </div>
            <div class="mb-3">
                <label class="form-label" required>Instructions</label>
                {
                    [...Array(recipe.NoOfSteps).keys()].map(key => <input id={`txtStep${key + 1}`} className="form-control mb-1" 
                        placeholder={`Step ${key + 1}`} required />)
                }                
            </div>
            <button type="button" class="btn btn-primary" onClick={validateForm}>Create</button>
        </form>
    </>;

    function validateForm()
    {

    }
}