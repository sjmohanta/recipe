import { useRef, useState } from "react";
import TopNav from "./TopNav";

export default function CreateRecipe()
{
    const [recipe, updateRecipeState] = useState({
        Name: undefined,
        NoOfintegrands: 4,
        Integrends: [],
        NoOfSteps: 6,
        Steps: []
    });

    function validateForm()
    {

    }

    function increaseNoOfIntegrands()
    {
        updateRecipeState({...recipe, NoOfintegrands: ++recipe.NoOfintegrands});
    }

    function decreaseNoOfIntegrands()
    {
        if (recipe.NoOfintegrands == 1)
        {
            return; // can not have zero integrands
        }
        updateRecipeState({...recipe, NoOfintegrands: --recipe.NoOfintegrands});
    }

    function increaseNoOfSteps()
    {
        updateRecipeState({...recipe, NoOfSteps: ++recipe.NoOfSteps});
    }

    function decreaseNoOfSteps()
    {
        if (recipe.NoOfSteps == 1)
        {
            return; // can not have zero steps
        }

        updateRecipeState({...recipe, NoOfSteps: --recipe.NoOfSteps});
    }

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
                <span class="btn btn-outline-secondary btn-sm ms-3 me-1" onClick={increaseNoOfIntegrands}>+</span>
                <span class="btn btn-outline-secondary btn-sm" onClick={decreaseNoOfIntegrands}>-</span>
                {
                    [...Array(recipe.NoOfintegrands).keys()].map(key => <input id={`txtIntegrend${key + 1}`} className="form-control mb-1" 
                        placeholder={`Integrend ${key + 1}`} required />)
                }
            </div>
            <div class="mb-3">
                <label class="form-label" required>Instructions</label>
                <span class="btn btn-outline-secondary btn-sm ms-3 me-1" onClick={increaseNoOfSteps}>+</span>
                <span class="btn btn-outline-secondary btn-sm" onClick={decreaseNoOfSteps}>-</span>
                {
                    [...Array(recipe.NoOfSteps).keys()].map(key => <input id={`txtStep${key + 1}`} className="form-control mb-1" 
                        placeholder={`Step ${key + 1}`} required />)
                }
            </div>
            <button type="button" class="btn btn-primary" onClick={validateForm}>Create</button>
        </form>
    </>;

    
}